import { BigNumber } from 'ethers/utils';
import EventProcessor from '../../src/facade/EventProcessor';
import EthSmartManager from '../../src/smart/EthSmartManager';
import EthSmartConfig from '../../src/config/EthSmartConfig';
import AwsManager from '../../src/aws/AwsManager';
import RunEventData from '../../src/event/RunEventData';
import AwsConfig from '../../src/config/AwsConfig';
import SmartManager from '../../src/smart/SmartManager';


const ethers = require('ethers');
const AWS = require('aws-sdk');

// manual mocks defined in __mocks__ folder adjacent to node_modules folder
jest.mock('ethers');
jest.mock('aws-sdk');

const contractMock = new ethers.Contract();
const smartManager = new EthSmartManager(contractMock);

const lambdaMock = new AWS.Lambda();
const awsManager = new AwsManager(lambdaMock);

const processor = new EventProcessor(smartManager, awsManager);

test('handles valid run result correctly', async () => {
  jest.spyOn(smartManager, 'sendRunResult');
  AWS.mockInvokePromise(lambdaMock, Promise.resolve({ Payload: '15' }));
  try {
    await processor.processRunEvent(new RunEventData('existingFunction', ['2', '3'], new BigNumber(1)));
    expect(smartManager.sendRunResult).toBeCalledWith(expect.anything(), expect.anything(), true);
  } catch (err) {
    expect(err).toMatch('error');
  }
});

test('processes run runtime-exception correctly', async () => {
  jest.spyOn(smartManager, 'sendRunResult');
  const error = {
    FunctionError: true,
    Payload: {
      errorMessage: 'MOcked Runtime Error',
    },
  };
  AWS.mockInvokePromise(lambdaMock, Promise.resolve(error));
  await processor.processRunEvent(new RunEventData('existingFunctionWithBug', ['2', '3'], new BigNumber(1)));
  expect(smartManager.sendRunResult).toBeCalledWith(expect.anything(), expect.anything(), false);
});


test('processes Lambda Invoke Fatal Exception correctly', async () => {
  jest.spyOn(smartManager, 'sendRunResult');
  lambdaMock.invoke = jest.fn().mockImplementationOnce(() => { throw new Error('Lambda failed to run the function requested'); });
  await processor.processRunEvent(new RunEventData('existingFunction', ['2', '3'], new BigNumber(1)));
  expect(smartManager.sendRunResult).toBeCalledWith(expect.anything(), expect.anything(), false);
});
