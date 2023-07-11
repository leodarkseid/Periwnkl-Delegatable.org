// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../delegatable-sol/contracts/Delegatable.sol";

contract MembersManager is Ownable, Delegatable {

    struct Member {
        uint256 id;
        bool active;
    }

    mapping(address => Member) public members;
    uint256 public memberCount;

    function addMember(address _address) public onlyOwner{
        memberCount++;
        members[_address] = Member(
            memberCount,
            true
            );
    }

    function changeActive(address _address) public onlyOwner {
        (members[_address].active == true) ? (members[_address].active = false):(members[_address].active = true);
    }

    function membersAmount() public view returns (uint256) {
        return memberCount;
    }
}