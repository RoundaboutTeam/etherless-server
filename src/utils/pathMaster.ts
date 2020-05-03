import path from 'path';

// configuration files
const configPath = path.resolve(__dirname, '..', '..', 'configs', 'config.json');
const abPath = path.resolve(__dirname, '..', '..', 'configs', 'abi_bytecode.json');
const eSmartPath = path.resolve(__dirname, '..', '..', 'contracts', 'EtherlessSmart.sol');

// app folder
const businessPath:string = path.resolve(__dirname, '..', 'app', 'business.ts');
const compileSmartPath = path.resolve(__dirname, '..', 'app', 'compileSmart.ts');
const deploySmartPath = path.resolve(__dirname, '..', 'app', 'deploySmart.ts');
const initSmartPath = path.resolve(__dirname, '..', 'app', 'initSmart.ts');

// utils folder
const configUtilsPath = path.resolve(__dirname, 'configUtils.ts');
const deployUtilsPath = path.resolve(__dirname, 'deployUtils.ts');

export default {
  configPath,
  abPath,
  eSmartPath,
  businessPath,
  compileSmartPath,
  deploySmartPath,
  initSmartPath,
  configUtilsPath,
  deployUtilsPath,
};
