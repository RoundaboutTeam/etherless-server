import business from './business';

(
  async function () {
    console.log('Adding a test function...');
    await business.addFunction('mul', 1);
  }()
);
