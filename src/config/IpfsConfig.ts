const IPFS = require('ipfs-mini');

class IpfsConfig {
    public readonly host: string;

    public readonly port: number;

    public readonly protocol: string;

    constructor(host: string, port: number, protocol: string) {
      this.host = host;
      this.port = port;
      this.protocol = protocol;
    }

    createIpfsObject(): any {
      return new IPFS({ host: this.host, port: this.port, protocol: this.protocol });
    }
}

export default IpfsConfig;
