const HDWalletProvider = require('truffle-hdwallet-provider');
const NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker");
require('dotenv').config();

const MNEMONIC = process.env.MNEMONIC;
const INFURA_KEY = process.env.INFURA_KEY;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => {
        var wallet = new HDWalletProvider("spirit supply whale amount human item harsh scare congress discover talent hamster", `https://rinkeby.infura.io/v3/a5509144fe434cb6b4001d4b4af2243b`)
        var nonceTracker = new NonceTrackerSubprovider()
        wallet.engine._providers.unshift(nonceTracker)
        nonceTracker.setEngine(wallet.engine)
        return wallet
      },
      network_id: 4,
      gas: 5500000,
      gasPrice: 21000000000
    },
  },
  compilers: {
    solc: {
      version: "0.7.1",
      docker: "",
      parser: "solcjs",
      docker: true
    }
  } 
};