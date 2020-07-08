import { Contract } from 'ethers';
import { BigNumber } from 'ethers/utils';
import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';
import DeleteEventData from '../event/DeleteEventData';
import SmartManager from './SmartManager';
import EditEventData from '../event/EditEventData';

/**
  * @desc class derived from SmartManager, which acts as an Ethereum events listener.
  * @attr contract - instance of an Ethereum smart contract used to listen to Ethereum events and
  * communicate with the smart contract itself.
  * @uses ethers
  * @uses RunEventData
  * @uses DeployEventData
  * @uses DeleteEventData
  * @uses SmartManager
*/
class EthereumSmartManager extends SmartManager {
    private contract: Contract;

    constructor(contract: Contract) {
      super();
      this.contract = contract;
      this.contract.on('runRequest', (functionName: string, parameters: string, sender: string, id: BigNumber) => {
        this.dispatchRunEvent(new RunEventData(functionName, parameters.split(','), id));
      });

      this.contract.on('deployRequest', (functionName: string, parametersSignature: string, ipfsPath: string, dep: boolean, id: BigNumber) => {
        const paramsCount = EthereumSmartManager.getParametersCount(parametersSignature);
        this.dispatchDeployEvent(new DeployEventData(functionName, paramsCount, ipfsPath, dep, id));
      });

      this.contract.on('deleteRequest', (functionName: string, id: BigNumber) => {
        this.dispatchDeleteEvent(new DeleteEventData(functionName, id));
      });

      this.contract.on('editRequest', (functionName: string, parametersSignature: string, ipfsPath: string, dep: boolean, id: BigNumber) => {
        const paramsCount = EthereumSmartManager.getParametersCount(parametersSignature);
        this.dispatchEditEvent(new EditEventData(functionName, parametersSignature, paramsCount, ipfsPath, dep, id));
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
        this.contract.runResult(`{ "message": "${response}" }`, id, success);
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
        this.contract.deployResult(`{ "message": "${response}" }`, functionName, id, success);
      } catch (err) {
        // retry sending message again here
      }
    }

    /**
      * @desc sends the result of a previously received delete request back to Etherless-smart.
      * The response contains a message and useful request related information.
      * @method sendDeleteResult
      * @param response response message.
      * @param functionName name of the deployed function.
      * @param id request id.
      * @param success 'true' if the request was successful, 'false' otherwise.
      * @return void
    */
    sendDeleteResult(response: string, functionName: string, id: BigNumber, success: boolean): void {
      try {
        this.contract.deleteResult(`{ "message": "${response}" }`, functionName, id, success);
      } catch (err) {
        // retry sending message again here
      }
    }

    /**
      * @desc sends the result of a previously received edit request back to Etherless-smart.
      * The response contains a message and useful request related information.
      * @method sendEditResult
      * @param response response message.
      * @param signature function parameters signature.
      * @param functionName name of the edited function.
      * @param id request id.
      * @param success 'true' if the request was successful, 'false' otherwise.
      * @return void
    */
    sendEditResult(response: string, functionName: string, signature: string, id: BigNumber, success: boolean): void {
      try {
        this.contract.editResult(`{ "message": "${response}" }`, signature, functionName, id, success);
      } catch (err) {
        // retry sending message again here
      }
    }

    /**
      * @desc calculates the number of parameters in a given parameters signature.
      * used by deploy and edit funcitonalities.
      * @method getParametersCount
      * @param parametersSignature - string representing the parameters signature.
      * @return number - the number of parameters in the parameters signature string.
    */
    static getParametersCount(parametersSignature: string): number {
      const noParenthesis = parametersSignature.slice(1, parametersSignature.length - 1).trim();
      let paramsCount = 0;
      if (noParenthesis !== '') {
        paramsCount = parametersSignature.split(',').length;
      }
      return paramsCount;
    }
}

export default EthereumSmartManager;
