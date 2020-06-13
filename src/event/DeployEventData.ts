import { BigNumber } from 'ethers/utils';
import EventData from './EventData';

/**
  * @desc class used to encapsulate the content of external blockchain
  * deploy events into processing requests.
  * @attr functionName - string identifying the name of the function to be deployed.
  * @attr parametersCount - array identifying the number of parameters required
  * by the function to be deployed.
  * @attr ipfsPath - string identifying the IPFS location of the file to be used for the deployment.
  * @uses ethers
  * @uses EventData
*/
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
