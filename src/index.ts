import { ethers } from 'ethers';
import Counter from '../artifacts/contracts/counter.sol/Counter.json'

const getEthereum = () => {
  // @ts-ignore
  const ethereum = window.ethereum;
  if (!ethereum) {
    throw new Error('[metamask] ethereum object is not available');
  }

  return ethereum;
};

const hasAccounts = async () => {
  const ethereum = getEthereum();
  const accounts = (await ethereum.request({ method: 'eth_accounts' })) as string[];

  return accounts?.length;
};

const requestAccounts = async () => {
  const ethereum = getEthereum();
  const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[];

  return accounts?.length;
};

const run = async () => {
  if (!(await hasAccounts()) && !(await requestAccounts())) {
    throw new Error('[metamask] cannot find any accounts');
  }

  const counterContract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    Counter.abi,
    new ethers.providers.Web3Provider(getEthereum()).getSigner(),
  );

  const element = document.createElement('div');
  element.innerHTML = await counterContract.getCounter();

  const buttonElement = document.createElement('button');
  buttonElement.innerText = 'increment';
  buttonElement.onclick = async () => {
    await counterContract.count();
  };

  counterContract.on(
    counterContract.filters.CounterInc(),
    (_counter) => (element.innerHTML = _counter),
  );

  document.body.appendChild(element);
  document.body.appendChild(buttonElement);
};

run();
