import smart from './smart';

(
  async function () {
    console.log('Adding a test function...');
    await smart.addFunction('mul', 1);
  }()
);
