pragma solidity 0.7.1;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'ConsumerRole' to manage this role - add, remove, check
contract ConsumerRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event ConsumerAdded(address account);
  event ConsumerRemoved(address account);

  // Define a struct 'consumers' by inheriting from 'Roles' library, struct Role
  Roles.Role private consumers;

  // In the constructor make the address that deploys this contract the 1st consumer
  constructor() {
    // SHOULD I CHECK AGAINST THE ZERO ADDRESS ?
    consumers.bearer[msg.sender] = true;
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyConsumer() {
    require(isConsumer(msg.sender), "Caller is not a Consumer");
    _;
  }

  // Define a function 'isConsumer' to check this role
  function isConsumer(address account) public view returns (bool) {
    require(Roles.has(consumers, msg.sender), "Caller is not a Consumer");
    return consumers.bearer[account ];
  }

  // Define a function 'addConsumer' that adds this role
  function addConsumer(address account) public onlyConsumer() {
    // This will throw
    _addConsumer(account);
    emit ConsumerAdded(account);
  }

  // Define a function 'renounceConsumer' to renounce this role
  function renounceConsumer(address account) public onlyConsumer() {
    _removeConsumer(account);
    emit ConsumerRemoved(account);
  }

  // Define an internal function '_addConsumer' to add this role, called by 'addConsumer'
  function _addConsumer(address account) internal {
    Roles.add(consumers, account);
  }

  // Define an internal function '_removeConsumer' to remove this role, called by 'removeConsumer'
  function _removeConsumer(address account) internal {
    Roles.remove(consumers, account);
  }
}