import { BigNumber } from 'ethers/utils';

const ethers = require('ethers');

class CliSimulator {
  contract: any;

  constructor(contract: any) {
    this.contract = contract;

    this.contract.on('response', (response: string, id: BigNumber) => {
      console.log(`\nCaptured response for CLI with id ${id} :\n${response}`);
    });
  }

  async addFunction(function_name: string, signature:string, price: any, description: string) {
    try {
      const tx = await this.contract.addFunction(function_name, signature, price, description);
      await tx.wait();
      console.log(`function ${function_name} was successfully added.`);
    } catch (error) { console.log('addFunction Error:\n', error); }
  }

  async removeFunction(function_name: string) {
    try {
      const tx = await this.contract.removeFunction(function_name);
      await tx.wait();
      console.log(`function ${function_name} was successfully removed.`);
    } catch (error) { console.log('removeFunction Error:\n', error); }
  }

  async runFunction(function_name: any, parameters: any) {
    try {
      const tx = await this.contract.runFunction(function_name, parameters, { value: ethers.utils.parseEther('0.0001') });
      await tx.wait();
    } catch (error) { console.log('runFunction Error:\n', error); }
  }

  async sendResponse(response: string, id: BigNumber) {
    try {
      const tx = await this.contract.resultFunction(response, id);
      await tx.wait();
    } catch (error) { console.log('sendResponse Error:\n', error); }
  }

  async getList() {
    try {
      console.log('Getting functions list..');
      const result = await this.contract.getList();
      for (let i = 0; i < result.length; i += 1) {
        result[i] = ethers.utils.parseBytes32String(result[i]);
      }
      return result;
    } catch (error) {
      console.log('getList Error:\n', error);
      return undefined;
    }
  }
}

export default CliSimulator;
