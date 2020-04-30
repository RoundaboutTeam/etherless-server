(async function (){
    const init = require('./init');
    const fs = require('fs');

    const {abi, bytecode} = require('./compileSmart');
    let factory = new init.ethers.ContractFactory(abi, bytecode, init.wallet);
    let contract = await factory.deploy();

    // The address the Contract will have once mined
    console.log("Contract address: " + contract.address);

    // The contract is NOT deployed yet; we must wait until it is mined
    await contract.deployed()

    let config = JSON.parse(fs.readFileSync('./config.json', 'UTF-8'));
    config.previousContractAddress = init.contractAddress;
    config.contractAddress = contract.address;

    fs.writeFile('config.json', JSON.stringify(config), function (err) {
        if (err) return console.log(err);
        console.log('Newly deployed contract address was saved in config.json');
    });
})();