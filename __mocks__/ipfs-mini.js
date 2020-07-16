jest.genMockFromModule('ipfs-mini');
const IPFS = {
  Ipfs: jest.fn().mockImplementation(() => {
    return {
      catJSON: jest.fn(() => {
        return Promise.resolve(Buffer.from('DEFAULT RESOLVE'));
      }),
      addJSON: jest.fn(() => {
        return Promise.resolve('DEFAULT REJECT');
      }),
    };
  }),
  catSet(Ipfs, promise) {
    Ipfs.catJSON = jest.fn().mockImplementationOnce(() => {
      return promise;
    });
  },
};

module.exports = IPFS;
