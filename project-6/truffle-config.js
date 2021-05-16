const HDWalletProvider = require('truffle-hdwallet-provider');
const NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker");
require('dotenv').config();
// const mnemonic = process.env.MNEMONIC;

const mnemonic = "lemon destroy color fragile drama dish elbow until abandon census oven obey";
// const infura_key = process.env.INFURA_KEY;

providers = {
  ganache: {
    mnemonic: "lemon destroy color fragile drama dish elbow until abandon census oven obey",
    wallet: new HDWalletProvider(mnemonic, "http://localhost:8545")
  },
  rinkeby: {
    // Given by Metamask
    // infura_key = process.env.INFURA_KEY || "",
    // mnemonic: "monkey cream zone canvas tower omit symbol sun add caught raw bread",
    // wallet: new HDWalletProvider(this.rinkeby.mnemonic, `https://rinkeby.infura.io/v3/${this.rinkeby.infura_key}`)
  }
}

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
        var wallet = providers.ganache.wallet;
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