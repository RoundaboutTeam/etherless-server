import { BigNumber } from 'ethers/utils';
import EventProcessor from '../../src/facade/EventProcessor';
import EthSmartManager from '../../src/smart/EthSmartManager';
import AwsManager from '../../src/aws/AwsManager';
import IpfsManager from '../../src/ipfs/IpfsManager';
import RunEventData from '../../src/event/RunEventData';
import DeployEventData from '../../src/event/DeployEventData';

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

test('handles valid run result correctly', async () => {
  jest.spyOn(smartManager, 'sendRunResult');
  AWS.mockInvokePromise(lambdaMock, Promise.resolve({ Payload: JSON.stringify({ message: '15' }) }));
  try {
    await processor.processRunEvent(new RunEventData('existingFunction', ['2', '3'], new BigNumber(1)));
    expect(smartManager.sendRunResult).toBeCalledWith(expect.anything(), expect.anything(), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes run exception correctly', async () => {
  jest.spyOn(smartManager, 'sendRunResult');
  const error = {
    FunctionError: true,
    Payload: {
      errorMessage: 'Mocked Runtime Error',
    },
  };
  AWS.mockInvokePromise(lambdaMock, Promise.resolve(error));
  try {
    await processor.processRunEvent(new RunEventData('existingFunctionWithBug', ['2', '3'], new BigNumber(1)));
    expect(smartManager.sendRunResult).toBeCalledWith(expect.anything(), expect.anything(), false);
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
  try {
    await processor.processDeployEvent(new DeployEventData('foo', 2, 'someIpfsPath', new BigNumber(1)));
    expect(smartManager.sendDeployResult).toBeCalledWith(expect.anything(), expect.anything(), expect.anything(), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});


test('processes deploy exception correctly', async () => {
  jest.spyOn(smartManager, 'sendDeployResult');
  const error = {
    Payload: JSON.stringify({
      message: 'Mocked Runtime Error',
    }),
  };
  AWS.mockInvokePromise(lambdaMock, Promise.reject(error));
  try {
    await processor.processDeployEvent(new DeployEventData('foo', 2, 'someIpfsPath', new BigNumber(1)));
    expect(smartManager.sendDeployResult).toBeCalledWith(expect.anything(), expect.anything(), expect.anything(), false);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});
