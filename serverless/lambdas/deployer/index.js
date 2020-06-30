
const JSZip = require('jszip');

const AWS = require('aws-sdk');

const Lambda = require('aws-sdk/clients/lambda');

function injectDefaultHandler(content, functionName, parametersCount) {
  const p = 'const p = event.parameters;';
  let params = '';
  for (let i = 0; i < parametersCount; i += 1) {
    if (i !== 0) {
      params += ', ';
    }
    params += `p[${i}]`;
  }
  return `module.exports.defaultHandler = async event => {
    ${p}
    return { message: ${functionName}(${params}) };
}\n
  ${content}`;
}

// returns a buffer reppresenting the zip folder
async function buildZip(content) {
  const zip = new JSZip();

  zip.file('index.js', content);
  const c = await zip.generateAsync({ type: 'nodebuffer' }).then((result) => result);
  return c;
}

// deploys a new function with the fiven parameters
async function deployFunction(functionName, zipContent) {
  const lambda = new Lambda();

  const params = {
    FunctionName: `${functionName}`,
    Code: {
      ZipFile: zipContent,
    },
    Handler: 'index.defaultHandler',
    Role: 'arn:aws:iam::817867361406:role/etherless-server',
    Runtime: 'nodejs12.x',
  };

  try {
    return await lambda.createFunction(params).promise();
  } catch (err) {
    return err;
  }
}

// edits an existing function with the given parameters
async function editFunction(functionName, zipContent) {
  const lambda = new Lambda();

  const params = {
    FunctionName: `${functionName}`,
    ZipFile: zipContent,
  };

  try {
    return await lambda.updateFunctionCode(params).promise();
  } catch (err) {
    return err;
  }
}

// manages the deployment process after checking if it's a new deploy or an edit-deploy
module.exports.deploy = async (event) => {
  // common for both deploy and edit
  const fixBuffer = Buffer.from(event.fileBuffer.data);
  const fileContent = injectDefaultHandler(fixBuffer.toString('utf8'), event.functionName, event.parametersCount);
  const zipContent = await buildZip(fileContent);

  // requested an edit for an already existing function
  if (event.edit) {
    try {
      return await editFunction(event.functionName, zipContent);
    } catch (err) {
      return err;
    }
  }

  // requested a fresh deploy of a non existing function
  try {
    return await deployFunction(event.functionName, zipContent);
  } catch (err) {
    return err;
  }
};
