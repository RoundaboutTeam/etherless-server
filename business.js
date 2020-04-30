const init = require('./init');
const contract = init.contract;

module.exports.addFunction = async function addFunction(function_name, price)
{
  let tx = await contract.addFunction(function_name, price);
  await tx.wait();
}

module.exports.removeFunction = async function removeFunction(function_name)
{
  let tx = await contract.removeFunction(function_name);
  await tx.wait();
}

module.exports.runFunction = async function runFunction(function_name, parameters, id)
{
  let tx = await contract.runFunction(function_name, parameters, id);
  await tx.wait();
}

module.exports.sendResponse = async function sendResponse(response, id)
{
  let tx = await contract.resultFunction(response, id);
  await tx.wait();
}

module.exports.getList = async function getList()
{
  let result = await contract.getList();
  console.log(result);
}