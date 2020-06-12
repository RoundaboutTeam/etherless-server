const IpfsClient = require('ipfs-http-client');

class IpfsManager {
    private ipfsClient;

    constructor() {
      this.ipfsClient = new IpfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    }

    public async getFileContent(ipfsPath: string): Promise<string> {
      const chunks = [];
      for await (const chunk of this.ipfs.cat(ipfsPath)) {
        chunks.push(chunk)
      }
      return Buffer.concat(chunks).toString();
    }
}

export default IpfsManager;
