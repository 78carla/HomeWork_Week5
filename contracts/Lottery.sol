// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {LotteryToken} from "./LotteryToken.sol";

contract Lottery is Ownable{

///@notice Address of the token used as payment for the bets
    LotteryToken public paymentToken;
///@notice Amount of tokens given per ETH paid
    uint256 public purchaseRatio;
///@notice Flag indicating if the lottery is open for bets
    bool public bestOpen;
///@notice Timestmap of the Lottery next closing date
    uint256 public betsClosingTime;
///@notice Mapping of prize available for withdraw for each account
    mapping(address => uint256) public prize;
///@dev List of bet slots
    address [] _slot;


    constructor(string memory tokenName, string memory tokenSymbol, uint256 _purchaseRatio) {
        paymentToken = new LotteryToken(tokenName, tokenSymbol);
        purchaseRatio = _purchaseRatio;
        
    }

    ///@notice Passes when the lottery is at closed state
    modifier whenBetsClosed(){
        require(!bestOpen, "Lottery is open");
        _;
    }


    ///@notice Open the Lottery for bets
    function openBets(uint256 closingTime) external onlyOwner whenBetsClosed{
        require (closingTime > block.timestamp, "Closing time must be in the future");
        betsClosingTime = closingTime;
        bestOpen = true;
    }

    ///@notice Give token based on the amount of ETH sent
    function purchaseTokens() public payable{
        paymentToken.mint(msg.sender, msg.value*purchaseRatio);
    }

    //@notice Burn 'amount' toekns and give the ETH equivalent back to the user
    function returnTokens(uint256 amount) public {
        paymentToken.burnFrom(msg.sender, amount);
        payable(msg.sender).transfer(amount/purchaseRatio);
    }

    ///@notice Charge the bet price and creates a new bet slot with the sender address
    function bet() public whenBetsOpen{
        //TO DO Charge the bet price
        _slot.push(msg.sender);
    }

    ///@notice Close the lottery and calculate the prize
    ///@dev Anyone can call this function, but only the owner can withdraw the prize
    function closeLottery() public {
       require(block.timestamp >= betsClosingTime, "Too soon to close the lottery");
       require(bestOpen, "Lottery is already closed");
       if(_slot.length > 0){
           uint256 winnerIndex = getRandomNumber() % _slot.length;
           address winner = _slot[winnerIndex];
           prize[winner] += prizePool;
           prizePool = 0;
           delete (_slot);
       }
       bestOpen = false;
    }

    ///@notice Withdraw 'amount' from the account prize pool    
    function prizeWothdraw(uint256 amount) public {
       require(amount <= prize[msg.sender], "Not enough funds in the prize pool");
       prize[msg.sender] -= amount;
        paymentToken.transfer(msg.sender,amount);

    }

}