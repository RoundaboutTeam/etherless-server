import AWS from 'aws-sdk';
import configUtils from '../utils/configUtils';

const ethers = require('ethers');

// Get configs
const config = configUtils.getConfig();
const { abi } = configUtils.getAbiBytecode();

// Configure aws-sdk
AWS.config.update({
  region: config.awsRegion,
  credentials: new AWS.Credentials(config.awsKey, config.awsSecretKey),
});
const lambda = new AWS.Lambda();

// Connect to the network
const provider = ethers.getDefaultProvider('ropsten');
const wallet = new ethers.Wallet(config.privateKey, provider);

// Connect EtherlessSmart contract to existing address
const contract = new ethers.Contract(config.contractAddress, abi, wallet);
const { contractAddress } = config;

export default {
  ethers, AWS, lambda, contract, wallet, contractAddress,
};
