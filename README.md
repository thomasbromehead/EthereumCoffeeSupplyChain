# UML
# Libraries
Truffle assertions: useful for testing reverts and events emitted
I have docker: true in truffle-config.js, turn that off at will

Libraries used by the front-end: ethjs-abi is deprecated.
https://snyk.io/advisor/npm-package/ethjs-abi

var ethJSABI = require("ethjs-abi");
var BlockchainUtils = require("truffle-blockchain-utils");
var Web3 = require("web3");
@metamask/detect-provider as per recommendations from Metamask documentation
I have a 'from' option for the rinkeby deployment config in truffle.js, change that to your own owner's address.

# IPFS
Contract address: 
0x64E8F187a76B4441C1f3E8C042C3704ABc853f4F
Owner: 0x55a9b04F1C75BB95D4fD11857B05F17540396Eaf

Notes to self:
Contract owner: 0xA95B5bdF5DD35B243457cc40c152a8D7fCA23006
Farmer: 0xcD4b008789742eb41c0160c07384D8d03fA3A7B4
Distributor: 0x4F58dfA687F1AA3553289ad6Bb37207507823c55
Retailer: 0xC542929c903ff1ADdEFB8B58FDE35635962350Cd (Ganache User)
Consumer: 0xaC5B9e69B4c1F174d0175524752704e68ce9c9c4

Versions:
Truffle v5.1.65
Node v12.19.1
npm 6.14.8
web3 1.2.1
Solc 0.7.1

## Requirement 1: Implement Interfaces
## Requirement 2: Build out AccessControl contract
## Requirement 3: Build out Base Contract
## Requirement 4: Build out Core Contract
