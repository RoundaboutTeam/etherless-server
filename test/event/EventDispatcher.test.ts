import { BigNumber } from 'ethers/utils';
import EventDispatcher from '../../src/event/EventDispatcher';
import RunEventData from '../../src/event/RunEventData';

const dispatcher = new EventDispatcher();

test('correctly attaches a new callback', () => {
  const foo = function () {};
  const attached = dispatcher.attach(foo);
  expect(attached).toBe(true);
});

test('does not attach an already attached callback', () => {
  const tmp = function () {};
  dispatcher.attach(tmp);
  const attached = dispatcher.attach(tmp);
  expect(attached).toBe(false);
});

test('attaches more than one listener', () => {
  const tmp = function () {};
  const tmp1 = function () {};
  dispatcher.attach(tmp);
  const attached = dispatcher.attach(tmp1);
  expect(attached).toBe(true);
});

test('does not detach a non existing listener', () => {
  const tmp = function () {};
  const detached = dispatcher.detach(tmp);
  expect(detached).toBe(false);
});

test('detaches existing listener', () => {
  const tmp = function () {};
  dispatcher.attach(tmp);
  const detached = dispatcher.detach(tmp);
  expect(detached).toBe(true);
});

test('dispatches event data to listeners', () => {
  const tmp = jest.fn((data: RunEventData) => {});
  dispatcher.attach(tmp);
  dispatcher.dispatch(new RunEventData('mul', [1, 2], new BigNumber(200)));
  expect(tmp).toBeCalledTimes(1);
});
