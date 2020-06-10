import AwsManager from '../../src/aws/AwsManager';

// manual mock defined in __mocks__ folder adjacent to node_modules folder
jest.mock('aws-sdk');

const AWS = require('aws-sdk');


const lambdaMock = new AWS.Lambda();
const awsManager = new AwsManager(lambdaMock);


test('correctly returns valid lambda response', async () => {
  AWS.mockInvokePromise(lambdaMock, Promise.resolve({ Payload: '15' }));
  try {
    const result = await awsManager.invokeLambda('existingFunction', ['2', '3']);
    expect(result).toBe('15');
  } catch (err) {
    throw new Error('test failed with error: ' + err);
  }
});

test('correctly handles a runtime Lambda error', async () => {
  const error = {
    Payload: {
      errorMessage: 'object of type string could not be converted to int',
    },
    FunctionError: true,
  };

  AWS.mockInvokePromise(lambdaMock, Promise.resolve(error));
  expect.assertions(1);
  try {
    await awsManager.invokeLambda('existingFunctionWithBug', ['2', '3']);
  } catch (err) {
    expect(err.message).toBe('Error Code: object of type string could not be converted to int');
  }
});

test('correctly handles a specific Fatal Lambda error which has an error code', async () => {
  const error = {
    someErrorInformation: 'This is a known error',
    code: 'Resource Not Found',
  };

  AWS.mockInvokePromise(lambdaMock, Promise.reject(error));
  try {
    await awsManager.invokeLambda('existingFunctionWithBug', ['2', '3']);
  } catch (err) {
    expect(err.message).toBe('Error Code: Resource Not Found');
  }
});

test('correctly handles a generic Fatal Lambda error which does not have an error code', async () => {
  const error = {
    someErrorInformation: 'This is a generic error',
  };

  AWS.mockInvokePromise(lambdaMock, Promise.reject(error));
  try {
    await awsManager.invokeLambda('existingFunctionWithBug', ['2', '3']);
  } catch (err) {
    expect(err.message).toBe('Fatal: Lambda function could not be run.');
  }
});

