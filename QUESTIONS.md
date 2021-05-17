1. Generally speaking when should we check against the zero address?
2. Why don't we deploy the Roles library as well?
3. Is it ok to set the owner of the item to the msg.sender?
4. What are `truffle-contract-schema` and `ethjs-abi"`? Where are they coming from, can't see them in the node modules? (require in truffle-contract)
5. Why did we use TruffleContract in this app?
6. Do you have a flow for saving yourself time with Ganache and Metamask? I notice you can start ganache-cli with a mnemonic so as to get the same keys everytime
7. Why is ItemState represented as an object => X in chrome's debugger console, then decomposes down to c[2], s: 1, e: 0 for example
8. Is there a way to see my transactions like I can in the ganache-cli logs by running `geth --rinkeby` or other?
9. Do you have some professionally-designed UML diagrams to show me for this app?
10. The TestSupplyChain mocha test used to tear down the contract and give me a fresh one after each test, this stopped working...?
11. In `checkValue` this method call reverts w/o a message: `consumerAddress.transfer(amountToReturn)`, I had to use this instead: `consumerAddress.call{value: amountToReturn}("")`;
