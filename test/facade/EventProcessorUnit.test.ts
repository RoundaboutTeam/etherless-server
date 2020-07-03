import { BigNumber } from 'ethers/utils';
import EventProcessor from '../../src/facade/EventProcessor';
import RunEventData from '../../src/event/RunEventData';
import DeployEventData from '../../src/event/DeployEventData';
import DeleteEventData from '../../src/event/DeleteEventData';
import EditEventData from '../../src/event/EditEventData';

const AwsManager = require('../../src/aws/AwsManager');
const IpfsManager = require('../../src/ipfs/IpfsManager');
const EthSmartManager = require('../../src/smart/EthSmartManager');

// manual mocks defined in __mocks__ folder adjacent to node_modules folder
jest.mock('../../src/aws/AwsManager');
jest.mock('../../src/ipfs/IpfsManager');
jest.mock('../../src/smart/EthSmartManager');

const smartManager = EthSmartManager;
const awsManager = new AwsManager.Manager();
const processor = new EventProcessor(smartManager, awsManager, IpfsManager);

afterEach(() => {
  jest.clearAllMocks();
});

test('handles valid run result correctly', async () => {
  jest.spyOn(smartManager, 'sendRunResult');
  AwsManager.invokeSet(awsManager, Promise.resolve('15'));
  try {
    await processor.processRunEvent(new RunEventData('existingFunction', ['2', '3'], new BigNumber(1)));
    expect(smartManager.sendRunResult).toBeCalledWith('15', new BigNumber(1), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes run exception correctly', async () => {
  jest.spyOn(smartManager, 'sendRunResult');
  const error = 'Mocked Runtime Error';
  AwsManager.invokeSet(awsManager, Promise.resolve(error));
  try {
    await processor.processRunEvent(new RunEventData('existingFunctionWithBug', ['2', '3'], new BigNumber(1)));
    expect(smartManager.sendRunResult).toBeCalledWith('Mocked Runtime Error', new BigNumber(1), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes run invocation fail correctly', async () => {
  jest.spyOn(smartManager, 'sendRunResult');
  AwsManager.invokeSet(awsManager, Promise.reject(new Error('Run Invocation Error')));
  try {
    await processor.processRunEvent(new RunEventData('existingFunction', ['2', '3'], new BigNumber(1)));
    expect(smartManager.sendRunResult).toBeCalledWith('Run Invocation Error', new BigNumber(1), false);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes deploy valid result correctly', async () => {
  jest.spyOn(smartManager, 'sendDeployResult');
  AwsManager.deploySet(awsManager, Promise.resolve('foo successfully deployed'));
  try {
    await processor.processDeployEvent(new DeployEventData('foo', 2, 'someIpfsPath', new BigNumber(1)));
    expect(smartManager.sendDeployResult).toBeCalledWith('foo successfully deployed', 'foo', new BigNumber(1), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes deploy exception correctly', async () => {
  jest.spyOn(smartManager, 'sendDeployResult');
  const error = 'Mocked Runtime Error';
  AwsManager.deploySet(awsManager, Promise.resolve(error));
  try {
    await processor.processDeployEvent(new DeployEventData('foo', 2, 'someIpfsPath', new BigNumber(1)));
    expect(smartManager.sendDeployResult).toBeCalledWith('Mocked Runtime Error', 'foo', new BigNumber(1), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes deploy IPFS exception correctly', async () => {
  jest.spyOn(smartManager, 'sendDeployResult');
  const error = 'File could not be read';
  AwsManager.deploySet(awsManager, Promise.resolve('foo successfully deployed'));
  IpfsManager.getFileContent.mockReturnValueOnce(Promise.reject(new Error(error)));
  try {
    await processor.processDeployEvent(new DeployEventData('foo', 2, 'someIpfsPath', new BigNumber(1)));
    expect(smartManager.sendDeployResult).toBeCalledWith('File could not be read', 'foo', new BigNumber(1), false);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes delete valid result correctly', async () => {
  jest.spyOn(smartManager, 'sendDeleteResult');
  AwsManager.deleteSet(awsManager, Promise.resolve('foo deleted successfully'));
  try {
    await processor.processDeleteEvent(new DeleteEventData('foo', new BigNumber(1)));
    expect(smartManager.sendDeleteResult).toBeCalledWith('foo deleted successfully', 'foo', new BigNumber(1), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes delete exception correctly', async () => {
  jest.spyOn(smartManager, 'sendDeleteResult');
  AwsManager.deleteSet(awsManager, Promise.reject(new Error('nonExistingFunctionName could not be deleted')));
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
  const resultMock = 'foo successfully edited';
  AwsManager.editSet(awsManager, Promise.resolve(resultMock));
  try {
    await processor.processEditEvent(new EditEventData('foo', '(a)', 2, 'someIpfsPath', new BigNumber(1)));
    expect(IpfsManager.getFileContent).toBeCalledWith('someIpfsPath');
    expect(awsManager.editLambda).toBeCalledWith('foo', 2, 'File read successfully');
    expect(smartManager.sendEditResult).toBeCalledWith('foo successfully edited', 'foo', '(a)', new BigNumber(1), true);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('processes edit exception correctly', async () => {
  jest.spyOn(smartManager, 'sendEditResult');
  const error = 'Mocked Error';
  AwsManager.editSet(awsManager, Promise.reject(new Error(error)));
  try {
    await processor.processEditEvent(new EditEventData('foo', '(a)', 2, 'someIpfsPath', new BigNumber(1)));
    expect(IpfsManager.getFileContent).toBeCalledWith('someIpfsPath');
    expect(awsManager.editLambda).toBeCalledWith('foo', 2, 'File read successfully');
    expect(smartManager.sendEditResult).toBeCalledWith('Mocked Error', 'foo', '(a)', new BigNumber(1), false);
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});
