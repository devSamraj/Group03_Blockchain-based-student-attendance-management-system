const AttendanceToken = artifacts.require("AttendanceToken");
const AttendanceRegister = artifacts.require("AttendanceRegister");

module.exports = async function (deployer, network, accounts) {
    const admin = accounts[0];
    // Deploy Token
    await deployer.deploy(AttendanceToken, admin);
    const token = await AttendanceToken.deployed();

    // Deploy Register
    await deployer.deploy(AttendanceRegister, token.address);
    const register = await AttendanceRegister.deployed();

    // Transfer ownership of Token to Register so it can mint
    await token.transferOwnership(register.address);

    console.log("Token deployed at:", token.address);
    console.log("Register deployed at:", register.address);
};
