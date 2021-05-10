// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')
const BN = require('bn.js');
const TruffleAssert = require("truffle-assertions");

    
// Add tests for OnlyOriginFarmer
// Extract functions for each action.
// Test that you can't go through States w/o asserting previous one.
// Test fails if amount is less than product price, did not fail with value: 0.9

// Test Pause function

contract('SupplyChain', function(accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 1
    var upc = 1
    const ownerID = accounts[0]
    const originFarmerID = accounts[1]
    const originFarmName = "John Doe"
    const originFarmInformation = "Yarray Valley"
    const originFarmLatitude = "-38.239770"
    const originFarmLongitude = "144.341490"
    var productID = sku + upc
    const productNotes = "Best beans for Espresso"
    const productPrice = web3.utils.toWei(new BN(1).toString(), "ether")
    var itemState = 0
    const distributorID = accounts[2]
    const retailerID = accounts[3]
    const consumerID = accounts[4]
    const emptyAddress = '0x0000000000000000000000000000000000000000'

    ///Available Accounts
    ///==================
    ///(0) 0x27d8d15cbc94527cadf5ec14b69519ae23288b95
    ///(1) 0x018c2dabef4904ecbd7118350a0c54dbeae3549a
    ///(2) 0xce5144391b4ab80668965f2cc4f2cc102380ef0a
    ///(3) 0x460c31107dd048e34971e57da2f99f659add4f02
    ///(4) 0xd37b7b8c62be2fdde8daa9816483aebdbd356088
    ///(5) 0x27f184bdc0e7a931b507ddd689d76dba10514bcb
    ///(6) 0xfe0df793060c49edca5ac9c104dd8e3375349978
    ///(7) 0xbd58a85c96cc6727859d853086fe8560bc137632
    ///(8) 0xe07b5ee5f738b2f87f88b99aac9c64ff1e0c7917
    ///(9) 0xbd3ff2e3aded055244d66544c9c059fa0851da44

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Farmer: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Retailer: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async() => {
        const supplyChain = await SupplyChain.deployed();
        await supplyChain.addFarmer(originFarmerID, {from: ownerID, gas: 2100000});
        let isFarmer = await supplyChain.isFarmer(originFarmerID);
        assert.equal(true, isFarmer);
        // Mark an item as Harvested by calling function harvestItem()
        // Harvest the item
        let harvestTx = await supplyChain.harvestItem(
            upc,
            originFarmerID, 
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes,
            {from: originFarmerID, gas: 2100000}
        );
        // Test event emitted with truffle-assertions
        await TruffleAssert.eventEmitted(harvestTx, "Harvested");

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0].toNumber(), sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1].toNumber(), upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State')
        assert.equal(resultBufferTwo[6], emptyAddress, 'Error: distributorId should not be set at this stage')
        assert.equal(resultBufferTwo[7], emptyAddress, 'Error: retailerId should not be set at this stage')
        assert.equal(resultBufferTwo[8], emptyAddress, 'Error: consumerId should not be set at this stage')
    })    

    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async() => {
        const supplyChain = await SupplyChain.deployed();
        await supplyChain.addFarmer(originFarmerID, {from: ownerID, gas: 2100000});
        // Harvest the item
        await supplyChain.harvestItem(
            upc,
            originFarmerID, 
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes,
            {from: originFarmerID, gas: 2100000}
        );
        // Process the item     
        let processTx = await supplyChain.processItem(upc, {from: originFarmerID, gas: 2100000});
        // Watch the emitted event Processed()
        await TruffleAssert.eventEmitted(processTx, "Processed");
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
        // Verify the result set
        assert.equal(resultBufferTwo[3], "Coffee beans have been processed");
        assert.equal(resultBufferTwo[5], 1);
    })    

    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async() => {
        const supplyChain = await SupplyChain.deployed();
        await supplyChain.addFarmer(originFarmerID, {from: ownerID, gas: 2100000});
        // Harvest the item
       await supplyChain.harvestItem(
            upc,
            originFarmerID, 
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes,
            {from: originFarmerID, gas: 2100000}
        ); 
        // Process the item     
        await supplyChain.processItem(upc, {from: originFarmerID});
        // Pack the item
        let packTx = await supplyChain.packItem(upc, {from: originFarmerID, gas: 2100000});
        // await TruffleAssert.eventEmitted(packTx, "Packed");
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
        // Verify the result set
        assert.equal(resultBufferTwo[5], 2);
    }) 


    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async() => {
        const supplyChain = await SupplyChain.deployed();
        await supplyChain.addFarmer(originFarmerID, {from: ownerID, gas: 2100000});
        await supplyChain.harvestItem(
            upc,
            originFarmerID, 
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes,
            { from: originFarmerID, gas: 2100000 }
        );    
        await supplyChain.processItem(upc, {from: originFarmerID});
        await supplyChain.packItem(upc, {from: originFarmerID});
        let forSaleTx = await supplyChain.sellItem(upc, 1, {from: originFarmerID, gas: 2100000});
        // Watch the emitted event ForSale()
        // await TruffleAssert.eventEmitted(forSaleTx, "ForSale");
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        // Check price and State
        assert.equal(resultBufferTwo[5], 3);
        assert.equal(resultBufferTwo[4], 1);
    })    

    //5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async() => {
        // Declare and Initialize a variable for event
        const supplyChain = await SupplyChain.deployed();
        await supplyChain.addFarmer(originFarmerID, {from: ownerID});
        await supplyChain.harvestItem(
            upc,
            originFarmerID, 
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes,
            {from: originFarmerID}
        );
        await supplyChain.processItem(upc, {from: originFarmerID});
        await supplyChain.packItem(upc, {from: originFarmerID});
        await supplyChain.sellItem(upc, 1, {from: originFarmerID});
        // Mark an item as Sold by calling function buyItem()
        await supplyChain.addDistributor(distributorID);
        let buyTx = await supplyChain.buyItem(upc, {from: distributorID, value: 1});
        // Watch the emitted event Sold()
        await TruffleAssert.eventEmitted(buyTx, "Sold");    
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
        // // Retrieve the just now saved item from blockchain by calling function fetchItem()
        // // Verify the result set
        assert.equal(resultBufferOne[2], distributorID);
        assert.equal(resultBufferTwo[5], 4);
        assert.equal(resultBufferTwo[6], distributorID);
    })    

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => {
        // Declare and Initialize a variable for event
        const supplyChain = await SupplyChain.deployed();
        await supplyChain.addFarmer(originFarmerID, {from: ownerID});
        await supplyChain.harvestItem(
            upc,
            originFarmerID, 
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes,
            {from: originFarmerID}
        );
        await supplyChain.processItem(upc, {from: originFarmerID});
        await supplyChain.packItem(upc, {from: originFarmerID});
        await supplyChain.sellItem(upc, 1, {from: originFarmerID});
        // Mark an item as Sold by calling function buyItem()
        await supplyChain.addDistributor(distributorID);
        await supplyChain.buyItem(upc, {from: distributorID, value: 1});
        let shipTx = await supplyChain.shipItem(upc, {from: distributorID});
        // // Watch the emitted event Shipped()
        await TruffleAssert.eventEmitted(shipTx, "Shipped");
        // // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
        // Verify the result set
        assert.equal(resultBufferTwo[5], 5);
    })    

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async() => {
        const supplyChain = await SupplyChain.deployed();
        await supplyChain.addFarmer(originFarmerID, {from: ownerID});
        await supplyChain.harvestItem(
            upc,
            originFarmerID, 
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes,
            {from: originFarmerID}
        );
        await supplyChain.processItem(upc, {from: originFarmerID});
        await supplyChain.packItem(upc, {from: originFarmerID});
        await supplyChain.sellItem(upc, 1, {from: originFarmerID});
        // Mark an item as Sold by calling function buyItem()
        await supplyChain.addDistributor(distributorID);
        await supplyChain.buyItem(upc, {from: distributorID, value: 1});
        await supplyChain.shipItem(upc, {from: distributorID});
        let addRetailerTx = await supplyChain.addRetailer(retailerID);
        await TruffleAssert.eventEmitted(addRetailerTx, "RetailerAdded");
        let ReceivedTx = await supplyChain.receiveItem(upc, {from: retailerID});
        // Verify the result set
        await TruffleAssert.eventEmitted(ReceivedTx, "Received");
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
        assert.equal(resultBufferOne[2], retailerID);
        assert.equal(resultBufferTwo[5], 6);
        assert.equal(resultBufferTwo[7], retailerID); 
    })    

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async() => {
        const supplyChain = await SupplyChain.deployed();
        await supplyChain.addFarmer(originFarmerID, {from: ownerID});
        await supplyChain.harvestItem(
            upc,
            originFarmerID, 
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes,
            {from: originFarmerID}
        );
        await supplyChain.processItem(upc, {from: originFarmerID});
        await supplyChain.packItem(upc, {from: originFarmerID});
        await supplyChain.sellItem(upc, 1, {from: originFarmerID});
        // Mark an item as Sold by calling function buyItem()
        await supplyChain.addDistributor(distributorID);
        await supplyChain.buyItem(upc, {from: distributorID, value: 1});
        await supplyChain.shipItem(upc, {from: distributorID});
        await supplyChain.addRetailer(retailerID);
        await supplyChain.receiveItem(upc, {from: retailerID});
        let addConsumerTx = await supplyChain.addConsumer(consumerID);
        await TruffleAssert.eventEmitted(addConsumerTx, "ConsumerAdded");
        let purchaseTx = await supplyChain.purchaseItem(upc, {from: consumerID});
        await TruffleAssert.eventEmitted(purchaseTx, "Purchased");
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
        assert.equal(resultBufferOne[2], consumerID);
        assert.equal(resultBufferTwo[5], 7);
        assert.equal(resultBufferTwo[8], consumerID);
    })    

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async() => {
        // SETUP 
        const supplyChain = await SupplyChain.deployed();
        await supplyChain.addFarmer(originFarmerID, {from: ownerID});
        await supplyChain.harvestItem(
            upc,
            originFarmerID, 
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes,
            {from: originFarmerID}
        );
        await supplyChain.processItem(upc, {from: originFarmerID});
        await supplyChain.packItem(upc, {from: originFarmerID});
        await supplyChain.sellItem(upc, 1, {from: originFarmerID});
        // Mark an item as Sold by calling function buyItem()
        await supplyChain.addDistributor(distributorID);
        await supplyChain.buyItem(upc, {from: distributorID, value: 1});
        await supplyChain.shipItem(upc, {from: distributorID});
        await supplyChain.addRetailer(retailerID);
        await supplyChain.receiveItem(upc, {from: retailerID});
        let addConsumerTx = await supplyChain.addConsumer(consumerID);
        await TruffleAssert.eventEmitted(addConsumerTx, "ConsumerAdded");
        let purchaseTx = await supplyChain.purchaseItem(upc, {from: consumerID});
        await TruffleAssert.eventEmitted(purchaseTx, "Purchased");
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        // SKU
        assert.equal(resultBufferOne[0], 1);
        // UPC
        assert.equal(resultBufferOne[1], 1);
        // OWNER ID
        assert.equal(resultBufferOne[2], consumerID);
        // OriginFarmerId
        assert.equal(resultBufferOne[3], originFarmerID);
        // Origin Farm Name
        assert.equal(resultBufferOne[4], originFarmName);
        // Origin Farm Information
        assert.equal(resultBufferOne[5], originFarmInformation);
        // Origin Farm Latitude
        assert.equal(resultBufferOne[6], originFarmLatitude);
        // Origin Farm Longitude
        assert.equal(resultBufferOne[7], originFarmLongitude);
    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async() => {
        // SETUP 
        const supplyChain = await SupplyChain.deployed();
        await supplyChain.addFarmer(originFarmerID, {from: ownerID});
        await supplyChain.harvestItem(
            upc,
            originFarmerID, 
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes,
            {from: originFarmerID}
        );
        await supplyChain.processItem(upc, {from: originFarmerID});
        await supplyChain.packItem(upc, {from: originFarmerID});
        await supplyChain.sellItem(upc, 1, {from: originFarmerID});
        // Mark an item as Sold by calling function buyItem()
        await supplyChain.addDistributor(distributorID);
        await supplyChain.buyItem(upc, {from: distributorID, value: 1});
        await supplyChain.shipItem(upc, {from: distributorID});
        await supplyChain.addRetailer(retailerID);
        await supplyChain.receiveItem(upc, {from: retailerID});
        let addConsumerTx = await supplyChain.addConsumer(consumerID);
        await TruffleAssert.eventEmitted(addConsumerTx, "ConsumerAdded");
        let purchaseTx = await supplyChain.purchaseItem(upc, {from: consumerID});
        await TruffleAssert.eventEmitted(purchaseTx, "Purchased");
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
        // SKU
        assert.equal(resultBufferTwo[0], 1);
        // UPC
        assert.equal(resultBufferTwo[1], 1);
        // Product ID
        assert.equal(resultBufferTwo[2], 2);
        // Product Notes
        assert.equal(resultBufferTwo[3], "Coffee beans have been processed\n Packed on May 10th 2021");
        // Product Price
        assert.equal(resultBufferTwo[4], 1);
        // Item State
        assert.equal(resultBufferTwo[5], 7);
        // Distributor Id
        assert.equal(resultBufferTwo[6], distributorID);
        // Retailer Id
        assert.equal(resultBufferTwo[7], retailerID);
        // Consumer Id 
        assert.equal(resultBufferTwo[7], consumerID);

    })

    it.only("Should let the owner pause the contract if needed", async () => {
        const supplyChain = await SupplyChain.deployed();
        const currentState = await supplyChain.currentContractState.call();
        assert.equal(currentState, 0);
        await supplyChain.pauseContract();
        const newState = await supplyChain.currentContractState.call();
        assert.equal(newState, 1);
    });

    const getSupplyChain = async () =>  await SupplyChain.deployed() ;
    async function harvest(upc, caller){
        const supplyChain = await getSupplyChain();
        return await supplyChain.harvestItem(
            upc,
            originFarmerID, 
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes,
            { from: caller }
        )
    }

    // const addFarmer = async (farmerId, caller) => {
    //     const sc = await SupplyChain.deployed();
    //     return await sc.addFarmer(farmerId, {from: caller});
    // } 

    // const getBufferOne = async (upc) => {
    //     const sc = await SupplyChain.deployed();
    //     return await sc.fetchItemBufferOne(upc);
    // }

    // const getBufferTwo = async (upc) => {
    //     const sc = await SupplyChain.deployed();
    //     return await sc.fetchItemBufferTwo(upc);
    // }

    // async function processItem(upc, caller){
    //     const sc = await getSupplyChain(); 
    //     return await sc.processItem(upc, {from: caller});
    // };

    // async function packItem(upc, caller){
    //     const sc = await getSupplyChain();
    //     return await sc.packItem(upc, {from: caller});
    // }

    // async function putUpForSale(upc, price, caller){
    //     const sc = await getSupplyChain();
    //     return await sc.sellItem(upc, price, {from: caller});
    // }

    // async function buyItem(upc, caller){
    //     const sc = await getSupplyChain();
    //     return await sc.buyItem(upc, {from: caller, value: 1});
    // }

    // async function addDistributor(upc, caller){
    //     const sc = await getSupplyChain();
    //     return await sc.addDistributor(upc, {from: caller});
    // }
});

