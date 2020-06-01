import { BigNumber } from 'ethers/utils';

abstract class EventData {
    public readonly id: BigNumber;

    constructor(id: BigNumber) {
      this.id = id;
    }
}

export default EventData;
