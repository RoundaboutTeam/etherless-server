jest.genMockFromModule('../IpfsManager.ts');
const IpfsManager = {
  getFileContent: jest.fn(() => {
    return Promise.resolve('File read successfully');
  }),
};

module.exports = IpfsManager;
