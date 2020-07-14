const IPFS = require('ipfs-mini');

/**
  * @desc class containing the configurations used to communicate with IPFS,
  * allowing the creation of instances of the service using the ipfs-mini library.
  * @attr host - host used to interact with the ipfs-mini API.
  * @attr port - port used to interact with the ipfs-mini API.
  * @attr protocol - protocol used to interact with the ipfs-mini API.
  * @uses ipfs-mini
*/
class IpfsConfig {
    private host: string;

    private port: number;

    private protocol: string;

    constructor(host: string, port: number, protocol: string) {
      this.host = host;
      this.port = port;
      this.protocol = protocol;
    }

    /**
    * @desc returns an instance of an Ethereum smart contract created with the
    * configurations contained in the ETHSmartConfig.
    * @method createIpfsObject
    * @return any - instance of an IPFS connection.
    */
    createIpfsObject(): any {
      return new IPFS({ host: this.host, port: this.port, protocol: this.protocol });
    }
}

export default IpfsConfig;
