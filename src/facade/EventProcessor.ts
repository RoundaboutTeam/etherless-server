import IEventProcessor from './IEventProcessor';
import EthSmartManager from '../smart/EthSmartManager';
import AwsManager from '../aws/AwsManager';
import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';

class EventProcessor implements IEventProcessor {
    private smartManager: EthSmartManager;

    private awsManager: AwsManager;

    constructor(smartManager: EthSmartManager, awsManager: AwsManager) {
      this.smartManager = smartManager;
      this.awsManager = awsManager;

      this.smartManager.onRun((data:RunEventData) => {
        this.processRunEvent(data);
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

    async processDeployEvent(data: DeployEventData) {
      try {

      } catch (err) {

      }
    }
}

export default EventProcessor;
