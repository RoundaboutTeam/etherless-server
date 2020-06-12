import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';

export default interface IEventProcessor {
  // orchestrates the processing of run events
  processRunEvent(data: RunEventData): void;
  processDeployEvent(data: DeployEventData): void;
};
