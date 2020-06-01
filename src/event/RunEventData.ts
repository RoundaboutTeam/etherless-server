import { BigNumber } from 'ethers/utils';
import EventData from './EventData';

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
