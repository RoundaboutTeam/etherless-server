const IPFS = require('ipfs-mini');

/**
  * @desc class used to communicate with the IPFS service,
  * specifically to retrieve functions' data in string format.
  * To establish a connection with the IPFS network we use ipfs-mini API
  * @attr connection - object through which the class can interact with the ipfs-mini API.
  * @uses ipfs-mini
*/
class IpfsManager {
  private ipfs : any;

  constructor(ipfsObject: any) {
    this.ipfs = ipfsObject;
  }

  /**
    * @async
    * @desc used to retrieve functions' data in string format from IPFS.
    * @method getFileContent
    * @param ipfsPath ipfs path of the file to be retrived.
    * @return Promise<Buffer> - function data in string format.
  */
  public async getFileContent(ipfsPath : string) : Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.ipfs.cat(ipfsPath)
        .then((result: string) => resolve(Buffer.from(result, 'hex')))
        .catch((error: Error) => {
          reject(new Error(`There was an error fetching the file from the given path: ${error}`));
        });
    });
  }

  /**
    * @async
    * @desc used to save data in string format to IPFS.
    * @method saveOnIpfs
    * @param buffer data to be saved on Ipfs.
    * @return Promise<string> - saving success or error message.
  */
  public async saveOnIpfs(buffer: Buffer) : Promise<string> {
    return new Promise((resolve, reject) => {
      this.ipfs.add(buffer.toString('hex'))
        .then(resolve)
        .catch((error: Error) => {
          reject(new Error(`There was an error saving the file on IPFS: ${error}`));
        });
    });
  }
}

export default IpfsManager;
