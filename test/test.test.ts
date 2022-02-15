import "@nomiclabs/hardhat-ethers";
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('test', () => {
  it('should print text', async () => {
    const TestContract = await ethers.getContractFactory("Test");

    const result = await TestContract.deploy();
    await result.deployed();

    expect(await result.test()).to.equal("Test");
  })
})