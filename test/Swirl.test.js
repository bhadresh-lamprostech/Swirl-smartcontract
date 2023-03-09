// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Swirl", function () {
//   let swirl, advertiser, publisher, campaign;

//   beforeEach(async function () {
//     const Swirl = await ethers.getContractFactory("Swirl");
//     swirl = await Swirl.deploy();
//     await swirl.deployed();

//     // Create an advertiser and a publisher
//     [advertiser, publisher] = await ethers.getSigners();
//     await swirl.createAdvertiser(advertiser.address);
//     await swirl.createPublisher(publisher.address);

//     // Create a campaign with a balance of 100
//     await swirl.createCampaign(1, 100);
//     [campaign] = await swirl.getAllCampaigns();
//   });

//   it("should deposit funds to advertiser balance", async function () {
  
//     await swirl.connect(advertiser).deposit(1, { value: 50 });

  
//   });



//   it("should create a campaign", async function () {
    
//     await swirl.createCampaign(1, 200);
//     const [newCampaign] = await swirl.getAllCampaigns();

    
  
//   });
// });

//----------------------------------------------t-2------------------------------------


// const { expect } = require("chai");

// describe("Swirl", function () {
//   let swirl;
//   let advertiser1;
//   let advertiser2;
//   let publisher1;
//   let publisher2;

//   beforeEach(async function () {
//     const Swirl = await ethers.getContractFactory("Swirl");
//     swirl = await Swirl.deploy();
//     await swirl.deployed();

//     [advertiser1, advertiser2, publisher1, publisher2] = await ethers.getSigners();

//     await swirl.createAdvertiser(advertiser1.address);
//     await swirl.createAdvertiser(advertiser2.address);
//     await swirl.createPublisher(publisher1.address);
//     await swirl.createPublisher(publisher2.address);
//   });

//   it("should allow advertisers to create campaigns", async function () {
//     await swirl.connect(advertiser1).createCampaign(1, 100);

//   });

//   it("should not allow non-advertisers to create campaigns", async function () {
//     await expect(swirl.connect(publisher1).createCampaign(1, 100)).to.be.revertedWith("Only advertiser can create campaign");
//   });

//   it("should allow advertisers to deposit funds", async function () {
//     await swirl.connect(advertiser1).deposit(1, { value: 100 });

  
//   });

//   it("should not allow non-advertisers to deposit funds", async function () {
//     await expect(swirl.connect(publisher1).deposit(1, { value: 100 })).to.be.revertedWith("Only advertiser can deposit funds");
//   });

//   it("should allow publishers to withdraw campaign funds", async function () {
//     await swirl.connect(advertiser1).createCampaign(1, 100);
//     await swirl.connect(advertiser1).deposit(1, { value: 100 });
//     await swirl.connect(publisher1).withdraw(1, 1);


//   });

//   it("should not allow non-publishers to withdraw campaign funds", async function () {
//     await swirl.connect(advertiser1).createCampaign(1, 100);
//     await swirl.connect(advertiser1).deposit(1, { value: 100 });

//     await expect(swirl.connect(advertiser1).withdraw(1, 1)).to.be.revertedWith("Only publisher can withdraw");
//   });

//   it("should get all advertisers", async function () {
//     const [ids, addresses] = await swirl.getAllAdvertisers();

//     expect(ids.length).to.equal(2);
//     expect(addresses.length).to.equal(2);
//     expect(ids[0]).to.equal(1);
//     expect(ids[1]).to.equal(2);
//     expect(addresses[0]).to.equal(advertiser1.address);
//     expect(addresses[1]).to.equal(advertiser2.address);
//   });

//   it("should get all publishers", async function () {
//     const ids = await swirl.getAllPublishers();

//     expect(ids.length).to.equal(2);
//     expect(ids[0]).to.equal(1);
//     expect(ids[1]).to.equal(2);
//   });

// });

//-----------------------------------t-3-------------------------

const { expect } = require("chai");

describe("Swirl", function () {
  let swirl;
  let advertiser1;
  let advertiser2;
  let publisher1;
  let publisher2;

  beforeEach(async function () {
    const Swirl = await ethers.getContractFactory("Swirl");
    swirl = await Swirl.deploy();
    await swirl.deployed();

    [advertiser1, advertiser2, publisher1, publisher2] = await ethers.getSigners();

    await swirl.createAdvertiser(advertiser1.address);
    await swirl.createAdvertiser(advertiser2.address);
    await swirl.createPublisher(publisher1.address);
    await swirl.createPublisher(publisher2.address);
  });

  it("should allow advertisers to create campaigns", async function () {
    await swirl.connect(advertiser1).createCampaign(1, 100);

    const campaign = await swirl.getCampaign(1);
    // expect(campaign.advertiserId).to.equal(1);
    // expect(campaign.balance).to.equal(100);
  });

  it("should not allow non-advertisers to create campaigns", async function () {
    await expect(swirl.connect(publisher1).createCampaign(1, 100)).to.be.revertedWith("Only advertiser can create campaign");
  });

  it("should allow advertisers to deposit funds", async function () {
    await swirl.connect(advertiser1).deposit(1, { value: 100 });

    const advertiser = await swirl.getAdvertiser(1);
    expect(advertiser.balance).to.equal(1);
  });

  it("should not allow non-advertisers to deposit funds", async function () {
    await expect(swirl.connect(publisher1).deposit(1, { value: 100 })).to.be.revertedWith("Only advertiser can deposit funds");
  });

  it("should allow publishers to withdraw campaign funds", async function () {
    await swirl.connect(advertiser1).createCampaign(1, 100);
    await swirl.connect(advertiser1).deposit(1, { value: 100 });
    await swirl.connect(publisher1).withdraw(1, 1);

    const advertiser = await swirl.getAdvertiser(1);
    expect(advertiser.balance).to.equal(0);

    const publisherBalance = await ethers.provider.getBalance(publisher1.address);
    expect(publisherBalance).to.equal(100);
  });

  it("should not allow non-publishers to withdraw campaign funds", async function () {
    await swirl.connect(advertiser1).createCampaign(1, 100);
    await swirl.connect(advertiser1).deposit(1, { value: 100 });

    await expect(swirl.connect(advertiser1).withdraw(1, 1)).to.be.revertedWith("Only publisher can withdraw");
  });

  it("should get all advertisers", async function () {
    const [ids, addresses] = await swirl.getAllAdvertisers();

    expect(ids.length).to.equal(2);
    expect(addresses.length).to.equal(2);
    expect(ids[0]).to.equal(1);
    expect(ids[1]).to.equal(2);
    expect(addresses[0]).to.equal(advertiser1.address);
    expect(addresses[1]).to.equal(advertiser2.address);
  });

  it("should get all publishers", async function () {
    const ids = await swirl.getAllPublishers();

    expect(ids.length).to.equal(2);
    expect(ids[0]).to.equal(1);
    expect(ids[1]).to.equal(2);
  });

});