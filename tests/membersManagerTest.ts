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

    before( async () =>{
        const signers = await ethers.getSigners();

        signer1 = signers[0];
        signer2 = signers[1];

        const MembersManagerFactoryContract = new MembersManagerFactory__factory(signer1);
        const contractFactory = await MembersManagerFactoryContract.deploy();
        await contractFactory.deployTransaction.wait();

        const contractAddressCall = await contractFactory.createMembersManager(contractName);
        const receipt = await contractAddressCall.wait();
        if (receipt.events && receipt.events[0]) {
            newContractAddress = receipt.events[0].address
          } else {
            throw new Error('No events found');
          }
        contract = MembersManager__factory.connect(newContractAddress, signer1);

        const contractFactoryTx = await contractFactory.getDeployedMembersManager();
        const Tx = await contractFactoryTx;
    });

    it("should deploy the contract", async function () {
        expect(Array.isArray(txt)).to.be.true;
        expect(txt).to.include(receipt.events[0].address);
    
     });
    

});