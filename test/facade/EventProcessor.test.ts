import { BigNumber } from 'ethers/utils';
import EventProcessor from '../../src/facade/EventProcessor';
import EthSmartManager from '../../src/smart/EthSmartManager';
import AwsManager from '../../src/aws/AwsManager';
import IpfsManager from '../../src/ipfs/IpfsManager';
import RunEventData from '../../src/event/RunEventData';
import DeployEventData from '../../src/event/DeployEventData';
import DeleteEventData from '../../src/event/DeleteEventData';
import EditEventData from '../../src/event/EditEventData';

const ethers = require('ethers');
const AWS = require('aws-sdk');
const IPFS = require('ipfs-mini');

// manual mocks defined in __mocks__ folder adjacent to node_modules folder
jest.mock('ethers');
jest.mock('aws-sdk');
jest.mock('ipfs-mini');

const contractMock = new ethers.Contract();
const smartManager = new EthSmartManager(contractMock);

const lambdaMock = new AWS.Lambda();
const awsManager = new AwsManager(lambdaMock);

const ipfsMock = new IPFS.Ipfs();
const ipfsManager = new IpfsManager(ipfsMock);

const processor = new EventProcessor(smartManager, awsManager, ipfsManager);

afterEach(() => {
  jest.clearAllMocks();
});

test('handles valid run result correctly', async () => {
  jest.spyOn(smartManager, 'sendRunResult');
  AWS.mockInvokePromise(lambdaMock, Promise.resolve({ Payload: JSON.stringify({ message: '15' }) }));
  try {
    await processor.processRunEvent(new RunEventData('existingFunction', ['2', '3'], new BigNumber(1)));
    expect(smartManager.sendRunResult).toBeCalledWith('15', new BigNumber(1), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes run exception correctly', async () => {
  jest.spyOn(smartManager, 'sendRunResult');
  const error = {
    FunctionError: true,
    Payload: '{"errorMessage": "Mocked Runtime Error"}',
  };
  AWS.mockInvokePromise(lambdaMock, Promise.resolve(error));
  try {
    await processor.processRunEvent(new RunEventData('existingFunctionWithBug', ['2', '3'], new BigNumber(1)));
    expect(smartManager.sendRunResult).toBeCalledWith('Mocked Runtime Error', new BigNumber(1), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes run invocation fail correctly', async () => {
  jest.spyOn(smartManager, 'sendRunResult');
  AWS.mockInvokePromise(lambdaMock, Promise.reject(new Error('Run Invocation Error')));
  try {
    await processor.processRunEvent(new RunEventData('existingFunction', ['2', '3'], new BigNumber(1)));
    expect(smartManager.sendRunResult).toBeCalledWith('Run Invocation Error', new BigNumber(1), false);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes deploy valid result correctly', async () => {
  jest.spyOn(smartManager, 'sendDeployResult');
  const resultMock = {
    Payload: '{}',
  };
  AWS.mockInvokePromise(lambdaMock, Promise.resolve(resultMock));
  IPFS.catSet(ipfsMock, Promise.resolve('Mocked buffer'));
  try {
    await processor.processDeployEvent(new DeployEventData('foo', 2, 'someIpfsPath', new BigNumber(1)));
    expect(smartManager.sendDeployResult).toBeCalledWith('foo successfully deployed', 'foo', new BigNumber(1), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes deploy exception correctly', async () => {
  jest.spyOn(smartManager, 'sendDeployResult');
  const error = {
    Payload: '{"message": "Mocked Runtime Error"}',
  };
  AWS.mockInvokePromise(lambdaMock, Promise.resolve(error));
  IPFS.catSet(ipfsMock, Promise.resolve(Buffer.from('Mocked buffer')));
  try {
    await processor.processDeployEvent(new DeployEventData('foo', 2, 'someIpfsPath', new BigNumber(1)));
    expect(smartManager.sendDeployResult).toBeCalledWith('Mocked Runtime Error', 'foo', new BigNumber(1), false);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes deploy IPFS exception correctly', async () => {
  jest.spyOn(smartManager, 'sendDeployResult');
  const resultMock = {
    Payload: '{}',
  };
  AWS.mockInvokePromise(lambdaMock, Promise.resolve(resultMock));
  IPFS.catSet(ipfsMock, Promise.reject(new Error('someIpfsPath')));
  try {
    await processor.processDeployEvent(new DeployEventData('foo', 2, 'someIpfsPath', new BigNumber(1)));
    expect(smartManager.sendDeployResult).toBeCalledWith('There was an error fetching the file from the given path: Error: someIpfsPath', 'foo', new BigNumber(1), false);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes delete valid result correctly', async () => {
  jest.spyOn(smartManager, 'sendDeleteResult');
  AWS.mockDeletePromise(lambdaMock, Promise.resolve());
  try {
    await processor.processDeleteEvent(new DeleteEventData('foo', new BigNumber(1)));
    expect(smartManager.sendDeleteResult).toBeCalledWith('foo deleted successfully', 'foo', new BigNumber(1), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes delete exception correctly', async () => {
  jest.spyOn(smartManager, 'sendDeleteResult');
  AWS.mockDeletePromise(lambdaMock, Promise.reject(new Error('ResourceNotFound exception')));
  try {
    await processor.processDeleteEvent(new DeleteEventData('nonExistingFunctionName', new BigNumber(1)));
    expect(smartManager.sendDeleteResult).toBeCalledWith('nonExistingFunctionName could not be deleted',
      'nonExistingFunctionName', new BigNumber(1), false);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes edit valid result correctly', async () => {
  jest.spyOn(smartManager, 'sendEditResult');
  const resultMock = {
    Payload: '{}',
  };
  AWS.mockInvokePromise(lambdaMock, Promise.resolve(resultMock));
  IPFS.catSet(ipfsMock, Promise.resolve(Buffer.from('Mocked buffer')));
  try {
    await processor.processEditEvent(new EditEventData('foo', '(a)', 2, 'someIpfsPath', new BigNumber(1)));
    expect(smartManager.sendEditResult).toBeCalledWith('foo successfully edited', 'foo', '(a)', new BigNumber(1), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes edit exception correctly', async () => {
  jest.spyOn(smartManager, 'sendEditResult');
  const error = {
    Payload: '{"message":"Mocked Error"}',
  };
  AWS.mockInvokePromise(lambdaMock, Promise.resolve(error));
  IPFS.catSet(ipfsMock, Promise.resolve(Buffer.from('Mocked buffer')));
  try {
    await processor.processEditEvent(new EditEventData('foo', '(a)', 2, 'someIpfsPath', new BigNumber(1)));
    expect(smartManager.sendEditResult).toBeCalledWith('Mocked Error', 'foo', '(a)', new BigNumber(1), false);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes edit IPFS exception correctly', async () => {
  jest.spyOn(smartManager, 'sendDeployResult');
  const resultMock = {
    Payload: '{}',
  };
  AWS.mockInvokePromise(lambdaMock, Promise.resolve(resultMock));
  IPFS.catSet(ipfsMock, Promise.reject(new Error('someIpfsPath')));
  try {
    await processor.processEditEvent(new EditEventData('foo', '(a)', 2, 'someIpfsPath', new BigNumber(1)));
    expect(smartManager.sendEditResult).toBeCalledWith('There was an error fetching the file from the given path: Error: someIpfsPath', 'foo', '(a)', new BigNumber(1), false);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});
