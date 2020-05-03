import configUtils from '../utils/configUtils';

const solc = require('solc');

const source = configUtils.getEtherlessSmartSource();

const input = {
  language: 'Solidity',
  sources: {
    'EtherlessSmart.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
const abi = JSON.stringify(compiled.contracts['EtherlessSmart.sol'].EtherlessSmart.abi);
const bytecode = compiled.contracts['EtherlessSmart.sol'].EtherlessSmart.evm.bytecode.object;

configUtils.setAbiBytecode({ abi, bytecode });

export { abi, bytecode };
