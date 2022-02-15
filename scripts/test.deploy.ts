import "@nomiclabs/hardhat-ethers";
import { ethers } from 'hardhat';

async function deploy() {
  const TestContract = await ethers.getContractFactory("Test");
  const result = await TestContract.deploy();
  await result.deployed();

  return result;
}

// @ts-ignore
async function runTest(testContract) {
  console.log(await testContract.test());
}

deploy().then(runTest);
