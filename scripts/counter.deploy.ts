import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';

async function deploy() {
  const CounterContract = await ethers.getContractFactory('Counter');
  const result = await CounterContract.deploy();
  await result.deployed();

  return result;
}

// @ts-ignore
async function count(counterContract) {
  return await counterContract.count();
}

deploy().then(count);
