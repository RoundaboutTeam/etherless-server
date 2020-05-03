import path from 'path';
import fs from 'fs';

function getConfig() {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config.json'), 'UTF-8'));
}

function getAbiBytecode() {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'abi_bytecode.json'), 'UTF-8'));
}

function setConfig(configObj: object) {
  fs.writeFile(path.resolve(__dirname, 'config.json'), JSON.stringify(configObj), (err: any) => {
    if (err) return console.log(err);
    return console.log('config.json was succesfully updated');
  });
}

function setAbiBytecode(abObj: object) {
  fs.writeFile(path.resolve(__dirname, 'abi_bytecode.json'), JSON.stringify(abObj), (err: any) => {
    if (err) return console.log(err);
    return console.log('abi_bytecode.json was succesfully updated');
  });
}

function getEtherlessSmartSource() {
  return fs.readFileSync(path.resolve(__dirname, 'contracts', 'EtherlessSmart.sol'), 'UTF-8');
}

function getAddress() {
  return path.resolve(__dirname, 'abi_bytecode.json');
}

export default {
  getConfig, getAbiBytecode, setConfig, setAbiBytecode, getEtherlessSmartSource, getAddress,
};
