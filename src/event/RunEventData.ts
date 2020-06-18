import { BigNumber } from 'ethers/utils';
import EventData from './EventData';

/**
  * @desc class used to encapsulate the content of external blockchain
  * run events into processing requests.
  * @attr functionName - string identifying the name of the function to be run.
  * @attr parameters - array identifying the parameters of the function to be run.
  * @uses ethers
  * @uses EventData
*/
class RunEventData extends EventData {
    public readonly functionName: string;

    public readonly parameters: Array<any>;

    constructor(functionName: string, parameters: Array<any>, id: BigNumber) {
      super(id);
      this.functionName = functionName;
      this.parameters = parameters;
    }
}

export default RunEventData;
