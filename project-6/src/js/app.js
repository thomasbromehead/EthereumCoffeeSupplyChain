let provider;
require(['../../node_modules/@metamask/detect-provider/dist/detect-provider'], function(required) {
    (async () => { provider = await required()})();
});

App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0xA95B5bdF5DD35B243457cc40c152a8D7fCA23006",
    originFarmerID: "0xcD4b008789742eb41c0160c07384D8d03fA3A7B4",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x4F58dfA687F1AA3553289ad6Bb37207507823c55",
    retailerID: "0xC542929c903ff1ADdEFB8B58FDE35635962350Cd",
    consumerID: "0xaC5B9e69B4c1F174d0175524752704e68ce9c9c4",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();

        console.log(
            "Info about contract and actors:",
            App.sku,
            App.upc,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers... 
        if(window.ethereum == provider){
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                console.log("Thanks for connecting to this site!");
                App.getMetamaskAccountID();
                if(accounts.length == 0){
                    let accountUnlocked = await ethereum.isUnlocked();
                    if(!accountUnlocked()){
                        alert("Please connect your account to this site") 
                    } 
                }
                console.log("ACCOUNTS IN FIRST CALL ARE:", accounts);
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            console.log("Using Ganache");
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        console.log("here");
        return App.initSupplyChain();
    },

    getMetamaskAccountID: async function () {
        try {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(res => {
                App.metamaskAccountID = res[0];
                console.log("Currently using this account", res[0])
            })
            .catch(error => {
                console.log("An error occured while retrieving the account", error)
            })
        } catch (error) {
            console.log("An error occured", error);
        }

    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        // JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data', data);
            var SupplyChainArtifact = data;
            console.log("Truffle Contract", TruffleContract(SupplyChainArtifact))
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            console.log("Available contracts", App.contracts);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();
        });
        return App.bindEvents();
    },

    bindEvents: function() {
        console.log(document);
        document.addEventListener('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();
        App.getMetamaskAccountID();
        var processId = parseInt($(event.target).data('id'));
        console.log('processId', processId);
        switch(processId) {
            case 1:
                return await App.addRole(event);
                break;
            case 2:
                return await App.renounceRole(event);
                break;
            case 3:
                return await App.isFarmer(event);
                break;
            case 4:
                return await App.isDistributor(event);
                break;
            case 5:
                return await App.isRetailer(event);
                break;
            case 6:
                return await App.isConsumer(event);
                break;
            case 6:
                return await App.fetchItemBufferOne(event);
                break;
            case 7:
                return await App.fetchItemBufferTwo(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.harvestItem(event);
                break;
            case 9:
                return await App.processItem(event);
                break;
            case 10:
                return await App.packItem(event);
                break;
            case 11:
                return await App.sellItem(event);
                break;
            case 12:
                return await App.buyItem(event);
                break;
            case 13:
                return await App.shipItem(event);
                break;
            case 14:
                return await App.receiveItem(event);
                break;
            case 15:
                return await App.purchaseItem(event);
                break;
            }
    },

    addRole: function(event){
        event.preventDefault();
        let roleOption = document.getElementById("addressRole");
        if(roleOption){
            let selectedRole = roleOption.value;
            let instance = App.contracts.SupplyChain.deployed()
            // Call the appropriate smart contrat function.
            // then(instance => {
            //     return instance.add
            // })
        } else {
            throw new Error("Could not find element with id ownerId");
        }

    },

    harvestItem: function(event){
        event.preventDefault();
        console.log("Supply chain contract", App.contracts.SupplyChain);
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.harvestItem(
                App.upc, 
                App.metamaskAccountID, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('harvestItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    processItem: function (event) {
        event.preventDefault();
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.processItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('processItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    packItem: function (event) {
        event.preventDefault();
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.packItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('packItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();
        App.contracts.SupplyChain.deployed().then(function(instance) {
            const productPrice = web3.toWei(1, "ether");
            console.log('productPrice',productPrice);
            return instance.sellItem(App.upc, App.productPrice, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('Selling Item', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(3, "ether");
            return instance.buyItem(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('buyItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            console.log('shipItem',result);
            $("#ftc-item").text(result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('receiveItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.purchaseItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('purchaseItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferOne', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
                        
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        }); 
    }
};

window.addEventListener('load', () => {
    console.log("Starting the app");
    App.init();
    window.App = App;
    console.log("Window.App", window.App)
})
// $(function () {
//     $(window).load(function () {
//         console.log("Starting the app");
//         App.init();
//         window.App = App;
//         console.log("Window.App", window.App)
//     });
// });

ethereum.on('accountsChanged', (accounts) => {
// Handle the new accounts, or lack thereof.
// "accounts" will always be an array, but it can be empty.
    console.log(accounts);
});
  
ethereum.on('chainChanged', (chainId) => {
// Handle the new chain.
// Correctly handling chain changes can be complicated.
// We recommend reloading the page unless you have good reason not to.
    window.location.reload();
});