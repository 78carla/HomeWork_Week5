import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Lottery, LotteryToken } from "../typechain-types";

const BET_PRICE = 1;
const BET_FEE = 0.2;
const TOKEN_RATIO = 1;

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

describe("Lottery", function () {
  let lotteryContract: Lottery;
  let token: LotteryToken;
  let accounts: SignerWithAddress[];
  console.log("AVH2");
  
  beforeEach(async function () {
    const lotteryFactory = await ethers.getContractFactory("Lottery");
    lotteryContract = await lotteryFactory.deploy(
      "LotteryToken",
      "LT0",
      TOKEN_RATIO,
      ethers.utils.parseEther(BET_PRICE.toFixed(18)),
      ethers.utils.parseEther(BET_FEE.toFixed(18))
    );
  });
  describe("when the contract is deployed", function () {
    it("the lottery is in the closed state", async function () {
      // TODO
      throw Error("Not implemented");
    });

    it("it is not possible to make a bet", async function () {
      // TODO
      throw Error("Not implemented");
    });

    it("it is possible to mint LT0 tokens", async function () {
      // TODO
      throw Error("Not implemented");
    });
  });

  describe("when the lottery is opened", function () {
    it("the lottery is in the open state", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("the lottery has a closing date specified", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("there are no winners yet", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("account can burn tokens", async function () {
      // TODO
      throw Error("Not implemented");
    });
  });

  describe("when the lottery has ended", function () {
    it("the lottery is in the closed state", async function () {
      // TODO
      throw Error("Not implemented");
    });

    it("it is not possible to make a bet", async function () {
      // TODO
      throw Error("Not implemented");
    });
  });

  describe("when an account has a winning ticket", function () {
    // TODO
    it("player prize is shown", async () => {
      throw Error("Not implemented");
    });
    it("it is possible to withdraw winnings", async function () {
      // TODO
      throw Error("Not implemented");
    });
  });
  
  describe("when an account does not have a winning ticket", function () {
    // TODO
    it("no player prize is shown", async () => {
      throw Error("Not implemented");
    });
    it("it is not possible to withdraw winnings", async function () {
      // TODO
      throw Error("Not implemented");
    });
  });
  
});