jest.genMockFromModule('ethers');
const ethers = {
  Contract: jest.fn().mockImplementation(() => {
    return {
      runResult: jest.fn().mockImplementation(),
      on: jest.fn().mockImplementation(),
      runRequest: jest.fn().mockImplementation(),
    };
  }),
};

module.exports = ethers;
