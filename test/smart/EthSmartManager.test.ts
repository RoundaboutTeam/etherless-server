import { BigNumber } from 'ethers/utils';
import EthSmartManager from '../../src/smart/EthSmartManager';
import RunEventData from '../../src/event/RunEventData';
import DeployEventData from '../../src/event/DeployEventData';
import DeleteEventData from '../../src/event/DeleteEventData';
import EditEventData from '../../src/event/EditEventData';

const ethers = require('ethers');

jest.mock('ethers');

const contract = new ethers.Contract();
const smartManager = new EthSmartManager(contract);

test('correctly calculates the number of parameters in a signature', () => {
  expect(EthSmartManager.getParametersCount('')).toBe(0);
  expect(EthSmartManager.getParametersCount('()')).toBe(0);
  expect(EthSmartManager.getParametersCount('(a)')).toBe(1);
  expect(EthSmartManager.getParametersCount('(a, b)')).toBe(2);
});

test('sendRunResult blockchain exception is captured and managed correctly', () => {
  contract.runResult.mockImplementationOnce(() => { throw new Error('Blockchain Error'); });
  smartManager.sendRunResult('ok response with blockchain exception', new BigNumber(1), true);
  expect(smartManager.sendRunResult).not.toThrow();
});

test('adds run callback', () => {
  const result = smartManager.onRun(() => {});
  expect(result).toBe(true);
});

test('dispatches run event', () => {
  expect.assertions(0);
  try {
    smartManager.dispatchRunEvent(new RunEventData('', [], new BigNumber(1)));
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('sendDeployResult blockchain exception is captured and managed correctly', () => {
  contract.runResult.mockImplementationOnce(() => { throw new Error('Blockchain Error'); });
  smartManager.sendDeployResult('ok response with blockchain exception', 'someName', new BigNumber(1), true);
  expect(smartManager.sendDeployResult).not.toThrow();
});

test('adds deploy callback', () => {
  const result = smartManager.onDeploy(() => {});
  expect(result).toBe(true);
});

test('dispatches deploy event', () => {
  expect.assertions(0);
  try {
    smartManager.dispatchDeployEvent(new DeployEventData('', 2, '', new BigNumber(1)));
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('sendDeleteResult blockchain exception is captured and managed correctly', () => {
  contract.runResult.mockImplementationOnce(() => { throw new Error('Blockchain Error'); });
  smartManager.sendDeleteResult('ok response with blockchain exception', 'someName', new BigNumber(1), true);
  expect(smartManager.sendDeployResult).not.toThrow();
});

test('adds delete callback', () => {
  const result = smartManager.onDelete(() => {});
  expect(result).toBe(true);
});

test('dispatches delete event', () => {
  expect.assertions(0);
  try {
    smartManager.dispatchDeleteEvent(new DeleteEventData('someFunctionName', new BigNumber(1)));
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('sendEditResult blockchain exception is captured and managed correctly', () => {
  contract.runResult.mockImplementationOnce(() => { throw new Error('Blockchain Error'); });
  smartManager.sendEditResult('ok response with blockchain exception', 'someName', new BigNumber(1), true);
  expect(smartManager.sendEditResult).not.toThrow();
});

test('adds edit callback', () => {
  const result = smartManager.onEdit(() => {});
  expect(result).toBe(true);
});

test('dispatches edit event', () => {
  expect.assertions(0);
  try {
    smartManager.dispatchEditEvent(new EditEventData('', 2, '', new BigNumber(1)));
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});
