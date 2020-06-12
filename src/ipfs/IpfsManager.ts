const IPFS = require('ipfs-mini');

class IpfsManager {
  private ipfs : any;

  constructor(ipfsObject: any) {
    this.ipfs = ipfsObject;
  }

  public async getFileContent(ipfsPath : string) : Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.ipfs.cat(ipfsPath)
        .then((result: string) => resolve(Buffer.from(result, 'hex')))
        .catch((error: Error) => {
          reject(new Error(`There was an error fetching the file from the given path: ${error}`));
        });
    });
  }

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
