import { BigNumber } from 'ethers/utils';
import IpfsManager from './src/ipfs/IpfsManager';

const fs = require('fs');

const ethers = require('ethers');

class CliSimulator {
  private contract: any;

  private ipfsManager: any;

  constructor(contract: any, ipfsManager: IpfsManager) {
    this.contract = contract;
    this.ipfsManager = ipfsManager;

    this.contract.on('resultOk', (response: string, id: BigNumber) => {
      console.log(`\nCaptured response for CLI with:\n id: ${id} \n response: ${response} `);
    });

    this.contract.on('resultError', (response: string, id: BigNumber) => {
      console.log(`\nCaptured ERROR for CLI with:\n id: ${id} \n response: ${response} `);
    });
  }

  async runFunction(function_name: any, parameters: any) {
    try {
      const tx = await this.contract.runFunction(function_name, parameters, { value: ethers.utils.parseEther('0.0001') });
      await tx.wait();
    } catch (error) { console.log('runFunction Error:\n', error); }
  }

  async deployFunction(filePath: string, function_name: any, parameters_signature: string, description: string) {
    try {
      await fs.readFile(filePath, async (err: any, data: any) => {
        if (err) {
          console.log(err);
        } else {
          try {
            const ipfsPath = await this.ipfsManager.saveOnIpfs(data);
            const tx = await this.contract.deployFunction(function_name, parameters_signature, description, ipfsPath, { value: ethers.utils.parseEther('0.0001') });
            await tx.wait();
          } catch (error) {
            console.log('deployFunction error: ', error);
          }
        }
      });
    } catch (error) { console.log('deployFunction Error:\n', error); }
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
