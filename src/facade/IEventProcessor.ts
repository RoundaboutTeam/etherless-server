import EventData from '../event/EventData';

export default interface IEventProcessor {
  processRunEvent(data: EventData): void;
  processDeployEvent(data: EventData): void;
  processEditEvent(data: EventData): void;
  processDeleteEvent(data: EventData): void;
};
