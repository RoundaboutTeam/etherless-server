import IpfsManager from '../../src/ipfs/IpfsManager';

const IPFS = require('ipfs-mini');

// manual mocks defined in __mocks__ folder adjacent to node_modules folder
jest.mock('ipfs-mini');

const ipfsMock = new IPFS.Ipfs();
const ipfsManager = new IpfsManager(ipfsMock);

test('getFileContent correctly returns result', async () => {
  ipfsMock.cat = jest.fn().mockImplementationOnce(() => {
    return Promise.resolve(Buffer.from('Some mocked content'));
  });

  const buff = await ipfsManager.getFileContent('somePath');
  expect(buff).toBeInstanceOf(Buffer);
});

test('getFileContent correctly manages exception', async () => {
  ipfsMock.cat = jest.fn().mockImplementationOnce(() => {
    return Promise.reject(new Error('some ipfs error'));
  });
  expect.assertions(1);

  try {
    await ipfsManager.getFileContent('somePath');
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
  }
});


test('saveOnIpfs correctly returns result', async () => {
  ipfsMock.add = jest.fn().mockImplementationOnce(() => {
    return Promise.resolve('IPFS Path Here');
  });

  const path = await ipfsManager.saveOnIpfs(Buffer.from('save this on IPFS'));
  expect(path).toBe('IPFS Path Here');
});

test('saveOnIpfs correctly manages exception', async () => {
  ipfsMock.add = jest.fn().mockImplementationOnce(() => {
    return Promise.reject(new Error('Unable to upload file on IPFS'));
  });

  expect.assertions(1);
  try {
    await ipfsManager.saveOnIpfs(Buffer.from('save this on IPFS'));
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
  }
});