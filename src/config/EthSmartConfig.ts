import { Contract } from 'ethers';

const ethers = require('ethers');

class EthSmartConfig {
    public readonly networkName: string;

    public readonly privateKey: string;

    public readonly contractAddress: string;

    public readonly contractAbi: any;

    constructor(networkName: string, privateKey: string, contractAddress: string, abi: any) {
      this.networkName = networkName;
      this.privateKey = privateKey;
      this.contractAddress = contractAddress;
      this.contractAbi = abi;
    }

    createSmartContract(): Contract {
      const provider = ethers.getDefaultProvider(this.networkName);
      const wallet = new ethers.Wallet(this.privateKey, provider);
      return new ethers.Contract(this.contractAddress, this.contractAbi, wallet);
    }
}

export default EthSmartConfig;
