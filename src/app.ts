import SmartManager from './src/smart/SmartManager';
import Controller from './src/facade/Controller';
import AwsManager from './src/aws/AwsManager';
import ConfigUtilities from './src/config/ConfigUtilities';
import CliSimulator from './CliSimulator';

const smartManager: SmartManager = new SmartManager(ConfigUtilities.getSmartConfig());
const awsManager: AwsManager = new AwsManager(ConfigUtilities.getAwsConfig());
const controller: Controller = new Controller(smartManager, awsManager);

// const cli: CliSimulator = new CliSimulator(smartManager.getContract());
// cli.runFunction('mul', '5, -5');
