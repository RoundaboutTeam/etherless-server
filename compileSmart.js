const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'EtherlessSmart.sol');
const source = fs.readFileSync(contractPath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'EtherlessSmart.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

const compiled = JSON.parse(solc.compile(JSON.stringify(input)));

const abi = JSON.stringify(compiled.contracts['EtherlessSmart.sol'].EtherlessSmart.abi);
const bytecode = compiled.contracts['EtherlessSmart.sol'].EtherlessSmart.evm.bytecode.object;

fs.writeFile('abi_bytecode.json', JSON.stringify({abi, bytecode}), function (err) {
    if (err) return console.log(err);
    console.log('Bytecode and ABI were saved in abi_bytecode.json');
});

module.exports = {abi, bytecode};