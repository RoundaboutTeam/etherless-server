import IEventProcessor from './IEventProcessor';
import EthSmartManager from '../smart/EthSmartManager';
import AwsManager from '../aws/AwsManager';
import RunEventData from '../event/RunEventData';

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

    async processRunEvent(data: RunEventData) {
      try {
        const result = await this.awsManager.invokeLambda(data.functionName, data.parameters);
        this.smartManager.sendRunResult(result, data.id, true);
      } catch (err) {
        this.smartManager.sendRunResult(err.message, data.id, false);
      }
    }
}

export default EventProcessor;
