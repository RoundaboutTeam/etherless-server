import RunEventData from '../event/RunEventData';

export default interface IEventProcessor {
  // orchestrates the processing of run events
  processRunEvent(data: RunEventData): void;
};
