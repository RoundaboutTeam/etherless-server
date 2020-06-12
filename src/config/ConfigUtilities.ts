import fs from 'fs';
import path from 'path';
import EthSmartConfig from './EthSmartConfig';
import AwsConfig from './AwsConfig';
import IpfsConfig from './IpfsConfig';

// provides configuration objects created based on the content of the configuration files
class ConfigUtilities {
  private static smartConfigPath: string = path.resolve(__dirname, '..', '..', 'configs', 'smartConfig.json');

  private static abiPath: string = path.resolve(__dirname, '..', '..', 'configs', 'abi.json');

  private static awsConfigPath: string = path.resolve(__dirname, '..', '..', 'configs', 'awsConfig.json');

  private static ipfsConfigPath: string = path.resolve(__dirname, '..', '..', 'configs', 'ipfsConfig.json');

  public static getEthSmartConfig() {
    const config = JSON.parse(fs.readFileSync(this.smartConfigPath, 'UTF-8'));
    const abi = JSON.parse(fs.readFileSync(this.abiPath, 'UTF-8'));
    return new EthSmartConfig(config.networkName, config.privateKey, config.contractAddress, abi);
  }

  public static getAwsConfig() {
    const config = JSON.parse(fs.readFileSync(this.awsConfigPath, 'UTF-8'));
    return new AwsConfig(config.awsKey, config.awsSecretKey, config.awsRegion);
  }

  public static getIpfsConfig() {
    const config = JSON.parse(fs.readFileSync(this.ipfsConfigPath, 'UTF-8'));
    return new IpfsConfig(config.host, config.port, config.protocol);
  }
}

export default ConfigUtilities;
