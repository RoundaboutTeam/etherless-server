jest.genMockFromModule('../AwsManager.ts');
const AwsManager = {
  Manager: jest.fn().mockImplementation(() => {
    return {
      invokeLambda: jest.fn(() => {
        return {
          promise: jest.fn(() => {
            console.log('INVOKE PROMISE IS REJECTED BY DEFAULT');
            return Promise.reject(new Error('DEFAULT INVOKE MOCK REJECTION'));
          }),
        };
      }),
      deployLambda: jest.fn(() => {
        return {
          promise: jest.fn(() => {
            console.log('DEPLOY PROMISE IS REJECTED BY DEFAULT');
            return Promise.reject(new Error('DEFAULT DEPLOY MOCK REJECTION'));
          }),
        };
      }),
      deleteLambda: jest.fn(() => {
        return {
          promise: jest.fn(() => {
            console.log('DELETE PROMISE IS REJECTED BY DEFAULT');
            return Promise.reject(new Error('DEFAULT DELETE MOCK REJECTION'));
          }),
        };
      }),
      editLambda: jest.fn(() => {
        return {
          promise: jest.fn(() => {
            console.log('EDIT PROMISE IS REJECTED BY DEFAULT');
            return Promise.reject(new Error('DEFAULT EDIT MOCK REJECTION'));
          }),
        };
      }),
    }
  }),
  invokeSet(Manager: any, promise: any) {
    Manager.invokeLambda = jest.fn().mockImplementationOnce(() => {
      return promise;
    });
  },
  deploySet(Manager: any, promise: any) {
    Manager.deployLambda = jest.fn().mockImplementationOnce(() => {
      return promise;
    });
  },
  deleteSet(Manager: any, promise: any) {
    Manager.deleteLambda = jest.fn().mockImplementationOnce(() => {
      return promise;
    });
  },
  editSet(Manager: any, promise: any) {
    Manager.editLambda = jest.fn().mockImplementationOnce(() => {
      return promise;
    });
  },
};

module.exports = AwsManager;
