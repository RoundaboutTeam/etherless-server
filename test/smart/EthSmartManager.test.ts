import { BigNumber } from 'ethers/utils';
import EthSmartManager from '../../src/smart/EthSmartManager';
import RunEventData from '../../src/event/RunEventData';

const ethers = require('ethers');

jest.mock('ethers');

const contract = new ethers.Contract();
const smartManager = new EthSmartManager(contract);

test('sendResponse is successful', () => {
  smartManager.sendRunResult('ok response', new BigNumber(1), true);
  expect(smartManager.sendRunResult).not.toThrow();
});

test('sendResponse blockchain exception is captured and managed correctly', () => {
  contract.runResult.mockImplementationOnce(() => { throw new Error('Blockchain Error'); });
  smartManager.sendRunResult('ok response with blockchain exception', new BigNumber(1), true);
  expect(smartManager.sendRunResult).not.toThrow();
});

test('adds run listener', () => {
  const result = smartManager.onRun(() => {});
  expect(result).toBe(true);
});

// how should we simulate a contract-received event if we shouldn't communicate with the blockchain?
test('dispatches run event', () => {
  expect.assertions(0);
  try {
    smartManager.dispatchRunEvent(new RunEventData('', [], new BigNumber(1)));
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
  }
});
