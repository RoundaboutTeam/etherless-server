import EventProcessor from './facade/EventProcessor';
import EthSmartManager from './smart/EthSmartManager';
import AwsManager from './aws/AwsManager';
import ConfigUtilities from './config/ConfigUtilities';
import CliSimulator from '../CliSimulator';
import IpfsManager from './ipfs/IpfsManager';
import RunEventData from './event/RunEventData';
import { BigNumber } from 'ethers/utils';

// contract interface object used to listen events and send responses to Etherless-smart
const contract = ConfigUtilities.getEthSmartConfig().createSmartContract();

// provides all the functionalities needed for the communication with Etherless-smart
const smartManager: EthSmartManager = new EthSmartManager(contract);

// lambda interface object used to interact with AWS Lambda
const lambda = ConfigUtilities.getAwsConfig().createLambda();

// provides all the functionalities needed for the communication with AWS Lambda
const awsManager: AwsManager = new AwsManager(lambda);

// ipfs interface object used to interact with IPFS
const ipfs = ConfigUtilities.getIpfsConfig().createIpfsObject();

// provides all the functionalities needed for files fetching from IPFS
const ipfsManager: IpfsManager = new IpfsManager(ipfs);

// subscribes to the smartManager in order to receive and process the incoming events
// and sends the results back to Etherless-smart
const eventProcessor: EventProcessor = new EventProcessor(smartManager, awsManager, ipfsManager);

// const cli = new CliSimulator(contract, ipfsManager);
// cli.runFunction('cecho', 'echo this phrase!');
// cli.deployFunction('./testF.js', 'cecho', '(word)', 'echoes whatever you say!');
