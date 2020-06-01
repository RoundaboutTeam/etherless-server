import fs from 'fs';
import path from 'path';
import SmartConfig from './SmartConfig';
import AwsConfig from './AwsConfig';

abstract class ConfigUtilities {
  private static smartConfigPath: string = path.resolve(__dirname, '..', '..', 'configs', 'smartConfig.json');

  private static abiPath: string = path.resolve(__dirname, '..', '..', 'configs', 'abi.json');

  private static awsConfigPath: string = path.resolve(__dirname, '..', '..', 'configs', 'awsConfig.json');

  public static getSmartConfig() {
    const config = JSON.parse(fs.readFileSync(this.smartConfigPath, 'UTF-8'));
    const abi = JSON.parse(fs.readFileSync(this.abiPath, 'UTF-8'));
    return new SmartConfig(config.networkName, config.privateKey, config.contractAddress, abi);
  }

  public static getAwsConfig() {
    const config = JSON.parse(fs.readFileSync(this.awsConfigPath, 'UTF-8'));
    return new AwsConfig(config.awsKey, config.awsSecretKey, config.awsRegion);
  }
}

export default ConfigUtilities;
