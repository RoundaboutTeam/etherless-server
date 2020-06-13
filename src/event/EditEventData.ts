import { BigNumber } from 'ethers/utils';
import EventData from './EventData';

/**
  * @desc class used to encapsulate the content of external blockchain
  * edit events into processing requests.
  * @attr functionName - string identifying the name of the function to be edited.
  * @attr parameters - array identifying the parameters of the function to be edited.
  * @uses ethers
  * @uses EventData
*/
class EditEventData extends EventData {
    public readonly functionName: string;

    public readonly parameters: Array<any>;

    constructor(functionName: string, parameters: Array<any>, id: BigNumber) {
      super(id);
      this.functionName = functionName;
      this.parameters = parameters;
    }
}

export default EditEventData;
