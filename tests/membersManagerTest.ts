import { MembersManager, MembersManagerFactory, MembersManagerFactory__factory, MembersManager__factory } from "../typechain-types";
import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";

describe ("Members Manager, Deployment and functionality", () =>{
    let contractFactory: MembersManagerFactory;
    let signer1: Signer;
    let signer2: Signer;
    let contract: MembersManager;
    let newContractAddress: string;
    const contractName = "example"
    let contractFactoryTx: any;
    let receipt: any;
    const address: string = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
    const address2: string = "0x51a1449b3b6d635eddec781cd47a99221712de97";
    const address3: string = "0x4ef5dcc8c11cc1ee3913b81e59612f425feb2b8a";

    before( async () =>{
        const signers = await ethers.getSigners();

        signer1 = signers[0];
        signer2 = signers[1];

        const MembersManagerFactoryContract = new MembersManagerFactory__factory(signer1);
        const contractFactory = await MembersManagerFactoryContract.deploy();
        await contractFactory.deployTransaction.wait();

        const contractAddressCall = await contractFactory.createMembersManager(contractName);
        receipt = await contractAddressCall.wait();
        if (receipt.events && receipt.events[0]) {
            newContractAddress = receipt.events[0].address
          } else {
            throw new Error('No events found');
          }
        contract = MembersManager__factory.connect(newContractAddress, signer1);

        contractFactoryTx = await contractFactory.getDeployedMembersManager();
        // const Tx = await contractFactoryTx;
    });

    it("should deploy the contract", async () => {
        expect(Array.isArray(contractFactoryTx)).to.be.true;
        expect(contractFactoryTx).to.include(receipt.events[0].address);
     });

    it("should add new employees",async () =>{
        const addMember = await contract.addMember(address);
        const addMember2 = await contract.addMember(address2);
        const addMember3 = await contract.addMember(address3);
        receipt = await addMember.wait();
        receipt = await addMember2.wait();
        receipt = await addMember3.wait();
        const checkMemberId1 = (await contract.members(address)).id;
        const checkMemberId2 = (await contract.members(address2)).id;
        const checkMemberId3 = (await contract.members(address3)).id;
        expect(checkMemberId1).to.equal(1);
        expect(checkMemberId2).to.equal(2);
        expect(checkMemberId3).to.equal(3);
    });

    it("deactivate member",async () => {
        const deactivateMember1 = await contract.changeActive(address);
        const deactivateMember2 = await contract.changeActive(address2);
        const deactivateMember3 = await contract.changeActive(address3);
        const check_If_Member1_IsDeactivated = (await contract.members(address)).active;
        const check_If_Member2_IsDeactivated = (await contract.members(address2)).active;
        const check_If_Member3_IsDeactivated = (await contract.members(address3)).active;
        expect(check_If_Member1_IsDeactivated).to.equal(false);
        expect(check_If_Member2_IsDeactivated).to.equal(false);
        expect(check_If_Member1_IsDeactivated).to.equal(false);
    });

    it("activate member",async () => {
        const activateMember1 = await contract.changeActive(address);
        const activateMember2 = await contract.changeActive(address2);
        const activateMember3 = await contract.changeActive(address3);
        const check_If_Member1_IsActivated = (await contract.members(address)).active;
        const check_If_Member2_IsActivated = (await contract.members(address2)).active;
        const check_If_Member3_IsActivated = (await contract.members(address3)).active;
        expect(check_If_Member1_IsActivated).to.equal(true);
        expect(check_If_Member2_IsActivated).to.equal(true);
        expect(check_If_Member1_IsActivated).to.equal(true);
    });

    it("check amount of members", async () => {
        const checkAmount = await contract.membersAmount();
        expect(checkAmount).to.equal(3);
    })
    

});