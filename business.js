const init = require('./init');
const contract = init.contract;

module.exports.addFunction = async function addFunction(function_name, price)
{
  try {
    let tx = await contract.addFunction(function_name, price);
    await tx.wait();
    console.log('function ' + function_name + ' was successfully added.');
  }
  catch(error){ console.log("addFunction Error:\n", error); }
}

module.exports.removeFunction = async function removeFunction(function_name)
{
  try{
    let tx = await contract.removeFunction(function_name);
    await tx.wait();
    console.log('function ' + function_name + ' was successfully removed.');
  }
  catch(error){ console.log("removeFunction Error:\n", error); }
}

module.exports.runFunction = async function runFunction(function_name, parameters)
{
  try{
    let tx = await contract.runFunction(function_name, parameters, { value: init.ethers.utils.parseEther("0.0000000000001") });
    await tx.wait();
  }
  catch(error){ console.log("runFunction Error:\n", error); }
}

module.exports.sendResponse = async function sendResponse(response, id)
{
  try{
    let tx = await contract.resultFunction(response, id);
    await tx.wait();
  }
  catch(error){ console.log("sendResponse Error:\n", error); }
}

module.exports.getList = async function getList()
{
  try{
    console.log('Getting functions list..');
    let result = await contract.getList();
    for ( i=0; i<result.length; i++ )
      result[i] = init.ethers.utils.parseBytes32String(result[i]);
    return result;
  }
  catch(error){ console.log("getList Error:\n", error); }
}

module.exports.printArray = function printArray(array)
{
  array.forEach(element => {
    console.log(element);
  });
}