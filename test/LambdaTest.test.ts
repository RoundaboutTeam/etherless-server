import AwsManager from '../src/aws/AwsManager';

const AWS = require('aws-sdk');

// manual mock defined in __mocks__ folder adjacent to node_modules folder
jest.mock('aws-sdk');

const lambda = new AWS.Lambda();
const awsManager = new AwsManager(lambda);

test('promise function chaining', async () => {
  AWS.mockInvokePromise(lambda, Promise.resolve('500'));
  try {
    await awsManager.invokeLambda('yolo', ['1', '2']);
  } catch (err) {
    console.log('Error in chaining test: ', err);
  }
});
