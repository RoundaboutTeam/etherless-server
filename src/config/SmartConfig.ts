class SmartConfig {
    public readonly networkName: string;

    public readonly privateKey: string;

    public readonly contractAddress: string;

    public readonly contractAbi: any;

    constructor(networkName: string, privateKey: string, contractAddress: string, abi: any) {
      this.networkName = networkName;
      this.privateKey = privateKey;
      this.contractAddress = contractAddress;
      this.contractAbi = abi;
    }
}

export default SmartConfig;
