import { Contract } from 'ethers';

const ethers = require('ethers');

/**
  * @desc class containing the configurations used to communicate with an Ethereum smart contract,
  * allowing the creation of instances of said contract using the ethers.js library.
  * @attr networkName - string containing the name of the Ethereum network to be used for the
  * communication.
  * @attr privateKey - string containing the private key used to access the Ethereum smart contract.
  * @attr contractAddress - string containing the address of the Ethereum smart contract.
  * @attr contractAbi - string containing the abi of the Ethereum smart contract.
  * @uses ethers
*/
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

    /**
    * @desc returns an instance of an Ethereum smart contract created with the
    * configurations contained in the ETHSmartConfig.
    * @method createSmartContract
    * @return ethers.Contract - instance of an Ethereum smart contract.
    */
    createSmartContract(): Contract {
      const provider = ethers.getDefaultProvider(this.networkName);
      const wallet = new ethers.Wallet(this.privateKey, provider);
      return new ethers.Contract(this.contractAddress, this.contractAbi, wallet);
    }
}

export default EthSmartConfig;
