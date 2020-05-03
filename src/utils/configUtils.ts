import path from 'path';
import fs from 'fs';

const configPath = path.resolve(__dirname, '..', '..', 'configs', 'config.json');
const abPath = path.resolve(__dirname, '..', '..', 'configs', 'abi_bytecode.json');
const eSmartPath = path.resolve(__dirname, '..', '..', 'contracts', 'EtherlessSmart.sol');

function getConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
}

function getAbiBytecode() {
  return JSON.parse(fs.readFileSync(abPath, 'UTF-8'));
}

function setConfig(configObj: object) {
  fs.writeFile(configPath, JSON.stringify(configObj), (err: any) => {
    if (err) return console.log(err);
    return console.log('config.json was succesfully updated');
  });
}

function setAbiBytecode(abObj: object) {
  fs.writeFile(abPath, JSON.stringify(abObj), (err: any) => {
    if (err) return console.log(err);
    return console.log('abi_bytecode.json was succesfully updated');
  });
}

function getEtherlessSmartSource() {
  return fs.readFileSync(eSmartPath, 'UTF-8');
}

export default {
  getConfig, getAbiBytecode, setConfig, setAbiBytecode, getEtherlessSmartSource,
};
