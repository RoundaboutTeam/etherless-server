import RunEventData from '../event/RunEventData';

export default interface IEventProcessor {
  processRunEvent(data: RunEventData): void;
};
