const ethers = require('ethers');
const AWS = require("aws-sdk");
const fs = require('fs');

// Get config
const config = JSON.parse(fs.readFileSync('./config.json', 'UTF-8'));

// Configure aws-sdk
AWS.config.update({
  region: config.awsRegion,
  credentials: new AWS.Credentials(config.awsKey, config.awsSecretKey)
});
const lambda = new AWS.Lambda();

// Connect to the network
const provider = ethers.getDefaultProvider('ropsten');
const wallet = new ethers.Wallet(config.privateKey, provider);

const {abi, bytecode} = JSON.parse(fs.readFileSync('./abi_bytecode.json', 'UTF-8'));

// Connect EtherlessSmart contract to existing address
const contract = new ethers.Contract(config.contractAddress, abi, wallet);

module.exports = { ethers, AWS, lambda, contract, wallet}
module.exports.contractAddress = config.contractAddress;