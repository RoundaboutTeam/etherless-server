import { Contract } from 'ethers';
import { BigNumber } from 'ethers/utils';
import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';
import SmartManager from './SmartManager';

/**
  * @desc class derived from SmartManager, which acts as an Ethereum events listener.
  * @attr contract - instance of an Ethereum smart contract used to listen to Ethereum events and
  * communicate with the smart contract itself.
  * @uses ethers
  * @uses RunEventData
  * @uses DeployEventData
  * @uses SmartManager
*/
class EthereumSmartManager extends SmartManager {
    private contract: Contract;

    constructor(contract: Contract) {
      super();
      this.contract = contract;
      this.contract.on('runRequest', (functionName: string, parameters: string, id: BigNumber) => {
        this.dispatchRunEvent(new RunEventData(functionName, parameters.split(','), id));
      });

      // (p1, p2)
      this.contract.on('deployRequest', (functionName: string, parametersSignature: string, ipfsPath: string, id: BigNumber) => {
        const noParenthesis = parametersSignature.slice(1, parametersSignature.length - 1).trim();
        let paramsCount = 0;
        if (noParenthesis !== '') {
          paramsCount = parametersSignature.split(',').length;
        }
        this.dispatchDeployEvent(new DeployEventData(functionName, paramsCount, ipfsPath, id));
      });
    }

    /**
      * @desc sends the result of a previously received run request back to Etherless-smart.
      * The response contains a message and useful request related information.
      * @method sendRunResult
      * @param response response message.
      * @param id request id.
      * @param success 'true' if the request was successful, 'false' otherwise.
      * @return void
    */
    sendRunResult(response: string, id: BigNumber, success: boolean): void {
      try {
        this.contract.runResult(JSON.stringify({ message: response }), id, success);
      } catch (err) {
        // retry sending message again here
      }
    }

    /**
      * @desc sends the result of a previously received deploy request back to Etherless-smart.
      * The response contains a message and useful request related information.
      * @method sendDeployResult
      * @param response response message.
      * @param functionName name of the deployed function.
      * @param id request id.
      * @param success 'true' if the request was successful, 'false' otherwise.
      * @return void
    */
    sendDeployResult(response: string, functionName: string, id: BigNumber, success: boolean): void {
      try {
        this.contract.deployResult(JSON.stringify({ message: response }), functionName, id, success);
      } catch (err) {
        // retry sending message again here
      }
    }
}

export default EthereumSmartManager;
