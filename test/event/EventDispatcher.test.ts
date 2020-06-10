import { BigNumber } from 'ethers/utils';
import EventDispatcher from '../../src/event/EventDispatcher';
import RunEventData from '../../src/event/RunEventData';

const dispatcher = new EventDispatcher();

const foo = function () {};

test('attaches new listener', () => {
  const attached = dispatcher.attach(foo);
  expect(attached).toBe(true);
});

test('does not attach an already attached listener', () => {
  const attached = dispatcher.attach(foo);
  expect(attached).toBe(false);
});

test('attaches more than one listener', () => {
  const tmp = function () {};
  const attached = dispatcher.attach(tmp);
  expect(attached).toBe(true);
});

test('does not detach a non existing listener', () => {
  const tmp = function () {};
  const detached = dispatcher.detach(tmp);
  expect(detached).toBe(false);
});

test('detaches existing listener', () => {
  const detached = dispatcher.detach(foo);
  expect(detached).toBe(true);
});

test('dispatches event data to listeners', () => {
  const tmp = jest.fn((data: RunEventData) => {});
  dispatcher.attach(tmp);
  dispatcher.dispatch(new RunEventData('mul', [1, 2], new BigNumber(200)));
  expect(tmp).toBeCalledTimes(1);
});
