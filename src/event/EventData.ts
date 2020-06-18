import { BigNumber } from 'ethers/utils';

/**
  * @desc an integer number provided by Etherless-smart and used to uniquely identify
  * a processing request.
  * @uses ethers
*/
abstract class EventData {
    public readonly id: BigNumber;

    constructor(id: BigNumber) {
      this.id = id;
    }
}

export default EventData;
