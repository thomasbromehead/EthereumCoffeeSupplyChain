pragma solidity 0.7.1;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'DistributorRole' to manage this role - add, remove, check
contract DistributorRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event DistributorAdded(address distributorAddress);
  event DistributorRemoved(address distributorAddress);

  // Define a struct 'distributors' by inheriting from 'Roles' library, struct Role
  Roles.Role private distributors;

  // In the constructor make the address that deploys this contract the 1st distributor
  constructor() {
    distributors.bearer[msg.sender] = true;
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyDistributor() {
    require(isDistributor(msg.sender), "Message Sender is not a Distributor");
    _;
  }

  // Define a function 'isDistributor' to check this role
  function isDistributor(address account) public view returns (bool) {
    require(Roles.has(distributors, msg.sender), "Caller is not a Distributor");
    return distributors.bearer[account];
  }

  // Define a function 'addDistributor' that adds this role
  function addDistributor(address account) public onlyDistributor() {
    // This will throw
    _addDistributor(account);
    emit DistributorAdded(account);
  }

  // Define a function 'renounceDistributor' to renounce this role
  function renounceDistributor(address account) public onlyDistributor() {
    // This will throw
    _removeDistributor(account);
    emit DistributorRemoved(account);
  }

  // Define an internal function '_addDistributor' to add this role, called by 'addDistributor'
  function _addDistributor(address account) internal {
    Roles.add(distributors, account);
  }

  // Define an internal function '_removeDistributor' to remove this role, called by 'removeDistributor'
  function _removeDistributor(address account) internal {
    Roles.remove(distributors, account);
  }
}