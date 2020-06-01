import SmartManager from '../smart/SmartManager';
import RunEventData from '../event/RunEventData';
import AwsManager from '../aws/AwsManager';

class Controller {
    private smartManager: SmartManager;

    private awsManager: AwsManager;

    constructor(smartManager: SmartManager, awsManager: AwsManager) {
      this.smartManager = smartManager;
      this.awsManager = awsManager;

      this.smartManager.runEventDispatcher.attach((data:RunEventData) => { this.processRunEvent(data); });
    }

    async processRunEvent(data: RunEventData) {
      try {
        const result = await this.awsManager.invokeLambda(data.functionName, data.parameters);
        this.smartManager.sendResponse(result, data.id);
      } catch (err) {
        this.smartManager.sendError('Generic error', data.id);
        console.log(err.message);
      }
    }
}

export default Controller;
