import init from './init';

import { abi, bytecode } from './compileSmart';
import configUtils from './configUtils';

(async function () {
  const factory = new init.ethers.ContractFactory(abi, bytecode, init.wallet);
  const contract = await factory.deploy();

  // The address the Contract will have once mined
  console.log(`Contract address: ${contract.address}`);

  // The contract is NOT deployed yet; we must wait until it is mined
  await contract.deployed();

  const config = configUtils.getConfig();
  config.previousContractAddress = init.contractAddress;
  config.contractAddress = contract.address;
  configUtils.setConfig(config);
}());
