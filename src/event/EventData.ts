import { BigNumber } from 'ethers/utils';

abstract class EventData {
  // uniquely identifies an event
  // received from Etherless-smart and used to send the processing result back
    public readonly id: BigNumber;

    constructor(id: BigNumber) {
      this.id = id;
    }
}

export default EventData;
