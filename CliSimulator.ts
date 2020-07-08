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

  async editFunction(filePath: string, function_name: any, parameters_signature: string, description: string) {
    try {
      await fs.readFile(filePath, async (err: any, data: any) => {
        if (err) {
          console.log(err);
        } else {
          try {
            const ipfsPath = await this.ipfsManager.saveOnIpfs(data);
            const tx = await this.contract.editFunction(function_name, parameters_signature, ipfsPath, { value: ethers.utils.parseEther('0.0001') });
            await tx.wait();
          } catch (error) {
            console.log('editFunction error: ', error);
          }
        }
      });
    } catch (error) { console.log('editFunction Error:\n', error); }
  }

  async deleteFunction(function_name: any) {
    try {
      const tx = await this.contract.deleteFunction(function_name, { value: ethers.utils.parseEther('0.0001') });
      await tx.wait();
    } catch (error) { console.log('deleteFunction Error:\n', error); }
  }

  async getList() {
    try {
      console.log('Getting functions list..');
      return await this.contract.getFuncList();
    } catch (err) {
      console.log('getList Error: ', err);
    }
  }
}

export default CliSimulator;
