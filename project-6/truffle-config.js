const HDWalletProvider = require('truffle-hdwallet-provider');
const NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker");
require('dotenv').config();
const mnemonic = process.env.MNEMONIC;
const infura_key = process.env.INFURA_KEY;
console.log("MNEMONIC IS:", mnemonic);
console.log("INFURAK KEY IS:", infura_key);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    // rinkeby: {
    //   provider: () => {
    //     var wallet = new HDWalletProvider("monkey cream zone canvas tower omit symbol sun add caught raw bread", `https://rinkeby.infura.io/v3/a5509144fe434cb6b4001d4b4af2243b`)
    //     var nonceTracker = new NonceTrackerSubprovider()
    //     wallet.engine._providers.unshift(nonceTracker)
    //     nonceTracker.setEngine(wallet.engine)
    //     return wallet
    //   },
    //   network_id: 4,
    //   gas: 5500000,
    //   gasPrice: 21000000000
    rinkeby: {
      provider: () => {
        //var wallet = new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infura_key}`);
        var wallet = new HDWalletProvider(
          "monkey cream zone canvas tower omit symbol sun add caught raw bread",
          `https://rinkeby.infura.io/v3/a5509144fe434cb6b4001d4b4af2243b`);
        // console.log("WALLET IS ", wallet);
        var nonceTracker = new NonceTrackerSubprovider();
        wallet.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(wallet.engine);
        return wallet
      },
      network_id: 4,
      gas: 5500000,
      gasPrice: 21000000000,
      from: "0xA95B5bdF5DD35B243457cc40c152a8D7fCA23006"
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