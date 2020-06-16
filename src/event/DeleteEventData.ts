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

    public readonly parameters: Array<any>;

    constructor(functionName: string, parameters: Array<any>, id: BigNumber) {
      super(id);
      this.functionName = functionName;
      this.parameters = parameters;
    }
}

export default DeleteEventData;
