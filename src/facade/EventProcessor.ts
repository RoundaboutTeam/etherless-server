import IEventProcessor from './IEventProcessor';
import EthSmartManager from '../smart/EthSmartManager';
import AwsManager from '../aws/AwsManager';
import IpfsManager from '../ipfs/IpfsManager';
import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';

class EventProcessor implements IEventProcessor {
    private smartManager: EthSmartManager;

    private awsManager: AwsManager;

    private ipfsManager: IpfsManager;

    constructor(smartManager: EthSmartManager, awsManager: AwsManager, ipfsManager: IpfsManager) {
      this.smartManager = smartManager;
      this.awsManager = awsManager;
      this.ipfsManager = ipfsManager;

      this.smartManager.onRun((data:RunEventData) => {
        this.processRunEvent(data);
      });

      this.smartManager.onDeploy((data:DeployEventData) => {
        this.processDeployEvent(data);
      });
    }

    // orchestrates the processing of run events
    // attached to the SmartManager's run dispatcher
    async processRunEvent(data: RunEventData) {
      try {
        const result = await this.awsManager.invokeLambda(data.functionName, data.parameters);
        this.smartManager.sendRunResult(result, data.id, true);
      } catch (err) {
        this.smartManager.sendRunResult(err.message, data.id, false);
      }
    }

    // orchestrates the processing of deploy events
    // attached to the SmartManager's deploy dispatcher
    async processDeployEvent(data: DeployEventData) {
      try {
        const fileBuffer = await this.ipfsManager.getFileContent(data.ipfsPath);
        const result = await this.awsManager.deployFunction(data.functionName, data.parametersCount, fileBuffer);
        this.smartManager.sendDeployResult(result, data.functionName, data.id, true);
      } catch (err) {
        this.smartManager.sendDeployResult(err.message, data.functionName, data.id, false);
      }
    }
}

export default EventProcessor;
