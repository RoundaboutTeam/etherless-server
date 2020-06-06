import EventProcessor from './facade/EventProcessor';
import EthSmartManager from './smart/EthSmartManager';
import AwsManager from './aws/AwsManager';
import ConfigUtilities from './config/ConfigUtilities';
import CliSimulator from '../CliSimulator';

import RunEventData from './event/RunEventData';
import { BigNumber } from 'ethers/utils';

const smartManager: EthSmartManager = new EthSmartManager(ConfigUtilities.getEthSmartConfig());
smartManager.listen();
const awsManager: AwsManager = new AwsManager(ConfigUtilities.getAwsConfig());
const eventProcessor: EventProcessor = new EventProcessor(smartManager, awsManager);

// eventProcessor.processRunEvent(new RunEventData('mull', ['2', '3'], new BigNumber(300)));

// const cli: CliSimulator = new CliSimulator(smartManager.getContract());
// cli.runFunction('mul', '5, -5');
