import { Contract } from 'ethers';
import { BigNumber } from 'ethers/utils';
import RunEventData from '../event/RunEventData';
import SmartManager from './SmartManager';

class EthereumSmartManager extends SmartManager {
    private contract: Contract;

    constructor(contract: Contract) {
      super();
      this.contract = contract;
      this.contract.on('runRequest', (functionName: string, parameters: string, id: BigNumber) => {
        this.dispatchRunEvent(new RunEventData(functionName, parameters.split(','), id));
      });
    }

    // sends the run result to Etherless-Smart or retires other n times if an exception is caught
    sendRunResult(message: string, id: BigNumber, success: boolean) {
      try {
        this.contract.runResult(message, id, success);
      } catch (err) {
        // retry sending message again here
      }
    }
}

export default EthereumSmartManager;
