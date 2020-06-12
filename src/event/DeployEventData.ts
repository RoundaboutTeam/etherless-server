import { BigNumber } from 'ethers/utils';
import EventData from './EventData';

class DeployEventData extends EventData {
    public readonly functionName: string;

    public readonly parametersCount: number;

    public readonly ipfsPath: string;

    constructor(functionName: string, parametersCount: number, ipfsPath: string, id: BigNumber) {
      super(id);
      this.functionName = functionName;
      this.parametersCount = parametersCount;
      this.ipfsPath = ipfsPath;
    }
}

export default DeployEventData;
