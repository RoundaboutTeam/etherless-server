
const AWS = require('aws-sdk');

const Lambda = require('aws-sdk/clients/lambda');

const fs = require('fs-extra');

const Zip = require('adm-zip');

const { execSync } = require('child_process');

/**
  * @desc builds the defaultHandler function and returns the new file content
  * @method injectDefaultHandler
  * @param content the content of the file to be deployed in format string
  * @param functionName name of the function to be called in the defaultHandler
  * @param parametersCount number of parameters to be used for the function invocation in the defaultHandler
  * @return string - the content merged with the defaultHandler function
*/
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
    return { message: await ${functionName}(${params}) };
}\n
  ${content}`;
}

/**
  * @desc returns a buffer representing a zip folder
  * @method buildZip
  * @return Buffer - a buffer representation of a zip folder
*/
function buildZip() {
  const zipper = new Zip();
  zipper.addLocalFolder('/tmp/upload');
  const c = zipper.toBuffer();
  return c;
}

/**
  * @async
  * @desc deploys a new function with the given parameters
  * @method deployFunction
  * @param functionName name of the function to be deployed
  * @param zipContent a buffer representing the zip folder containing the files to be deployed
  * @return string - success/failure response
*/
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
    Timeout: 10,
  };

  try {
    return await lambda.createFunction(params).promise();
  } catch (err) {
    return err;
  }
}

/**
  * @async
  * @desc edits an existing function with the given parameters
  * @method editFunction
  * @param functionName name of the function to be edited
  * @param zipContent a buffer representing the zip folder containing the files to be deployed in the edited function
  * @return string - success/failure response
*/
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

/**
  * @async
  * @desc manages the deployment process after checking if it's a new deploy or an edit-deploy
  * @method deploy
  * @param event contains all the necessary information for the deployment/edit procedure
  * @param event.requestBuffer a hexadecimal representation of a JSON request
  * @param event.requestBuffer.sourceCode content of the source code file
  * @param event.requestBuffer.package content of the package file, present if event.requestBuffer.dep == true
  * @param event.requestBuffer.package_lock content of the package_lock file, present if event.requestBuffer.dep == true
  * @param event.requestBuffer.dep true if the deploying/editing a function with dependencies
  * @param event.functionName the name of the function to be deployed/edited
  * @param event.parametersCount the number of parameters required by the function
  * @param event.edit true if the request received is an edit request, false for deployment requests
  * @return string - success/failure response
*/
module.exports.deploy = async (event) => {
  // common for both deploy and edit
  const requestBuf = Buffer.from(event.requestBuffer);
  const requestJSON = JSON.parse(requestBuf.toString('utf8'));
  const dir = '/tmp/upload';
  // creates the folder that will keep the files to be used
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  // generates the files to be inserted into the Lambda Deployment package,
  // after having performed the specified management actions
  const fileContent = injectDefaultHandler(requestJSON.sourceCode.toString('utf8'), event.functionName, event.parametersCount);
  fs.writeFileSync('/tmp/upload/index.js', fileContent);
  if (requestJSON.dep === true) {
    fs.writeFileSync('/tmp/upload/package.json', requestJSON.package);
    fs.writeFileSync('/tmp/upload/package-lock.json', requestJSON.package_lock);
    execSync('npm install --no-bin-links', {
      cwd: '/tmp/upload/',
    });
  }
  // builds a Lambda Deployment package
  const zipContent = buildZip();
  // removes the previously created folder
  fs.removeSync('/tmp/upload');

  try {
    if (event.edit) {
      return await editFunction(event.functionName, zipContent);
    }
    return await deployFunction(event.functionName, zipContent);
  } catch (err) { return err; }
};
