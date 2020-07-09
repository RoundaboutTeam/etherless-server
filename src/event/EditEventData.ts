import { BigNumber } from 'ethers/utils';
import EventData from './EventData';

/**
  * @desc class used to encapsulate the content of external blockchain
  * edit events into processing requests.
  * @attr functionName - string identifying the name of the function to be edited.
  * @attr signature - function parameters signature.
  * @attr parametersCount - the number of parameters required by the function to be edited
  * @attr ipfsPath - string identifying the IPFS location of the file to be used for the edit
  * @uses ethers
  * @uses EventData
*/
class EditEventData extends EventData {
    public readonly functionName: string;

    public readonly signature: string;

    public readonly parametersCount: number;

    public readonly ipfsPath: string;

    constructor(functionName: string, signature: string, parametersCount: number, ipfsPath: string, id: BigNumber) {
      super(id);
      this.functionName = functionName;
      this.signature = signature;
      this.parametersCount = parametersCount;
      this.ipfsPath = ipfsPath;
    }
}

export default EditEventData;
