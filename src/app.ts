import EventProcessor from './facade/EventProcessor';
import EthSmartManager from './smart/EthSmartManager';
import AwsManager from './aws/AwsManager';
import ConfigUtilities from './config/ConfigUtilities';
import CliSimulator from '../CliSimulator';

const contract = ConfigUtilities.getEthSmartConfig().createSmartContract();
const smartManager: EthSmartManager = new EthSmartManager(contract);

const lambda = ConfigUtilities.getAwsConfig().createLambda();
const awsManager: AwsManager = new AwsManager(lambda);
const eventProcessor: EventProcessor = new EventProcessor(smartManager, awsManager);

// import { BigNumber } from 'ethers/utils';
// import RunEventData from './event/RunEventData';
// eventProcessor.processRunEvent(new RunEventData('mull', ['2', '3'], new BigNumber(300)));

// const cli: CliSimulator = new CliSimulator(contract);
// cli.runFunction('mul', '5, -5');
