import "@nomiclabs/hardhat-ethers";
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('counter contract', () => {
  it('should increase count value', async () => {
    const CounterContract = await ethers.getContractFactory("Counter");

    const result = await CounterContract.deploy();
    await result.deployed();

    expect(await result.count()).to.exist;
  })
})