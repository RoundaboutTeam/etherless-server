import { BigNumber } from 'ethers/utils';
import EventData from './EventData';

/**
  * @desc class used to encapsulate the content of external blockchain
  * delete events into processing requests.
  * @attr functionName - string identifying the name of the function to be deleted.
  * @attr parameters - array identifying the parameters given to the function to be deleted.
  * @uses ethers
  * @uses EventData
*/
class DeleteEventData extends EventData {
    public readonly functionName: string;

    constructor(functionName: string, id: BigNumber) {
      super(id);
      this.functionName = functionName;
    }
}

export default DeleteEventData;
