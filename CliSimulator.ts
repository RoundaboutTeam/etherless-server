import { BigNumber } from 'ethers/utils';

const ethers = require('ethers');

class CliSimulator {
  contract: any;

  constructor(contract: any) {
    this.contract = contract;

    this.contract.on('resultOk', (response: string, id: BigNumber) => {
      console.log(`\nCaptured RUN response for CLI with:\n id: ${id} \n response: ${response} `);
    });

    this.contract.on('resultError', (response: string, id: BigNumber) => {
      console.log(`\nCaptured RUN ERROR for CLI with:\n id: ${id} \n response: ${response} `);
    });
  }

  async runFunction(function_name: any, parameters: any) {
    try {
      const tx = await this.contract.runFunction(function_name, parameters, { value: ethers.utils.parseEther('0.0001') });
      await tx.wait();
    } catch (error) { console.log('runFunction Error:\n', error); }
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
