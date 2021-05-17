Hi Mentor/Corrector,
All tests are passing, added some to test the Access Control for the Distributor and Consumer Roles, all 4 contracts are pretty much the same so only did these two.
I have `docker: true` in `truffle-config.js`, turn that off at will
The mnemonic and infura keys are passed into the truffle-config.js code through a .env file.


# UML
[Activity diagram](https://lucid.app/lucidchart/invitations/accept/inv_078f22d6-2d15-4a67-b1bd-2aea89c66f8c?viewport_loc=-353%2C673%2C2713%2C1538%2CDhyzAE0yT9De)
[Sequence diagram](https://lucid.app/lucidchart/invitations/accept/inv_38928bec-ce94-4f36-ae6c-3aa68d22d3e7?viewport_loc=693%2C944%2C2135%2C1211%2C0_0)
[Class diagram](https://lucid.app/lucidchart/invitations/accept/inv_a6abb4ca-7614-49d2-8056-73158e0dee44?viewport_loc=-1056%2C-120%2C4839%2C2744%2C0_0)
[State Diagram](https://lucid.app/lucidchart/invitations/accept/inv_11fcbdd6-a902-42c1-95e6-81074991b928?viewport_loc=20%2C23%2C1937%2C1098%2C0_0)


# Libraries
1. `truffle-assertions`: useful for testing reverts and events emitted
2. `truffle-hd-wallet-provider`: used for signing transactions
3. `@metamask/detect-provider`: tried using the metamask ethereum API for detecting providers, the approach used in the code is the old way. Managed it and then stopped working. I was also able to listen to events successfully using that. `ethereum.on('FarmerAdded, () => {})'`
4. `web3`: for making JSON-RCP calls from the client to the network Metamask is connected to.
5. `web3-provider-engine`: had to add this library to use its NonceTracker to keep deploying account's nonce synchronized with network.

The `ethjs-abi` is deprecated, why does TruffleContract still depend on it?
https://snyk.io/advisor/npm-package/ethjs-abi


## Rinkeby address
**0xb76118FE7Bdd8B202D95bC2C3ad769d2061AdC6b**

Versions:
Truffle v5.1.65
Node v12.19.1
npm 6.14.8
web3 1.2.1
Solc 0.7.1


## Creating an Item
Fill in the appropriate fields in Farm Details as well as any Product Notes you want to add in Product Details before harvesting

## Getting info about an Item
The Product and Farm Details fields can be used both to create an Item but will also be populated when clicking on fetchItemBufferOne/Two.

## QUESTIONS
Please see Questions.md ;)

## Issues
Can't seem to deploy without manually entering the mnemonic, process.env.MNEMONIC gives timeouts...
Local: Encountering an exception at the very last action, consumer wants to purchase but getting an issue.
Rinkeby: Also having some issues interacting with the contract once deployed to rinkeby...

