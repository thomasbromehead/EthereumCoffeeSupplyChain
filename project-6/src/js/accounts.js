// accounts = {
//   owner: "0x9164c2992bf6CFAE7FF3BD0a8710682930d762E9",
//   farmer: "0x6350C31ac76C1C8511271c413BF643c002393e07",
//   distributor: "0x08Dc1db5C7Af1D0627C40b9C072486b47c565c76",
//   retailer: "0xcdB16C9986C6802a8986f80962D8d43aFDc10FBa",
//   consumer: "0x49E8e004334D93b493285d78c8567f2D20809F8D"
// }

// window.addEventListener('load', () => {
//   if(document.readyState == "complete"){
    document.getElementById("ownerID").value = accounts.owner;
    document.getElementById("originFarmerID").value = accounts.farmer;
    document.getElementById("distributorID").value = accounts.distributor;
    document.getElementById("consumerID").value = accounts.consumer;
    document.getElementById("retailerID").value = accounts.retailer;
//   }
// })