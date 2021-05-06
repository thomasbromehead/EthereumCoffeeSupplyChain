var consumerRole = artifacts.require('ConsumerRole');
const TruffleAssert = require("truffle-assertions");

contract("ConsumerRole", async (accounts) => {
  
  it.only("assigns the constructor caller as the first consumer", async () => {
    const owner = accounts[0];
    let consumerContract = await consumerRole.deployed({from: owner});
    const isConsumer = await consumerContract.isConsumer.call(owner);
    assert.equal(true, isConsumer);
  });

  it.only("successfully adds a consumer", async () => {
    const passerBy = accounts[3];
    let consumerContract = await consumerRole.deployed();
    await consumerContract.addConsumer(passerBy);
    const isConsumer = await consumerContract.isConsumer.call(passerBy);
    assert.equal(true, isConsumer);
  });

  it.only("only lets you add someone as consumer if caller is a consumer himself", async () => {
    const owner = accounts[0];
    const passerBy = accounts[9];
    const distributor = accounts[2];
    let consumerContract = await consumerRole.deployed({from: owner});
    await TruffleAssert.reverts(consumerContract.addConsumer(passerBy, {from: distributor}))
  });

  it.only("only lets you remove someone as consumer if caller is a consumer himself", async () => {
    const passerBy = accounts[9];
    const distributor = accounts[2];
    let consumerContract = await consumerRole.deployed();
    await consumerContract.addConsumer(passerBy);
    await TruffleAssert.reverts(consumerContract.renounceConsumer(passerBy, {from: distributor}))
  });

  it.only("lets you remove someone as consumer if you are a consumer", async () => {
    const someOneElse = accounts[7];
    let consumerContract = await consumerRole.deployed();
    await consumerContract.addConsumer(someOneElse);
    await consumerContract.renounceConsumer(someOneElse);
    let isConsumer =  await consumerContract.isConsumer.call(someOneElse);
    assert.equal(false, isConsumer);
  });

  it.only("should emit a ConsumerAdded event after adding a Consumer", async () => {
    const owner = accounts[0];
    const someOneElse = accounts[7];
    let consumerContract = await consumerRole.deployed({from: owner});
    let consumerAdded = await consumerContract.addConsumer(someOneElse);
    await TruffleAssert.eventEmitted(consumerAdded, "ConsumerAdded");
  });

  it.only("should emit a ConsumerRemoved event after removing a Consumer", async () => {
    const owner = accounts[0];
    const anotherPasserBy = accounts[8];
    let consumerContract = await consumerRole.deployed({from: owner});
    await consumerContract.addConsumer(anotherPasserBy);
    let consumerRemoved = await consumerContract.renounceConsumer(anotherPasserBy);
    await TruffleAssert.eventEmitted(consumerRemoved, "ConsumerRemoved");
  });

  it.only("should let you add a consumer even if previously removed", async () => {
    const owner = accounts[0];
    const anotherPasserBy = accounts[8];
    let consumerContract = await consumerRole.deployed({from: owner});
    await consumerContract.addConsumer(anotherPasserBy);
    await consumerContract.renounceConsumer(anotherPasserBy);
    await consumerContract.addConsumer(anotherPasserBy)
    let isConsumer = await consumerContract.isConsumer.call(anotherPasserBy);
    assert.equal(true, isConsumer);
  });
});