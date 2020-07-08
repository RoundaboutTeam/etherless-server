jest.genMockFromModule('ipfs-mini');
const IPFS = {
  Ipfs: jest.fn().mockImplementation(() => {
    return {
      cat: jest.fn(() => {
        return Promise.resolve(Buffer.from('DEFAULT RESOLVE'));
      }),
      add: jest.fn(() => {
        return Promise.resolve('DEFAULT REJECT');
      }),
    };
  }),
  catSet(Ipfs, promise) {
    Ipfs.cat = jest.fn().mockImplementationOnce(() => {
      return promise;
    });
  },
};

module.exports = IPFS;
