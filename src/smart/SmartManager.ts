import { BigNumber } from 'ethers/utils';
import SmartConfig from '../config/SmartConfig';
import EventDispatcher from '../event/EventDispatcher';
import RunEventData from '../event/RunEventData';

const ethers = require('ethers');

class SmartManager {
    private contract: any;

    public readonly runEventDispatcher: EventDispatcher;

    constructor(config: SmartConfig) {
      const provider = ethers.getDefaultProvider(config.networkName);
      const wallet = new ethers.Wallet(config.privateKey, provider);
      this.contract = new ethers.Contract(config.contractAddress, config.contractAbi, wallet);

      this.runEventDispatcher = new EventDispatcher();

      this.contract.on('runRequest', (functionName: string, parameters: string, id: BigNumber) => {
        this.runEventDispatcher.dispatch(new RunEventData(functionName, parameters.split(','), id));
      });
    }

    async sendResponse(response: string, id: BigNumber) {
      try {
        await this.contract.resultFunction(response, id);
      } catch (err) {
        console.log(err);
      }
    }

    async sendError(response: string, id: any) {
      try {
        await this.contract.resultFunction(response, id);
      } catch (err) {
        console.log(err);
      }
    }

    // temporary
    getContract(): any {
      return this.contract;
    }
}

export default SmartManager;
