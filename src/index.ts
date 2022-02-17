import { ethers } from 'ethers';

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
    ['function count() public', 'function getCounter() public view returns (uint32)'],
    new ethers.providers.Web3Provider(getEthereum()),
  );

  const element = document.createElement('div');
  element.innerHTML = await counterContract.getCounter();

  const buttonElement = document.createElement('button');
  buttonElement.innerText = 'increment';
  buttonElement.onclick = async () => {
    await counterContract.count();

    element.innerHTML = await counterContract.getCounter();
  };

  document.body.appendChild(element);
  document.body.appendChild(buttonElement);
};

run();
