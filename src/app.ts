import EventProcessor from './facade/EventProcessor';
import EthereumSmartManager from './smart/EthereumSmartManager';
import AwsManager from './aws/AwsManager';
import ConfigUtilities from './config/ConfigUtilities';
import CliSimulator from '../CliSimulator';

const smartManager: EthereumSmartManager = new EthereumSmartManager(ConfigUtilities.getEthSmartConfig());
const awsManager: AwsManager = new AwsManager(ConfigUtilities.getAwsConfig());
const eventProcessor: EventProcessor = new EventProcessor(smartManager, awsManager);

const cli: CliSimulator = new CliSimulator(smartManager.getContract());
cli.runFunction('mul', '5, -5');