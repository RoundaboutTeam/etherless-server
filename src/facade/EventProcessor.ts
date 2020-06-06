import IEventProcessor from './IEventProcessor';
import EthSmartManager from '../smart/EthSmartManager';
import AwsManager from '../aws/AwsManager';
import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';
import EditEventData from '../event/EditEventData';
import DeleteEventData from '../event/DeleteEventData';

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
        this.smartManager.sendResponse(result, data.id);
      } catch (err) {
        this.smartManager.sendError(err.message, data.id);
      }
    }

    async processDeployEvent(data: DeployEventData) {
    }

    async processEditEvent(data: EditEventData) {
    }

    async processDeleteEvent(data: DeleteEventData) {
    }
}

export default EventProcessor;
