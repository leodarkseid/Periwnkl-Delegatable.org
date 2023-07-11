// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./membersManager.sol";

contract MembersManagerFactory {
    address[] public deployedMembersManagers;

    function createMembersManager(string memory _contractName) public returns(address){
        MembersManager newMembersManager = new MembersManager(_contractName);
        newMembersManager.transferOwnership(msg.sender);

        deployedMembersManagers.push(address(newMembersManager));
        return address(newMembersManager);
    }

    function getDeployedMembersManager() public view returns (address[] memory) {
        return deployedMembersManagers;
    }
}