
const AWS = require('aws-sdk');

const Lambda = require('aws-sdk/clients/lambda');

const fs = require('fs-extra');

const Zip = require('adm-zip');

const { execSync } = require('child_process');

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
function buildZip() {
  const zipper = new Zip();
  zipper.addLocalFolder('/tmp/upload');
  const c = zipper.toBuffer();
  return c;
}

// deploys a new function with the given parameters
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
  const fixJSON = JSON.parse(fixBuffer.toString());
  const dir = '/tmp/upload';
  // creates the folder that will keep the files to be used
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  // generates the files to be inserted into the Lambda Deployment package,
  // after having performed the specified management actions
  const fileContent = injectDefaultHandler(fixJSON.sourceCode.toString('utf8'), event.functionName, event.parametersCount);
  fs.writeFileSync('/tmp/upload/index.js', fileContent);
  if (event.fixJSON.dep === true) {
    fs.writeFileSync('/tmp/upload/package.json', fixJSON.package);
    fs.writeFileSync('/tmp/upload/package-lock.json', fixJSON.package_lock);
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
