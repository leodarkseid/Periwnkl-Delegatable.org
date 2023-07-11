// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../delegatable-sol/contracts/Delegatable.sol";

contract MembersManager is Ownable, Delegatable {

    constructor(string memory contractName) Delegatable(contractName, "1") {}

    struct Member {
            uint256 id;
            bool active;
        }

    mapping(address => Member) public members;
    uint256 public memberCount;


    function _msgSender()
        internal
        view
        virtual
        override(DelegatableCore, Context)
        returns (address sender)
    {
        if (msg.sender == address(this)) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;
            assembly {
                sender := and(
                    mload(add(array, index)),
                    0xffffffffffffffffffffffffffffffffffffffff
                )
            }
        } else {
            sender = msg.sender;
        }
        return sender;
    }

    function addMember(address _address) public onlyOwner{
        memberCount++;
        members[_address] = Member(
            memberCount,
            true
            );
    }

    function changeActive(address _address) public onlyOwner {
        members[_address].active = !members[_address].active;
    }

    function membersAmount() public view returns (uint256) {
        return memberCount;
    }
}