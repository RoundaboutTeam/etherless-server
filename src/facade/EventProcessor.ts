import IEventProcessor from './IEventProcessor';
import SmartManager from '../smart/SmartManager';
import AwsManager from '../aws/AwsManager';
import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';
import EditEventData from '../event/EditEventData';
import DeleteEventData from '../event/DeleteEventData';

class EventProcessor implements IEventProcessor {
    private smartManager: SmartManager;

    private awsManager: AwsManager;

    constructor(smartManager: SmartManager, awsManager: AwsManager) {
      this.smartManager = smartManager;
      this.awsManager = awsManager;

      this.smartManager.runEventDispatcher.attach((data:RunEventData) => {
        this.processRunEvent(data);
      });
    }

    async processRunEvent(data: RunEventData) {
      try {
        const result = await this.awsManager.invokeLambda(data.functionName, data.parameters);
        this.smartManager.sendResponse(result, data.id);
      } catch (err) {
        this.smartManager.sendError('Generic error', data.id);
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
