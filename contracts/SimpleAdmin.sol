// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleAdmin {
    mapping(address => bool) public isAdmin;
    address public owner;

    constructor() {
        owner = msg.sender;
        isAdmin[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Not an admin");
        _;
    }

    function addAdmin(address newAdmin) public onlyAdmin {
        isAdmin[newAdmin] = true;
    }

    function removeAdmin(address admin) public onlyAdmin {
        require(admin != msg.sender, "Cannot remove self");
        isAdmin[admin] = false;
    }
}
