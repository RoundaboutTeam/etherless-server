import fs from 'fs';
import path from 'path';
import EthSmartConfig from './EthSmartConfig';
import AwsConfig from './AwsConfig';
import IpfsConfig from './IpfsConfig';

/**
  * @desc class used to fetch configuration files and to create configuration objects used by
  * services that operate inside the system.
  * @attr smartConfigPath - string containing the path to the Ethereum configuration file.
  * @attr abiPath - string containing the path to the abi of the smart contract used for Ethereum
  * communications.
  * @attr awsConfigPath - string containing the path to the AWS configuration file.
  * @attr ipfsConfigPath - string containing the path to the IPFS configuration file.
  * @uses fs
  * @uses path
  * @uses EthSmartConfig
  * @uses AwsConfig
  * @uses IpfsConfig
*/
class ConfigUtilities {
  private static smartConfigPath: string = path.resolve(__dirname, '..', '..', 'configs', 'smartConfig.json');

  private static abiPath: string = path.resolve(__dirname, '..', '..', 'configs', 'abi.json');

  private static awsConfigPath: string = path.resolve(__dirname, '..', '..', 'configs', 'awsConfig.json');

  private static ipfsConfigPath: string = path.resolve(__dirname, '..', '..', 'configs', 'ipfsConfig.json');

  /**
    * @static
    * @desc returns an ETHSmartConfig object, created using the Ethereum configurations;
    * @method getEthSmartConfig
    * @return EthSmartConfig
  */
  public static getEthSmartConfig() {
    const config = JSON.parse(fs.readFileSync(this.smartConfigPath, 'UTF-8'));
    const abi = JSON.parse(fs.readFileSync(this.abiPath, 'UTF-8'));
    return new EthSmartConfig(config.networkName, config.privateKey, config.contractAddress, abi);
  }

  /**
    * @static
    * @desc returns an AWSConfig object, created using the AWS configurations;
    * @method getAWSConfig
    * @return AWSConfig
  */
  public static getAwsConfig() {
    const config = JSON.parse(fs.readFileSync(this.awsConfigPath, 'UTF-8'));
    return new AwsConfig(config.awsKey, config.awsSecretKey, config.awsRegion);
  }

  /**
    * @static
    * @desc returns an IPFSConfig object, created using the IPFS configurations;
    * @method getIPFSConfig
    * @return IPFSConfig
  */
  public static getIpfsConfig() {
    const config = JSON.parse(fs.readFileSync(this.ipfsConfigPath, 'UTF-8'));
    return new IpfsConfig(config.host, config.port, config.protocol);
  }
}

export default ConfigUtilities;
