pragma solidity 0.7.1;

/// Provides basic authorization control
contract Ownable {
    uint love;
    function setLove(uint newLove) public payable {
      love = newLove;
    }
}
