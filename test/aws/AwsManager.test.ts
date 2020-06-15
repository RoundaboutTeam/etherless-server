import AwsManager from '../../src/aws/AwsManager';

// manual mock defined in __mocks__ folder adjacent to node_modules folder
jest.mock('aws-sdk');

const AWS = require('aws-sdk');

const lambdaMock = new AWS.Lambda();
const awsManager = new AwsManager(lambdaMock);

test('correctly returns valid lambda run responses', async () => {
  AWS.mockInvokePromise(lambdaMock, Promise.resolve({ Payload: JSON.stringify({ message: '15' }) }));
  try {
    const result = await awsManager.invokeLambda('existingFunction', ['2', '3']);
    expect(result).toBe('15');
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('correctly handles a run runtime Lambda error', async () => {
  const error = {
    Payload: JSON.stringify({
      errorMessage: 'object of type string could not be converted to int',
    }),
    FunctionError: true,
  };

  AWS.mockInvokePromise(lambdaMock, Promise.resolve(error));
  expect.assertions(1);
  try {
    const result = await awsManager.invokeLambda('existingFunctionWithBug', ['2', '3']);
    expect(result).toBe('object of type string could not be converted to int');
  } catch (err) {
    throw new Error(err);
  }
});

test('correctly handles a generic Fatal Lambda error during run', async () => {
  const error = {
    someErrorInformation: 'This is a generic error',
  };

  AWS.mockInvokePromise(lambdaMock, Promise.reject(new Error('Generic Error without ErrorFunction attribute')));
  try {
    await awsManager.invokeLambda('existingFunctionButLambdaError', ['2', '3']);
  } catch (err) {
    expect(err.message).toBe('Generic Error without ErrorFunction attribute');
  }
});

test('correctly returns valid lambda deploy responses', async () => {
  AWS.mockInvokePromise(lambdaMock, Promise.resolve({ Payload: '{}' }));
  try {
    const result = await awsManager.deployFunction('foo', 2, Buffer.from('code example'));
    expect(result).toBe('foo successfully deployed');
  } catch (err) {
    throw new Error(`test failed with error: ${err}`);
  }
});

test('correctly handles error in Deployer lambda invocation', async () => {
  const resultMock = {
    FunctionError: 'UnhandledError',
    Payload: JSON.stringify({
      errorMessage: 'FunctionNotFound',
    }),
  };
  AWS.mockInvokePromise(lambdaMock, Promise.resolve(resultMock));
  try {
    await awsManager.deployFunction('foo', 2, Buffer.from('code example'));
    expect.assertions(1);
  } catch (err) {
    expect(err.message).toBe('FunctionNotFound');
  }
});

test('correctly handles error in createFunction invocation from the Deployer', async () => {
  const resultMock = {
    Payload: JSON.stringify({
      message: 'Error in createFunction in Deployer',
    }),
  };
  AWS.mockInvokePromise(lambdaMock, Promise.resolve(resultMock));
  try {
    await awsManager.deployFunction('foo', 2, Buffer.from('code example'));
    expect.assertions(1);
  } catch (err) {
    expect(err.message).toBe('Error in createFunction in Deployer');
  }
});

