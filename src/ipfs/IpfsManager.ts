const IPFS = require('ipfs-mini');

class IpfsManager {
  private ipfs : any;

  constructor() {
    this.ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  }

  public async getFileContent(ipfsPath : string) : Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.ipfs.cat(ipfsPath)
        .then((result : string) => resolve(Buffer.from(result, 'hex')))
        .catch((error : Error) => {
          reject(new Error(`There was an error fetching the file from the given path: ${error}`));
        });
    });
  }
}

export default IpfsManager;