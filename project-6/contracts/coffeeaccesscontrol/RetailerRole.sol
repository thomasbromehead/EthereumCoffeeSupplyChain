pragma solidity 0.7.1;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'RetailerRole' to manage this role - add, remove, check
contract RetailerRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event RetailerAdded(address retailerAddress);
  event RetailerRemoved(address retailerAddress);
  
  // Define a struct 'retailers' by inheriting from 'Roles' library, struct Role
  Roles.Role private retailers;

  // In the constructor make the address that deploys this contract the 1st retailer
  constructor() {
    retailers.bearer[msg.sender] = true;
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyRetailer() {
    require(isRetailer(msg.sender), "Caller is not a Retailer");
    _;
  }

  // Define a function 'isRetailer' to check this role
  function isRetailer(address account) public view returns (bool) {
    return Roles.has(retailers, account);
  }

  // Define a function 'addRetailer' that adds this role
  function addRetailer(address account) public onlyRetailer {
    require(!isRetailer(account), "This account is already a Retailer");
    _addRetailer(account);
    emit RetailerAdded(account);
  }

  // Define a function 'renounceRetailer' to renounce this role
  function renounceRetailer(address account) public onlyRetailer {
    require(isRetailer(account), "This account is not a Retailer");
    _removeRetailer(account);
    emit RetailerRemoved(account);
  }

  // Define an internal function '_addRetailer' to add this role, called by 'addRetailer'
  function _addRetailer(address account) internal {
    Roles.add(retailers, account);
  }

  // Define an internal function '_removeRetailer' to remove this role, called by 'removeRetailer'
  function _removeRetailer(address account) internal {
     Roles.remove(retailers, account);
  }
}