var distributorRole = artifacts.require('DistributorRole');
const TruffleAssert = require("truffle-assertions");

contract("DistributorRole", async (accounts) => {

  it("successfully adds a distributor", async () => {
    const passerBy = accounts[3];
    let distributorContract = await distributorRole.deployed();
    await distributorContract.addDistributor(passerBy);
    const isDistributor  = await distributorContract.isDistributor.call(passerBy);
    assert.equal(true, isDistributor);
  });

  it("assigns the constructor caller as the first distributor", async () => {
    const owner = accounts[0];
    let distributorContract = await distributorRole.deployed({from: owner});
    const isDistributor = await distributorContract.isDistributor.call(owner);
    assert.equal(true, isDistributor);
  });

  it("only lets you add someone as distributor if caller is a  distributor himself", async () => {
    const owner = accounts[0];
    const passerBy = accounts[9];
    const consumer = accounts[2];
    let distributorContract = await distributorRole.deployed({from: owner});
    await TruffleAssert.reverts(distributorContract.addDistributor(passerBy, {from: consumer}))
  })

  it("only lets you remove someone as distributor if caller is a distributor himself", async () => {
    const owner = accounts[0];
    const passerBy = accounts[9];
    const consumer = accounts[2];
    let distributorContract = await distributorRole.deployed({from: owner});
    await distributorContract.addDistributor(passerBy);
    await TruffleAssert.reverts(distributorContract.renounceDistributor(passerBy, {from: consumer}))
  });

  it("lets you remove someone as distributor if you are a distributor", async () => {
    const owner = accounts[0];
    const someOneElse = accounts[7];
    let distributorContract = await distributorRole.deployed({from: owner});
    await distributorContract.addDistributor(someOneElse);
    await distributorContract.renounceDistributor(someOneElse);
    const isDistributor =  await distributorContract.isDistributor.call(someOneElse);
    assert.equal(false, isDistributor);
  });

  it("should emit a distributorAdded event after adding a distributor", async () => {
    const owner = accounts[0];
    const someOneElse = accounts[7];
    let distributorContract = await distributorRole.deployed({from: owner});
    let distributorAdded = await distributorContract.addDistributor(someOneElse);
    await TruffleAssert.eventEmitted(distributorAdded, "DistributorAdded");
  })

  it("should emit a distributorRemoved event after removing a distributor", async () => {
    const owner = accounts[0];
    const anotherPasserBy = accounts[8];
    let distributorContract = await distributorRole.deployed({from: owner});
    await distributorContract.addDistributor(anotherPasserBy);
    let distributorRemoved = await distributorContract.renounceDistributor(anotherPasserBy);
    await TruffleAssert.eventEmitted(distributorRemoved, "DistributorRemoved");
  })

  it("should let you add a distributor even if previously removed", async () => {
    const owner = accounts[0];
    const anotherPasserBy = accounts[8];
    let distributorContract = await distributorRole.deployed({from: owner});
    await distributorContract.addDistributor(anotherPasserBy);
    await distributorContract.renounceDistributor(anotherPasserBy);
    await distributorContract.addDistributor(anotherPasserBy);
    let isDistributor = await distributorContract.isDistributor.call(anotherPasserBy);
    assert.equal(true, isDistributor);
  })
});