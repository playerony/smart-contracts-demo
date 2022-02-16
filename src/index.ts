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

  const test = new ethers.Contract(
    '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    ['function test() public pure returns (string memory)'],
    new ethers.providers.Web3Provider(getEthereum()),
  );

  document.body.innerHTML = await test.test();
};

run();
