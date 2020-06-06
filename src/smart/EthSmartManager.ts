import { BigNumber } from 'ethers/utils';
import EthSmartConfig from '../config/EthSmartConfig';
import RunEventData from '../event/RunEventData';
import SmartManager from './SmartManager';

const ethers = require('ethers');

class EthereumSmartManager extends SmartManager {
    private contract: any;

    constructor(config: EthSmartConfig) {
      super();
      const provider = ethers.getDefaultProvider(config.networkName);
      const wallet = new ethers.Wallet(config.privateKey, provider);
      this.contract = new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
    }

    listen(): void {
      this.contract.on('runRequest', (functionName: string, parameters: string, id: BigNumber) => {
        this.dispatchRunEvent(new RunEventData(functionName, parameters.split(','), id));
      });
    }

    sendResponse(response: string, id: BigNumber) {
      try {
        this.contract.resultFunction(response, id);
      } catch (err) {
        console.log(err);
      }
    }

    sendError(response: string, id: BigNumber) {
      try {
        this.contract.resultFunction(response, id);
      } catch (err) {
        console.log(err);
      }
    }

    // temporary
    getContract(): any {
      return this.contract;
    }
}

export default EthereumSmartManager;
