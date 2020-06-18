jest.genMockFromModule('ipfs-mini');
const IPFS = {
  Ipfs: jest.fn().mockImplementation(() => {
    return {
      cat: jest.fn(() => {
        return Promise.resolve(Buffer.from('Mocked Buffer'));
      }),
      add: jest.fn(() => {
        return Promise.resolve('Mocked Ipfs Path');
      }),
    };
  }),
};

module.exports = IPFS;
