import { BigNumber } from 'ethers/utils';
import EventData from './EventData';

class DeployEventData extends EventData {
    public readonly functionName: string;

    public readonly ipfsPath: string;

    constructor(functionName: string, ipfsPath: string, id: BigNumber) {
      super(id);
      this.functionName = functionName;
      this.ipfsPath = ipfsPath;
    }
}

export default DeployEventData;
