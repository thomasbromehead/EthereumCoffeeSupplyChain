  ```
  constructor() {
      // SHOULD I CHECK AGAINST THE ZERO ADDRESS ?
      consumers[msg.sender] = 
    }
```

Had to make consumers private:
```
  Roles.Role private consumers;

  // In the constructor make the address that deploys this contract the 1st consumer
  constructor() {
    // SHOULD I CHECK AGAINST THE ZERO ADDRESS ?
    consumers.bearer[msg.sender] = true;
  }
```

Why don't we deploy the Roles library as well?

Can we call addConsumer from the constructor since it calls the onlyConsumer seems like you can't.

Why should UPC and SKU be in SupplyChain.sol?
uint  upc;

// Define a variable called 'sku' for Stock Keeping Unit (SKU)
uint  sku;

Is it ok to set the owner of the item to the msg.sender?

Why do we send the change back in a modifier? => _; means the code executes first and then we send the change.

Why are errors not more meaningful when I do have a message set on reverts.

Despite this, we still recommend reloading the page on chain changes => web3 documentation

What is truffle-contract-schema?