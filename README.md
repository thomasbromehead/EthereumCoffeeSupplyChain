Hi Mentor/Corrector,
All tests are passing, added some to test the Access Control for the Distributor and Consumer Roles, all 4 contracts are pretty much the same so only did these two.
I have `docker: true` in `truffle-config.js`, turn that off at will
The mnemonic and infura keys are passed into the truffle-config.js code through a .env file.


# UML
[Activity diagram](https://lucid.app/lucidchart/d42ed068-99b4-40d6-9ead-84c12436418f/view)
[Sequence diagram](https://lucid.app/lucidchart/52b7a788-7c14-41d9-b966-f591671da914/view?page=0_0#)
[Class diagram](https://lucid.app/lucidchart/9ba8ffe7-cab8-42a1-b17c-ed6df17f4b39/view)
[State Diagram](https://lucid.app/lucidchart/0900b29a-696e-48d3-aeb8-bb60b0d28f5e/view)

# Libraries
1. `truffle-assertions`: useful for testing reverts and events emitted
2. `truffle-hd-wallet-provider`: used for signing transactions
3. `@metamask/detect-provider`: tried using the metamask ethereum API for detecting providers, the approach used in the code is the old way. Managed it and then stopped working. I was also able to listen to events successfully using that. `ethereum.on('FarmerAdded, () => {})'`
4. `web3`: for making JSON-RCP calls from the client to the network Metamask is connected to.
5. `web3-provider-engine`: had to add this library to use its NonceTracker to keep deploying account's nonce synchronized with network.

The `ethjs-abi` is deprecated, why does TruffleContract still depend on it?
https://snyk.io/advisor/npm-package/ethjs-abi


## Rinkeby address and transaction hash
**0xb76118FE7Bdd8B202D95bC2C3ad769d2061AdC6b**
**0x17dd0d8f761c848c86a779a23cf0fe557088be1de0afa287e080f4dde07c766b**

## Seed used for deploying the contract
I used a different seed from the one provided in ganache-cli.txt, please use it so you can interact with the contract as its owner and add roles to other addresses, pause the contract etc.
`monkey cream zone canvas tower omit symbol sun add caught raw bread`

## Library Versions:
Truffle v5.1.65
Node v12.19.1
web3 1.2.1
Solc 0.7.1


## Creating an Item
Fill in the appropriate fields in Farm Details as well as any Product Notes you want to add in Product Details before harvesting

## Getting info about an Item
The Product and Farm Details fields can be used both to create an Item but will also be populated when clicking on fetchItemBufferOne/Two.

## QUESTIONS
Please see Questions.md ;).

## Issues
Can't seem to deploy without manually entering the mnemonic, process.env.MNEMONIC gives timeouts...
Local: Encountering an exception at the very last action, consumer wants to purchase but getting an issue.
Rinkeby: Also having some issues interacting with the contract once deployed to rinkeby...

