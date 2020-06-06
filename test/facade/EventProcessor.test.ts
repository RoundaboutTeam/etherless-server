import { BigNumber } from 'ethers/utils';
import EventProcessor from '../../src/facade/EventProcessor';
import EthSmartManager from '../../src/smart/EthSmartManager';
import EthSmartConfig from '../../src/config/EthSmartConfig';
import AwsManager from '../../src/aws/AwsManager';
import RunEventData from '../../src/event/RunEventData';
import AwsConfig from '../../src/config/AwsConfig';

jest.mock('../../src/aws/AwsManager');
jest.mock('../../src/smart/EthSmartManager');

// smartManager & awsManager mocks
const smartManager = new EthSmartManager(new EthSmartConfig('', '', '', []));
const awsManager = new AwsManager(new AwsConfig('', '', ''));

const processor = new EventProcessor(smartManager, awsManager);

test('invokes lambda through event dispatch', () => {
  smartManager.dispatchRunEvent(new RunEventData('existingName', ['2', '3'], new BigNumber(200)));
  expect(awsManager.invokeLambda).toBeCalledTimes(1);
});

test('processes run event correctly', async () => {
  smartManager.dispatchRunEvent(new RunEventData('existingName', ['2', '3'], new BigNumber(200)));
  expect(smartManager.sendResponse).toBeCalledTimes(1);
});

test('catches exception correctly', async () => {
  smartManager.dispatchRunEvent(new RunEventData('NotExistingName', ['2', '3'], new BigNumber(200)));
  expect(awsManager.invokeLambda).rejects.toThrow();
});
