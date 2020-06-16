jest.genMockFromModule('aws-sdk');
const AWS = {
  Lambda: jest.fn().mockImplementation(() => {
    return {
      invoke: jest.fn(() => {
        return {
          promise: jest.fn(() => {
            console.log('INVOKE PROMISE IS REJECTED BY DEFAULT');
            return Promise.reject(new Error('DEFAULT MOCK REJECTION'));
          }),
        };
      }),
    };
  }),
};

// lambda.invoke will return the parameter promise, used to to reuse code among test scripts
AWS.mockInvokePromise = function (lambdaObj, promise) {
  lambdaObj.invoke = jest.fn().mockImplementation(() => {
    return {
      promise: jest.fn().mockImplementation(() => {
        return promise;
      }),
    };
  });
};

module.exports = AWS;
