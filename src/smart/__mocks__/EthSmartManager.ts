import { BigNumber } from 'ethers/utils';
import SmartManager from '../SmartManager';

class EthereumSmartManager extends SmartManager {
  sendResponse = jest.fn((response: string, id: BigNumber) => {});

  sendError = jest.fn((response: string, id: BigNumber) => {});
}

export default EthereumSmartManager;
