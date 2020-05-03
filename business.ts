import init from './init';

const { contract } = init;

async function addFunction(function_name: string, price: any) {
  try {
    const tx = await contract.addFunction(function_name, price);
    await tx.wait();
    console.log(`function ${function_name} was successfully added.`);
  } catch (error) { console.log('addFunction Error:\n', error); }
}

async function removeFunction(function_name: string) {
  try {
    const tx = await contract.removeFunction(function_name);
    await tx.wait();
    console.log(`function ${function_name} was successfully removed.`);
  } catch (error) { console.log('removeFunction Error:\n', error); }
}

async function runFunction(function_name: any, parameters: any) {
  try {
    const tx = await contract.runFunction(function_name, parameters, { value: init.ethers.utils.parseEther('0.0000000000001') });
    await tx.wait();
  } catch (error) { console.log('runFunction Error:\n', error); }
}

async function sendResponse(response: any, id: any) {
  try {
    const tx = await contract.resultFunction(response, id);
    await tx.wait();
  } catch (error) { console.log('sendResponse Error:\n', error); }
}

async function getList() {
  try {
    console.log('Getting functions list..');
    const result = await contract.getList();
    for (let i = 0; i < result.length; i += 1) {
      result[i] = init.ethers.utils.parseBytes32String(result[i]);
    }
    return result;
  } catch (error) {
    console.log('getList Error:\n', error);
    return undefined;
  }
}

function printArray(array: any[]) {
  array.forEach((element: any) => {
    console.log(element);
  });
}

export default {
  addFunction, removeFunction, runFunction, sendResponse, getList, printArray,
};
