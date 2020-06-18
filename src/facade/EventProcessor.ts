import IEventProcessor from './IEventProcessor';
import EthSmartManager from '../smart/EthSmartManager';
import AwsManager from '../aws/AwsManager';
import IpfsManager from '../ipfs/IpfsManager';
import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';
import DeleteEventData from '../event/DeleteEventData';

/**
  * @desc class used to orchestrate the steps of the requests processing.
  * @attr smart - SmartManager class object from which EventProcessor receives the requests,
  * also used to send responses back to Etherless-smart.
  * @attr aws - AWSManager class object used for processing requests.
  * @attr ipfs - IpfsManager class object used for processing requests.
  * @uses IEventProcessor
  * @uses EthSmartManager
  * @uses AwsManager
  * @uses IpfsManager
  * @uses RunEventData
  * @uses DeployEventData
  * @uses DeleteEventData
*/
class EventProcessor implements IEventProcessor {
    private smartManager: EthSmartManager;

    private awsManager: AwsManager;

    private ipfsManager: IpfsManager;

    constructor(smartManager: EthSmartManager, awsManager: AwsManager, ipfsManager: IpfsManager) {
      this.smartManager = smartManager;
      this.awsManager = awsManager;
      this.ipfsManager = ipfsManager;
      // The method processRunEvent is set to be executed upon listening to a RunEvent.
      this.smartManager.onRun((data:RunEventData) => {
        this.processRunEvent(data);
      });
      // The method processDeployEvent is set to be executed upon listening to a DeployEvent.
      this.smartManager.onDeploy((data:DeployEventData) => {
        this.processDeployEvent(data);
      });
      // The method processDeleteEvent is set to be executed upon listening to a DeleteEvent.
      this.smartManager.onDelete((data:DeleteEventData) => {
        this.processDeleteEvent(data);
      });
    }

    /**
    * @async
    * @desc processes the given RunEventData object by calling the AWSManager class.
    * @method processRunEvent
    * @param data RunEventData class object, content of the request to be processed.
    * @return Promise<string> - run result or error message.
    */
    async processRunEvent(data: RunEventData) {
      try {
        const result = await this.awsManager.invokeLambda(data.functionName, data.parameters);
        this.smartManager.sendRunResult(result, data.id, true);
      } catch (err) {
        this.smartManager.sendRunResult(err.message, data.id, false);
      }
    }

    /**
    * @async
    * @desc processes the given DeployEventData object by calling the AWSManager class.
    * @method processDeployEvent
    * @param data DeployEventData class object, content of the request to be processed.
    * @return Promise<string> - deployment success or error message.
    */
    async processDeployEvent(data: DeployEventData) {
      try {
        const fileBuffer = await this.ipfsManager.getFileContent(data.ipfsPath);
        const result = await this.awsManager.deployFunction(data.functionName, data.parametersCount, fileBuffer);
        this.smartManager.sendDeployResult(result, data.functionName, data.id, true);
      } catch (err) {
        this.smartManager.sendDeployResult(err.message, data.functionName, data.id, false);
      }
    }

    /**
    * @async
    * @desc processes the given DeleteEventData object by calling the AWSManager class.
    * @method processDeleteEvent
    * @param data DeleteEventData class object, content of the request to be processed.
    * @return Promise<string> - delete result or error message.
    */
    async processDeleteEvent(data: DeleteEventData) {
      try {
        const result = await this.awsManager.deleteLambda(data.functionName);
        this.smartManager.sendDeleteResult(result, data.functionName, data.id, true);
      } catch (err) {
        this.smartManager.sendDeleteResult(err.message, data.functionName, data.id, false);
      }
    }
}

export default EventProcessor;
