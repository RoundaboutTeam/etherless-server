
const JSZip = require('jszip');

const AWS = require('aws-sdk');

const Lambda = require('aws-sdk/clients/lambda');

function injectDefaultHandler(content, functionName, parametersCount) {
  const p = 'const p = event.parameters;\n';
  let params = '';
  for (let i = 0; i < parametersCount; i += 1) {
    if (i !== 0) {
      params += ', ';
    }
    params += `p[${i}]`;
  }
  return `\nmodule.exports.defaultHandler = async event => {\n${p}return { message: ${functionName}(${params}) };\n}\n${content}`;
}

// returns a buffer reppresenting the zip folder
async function buildZip(content) {
  const zip = new JSZip();

  zip.file('index.js', content);
  const c = await zip.generateAsync({ type: 'nodebuffer' }).then((result) => result);
  return c;
}

module.exports.deploy = async (event) => {
  const fixBuffer = Buffer.from(event.fileBuffer.data);

  const fileContent = injectDefaultHandler(fixBuffer.toString('utf8'), event.functionName, event.parametersCount);
  const zipContent = await buildZip(fileContent);

  const params = {
    FunctionName: event.functionName,
    Code: {
      ZipFile: zipContent,
    },
    Handler: 'index.defaultHandler',
    Role: 'arn:aws:iam::817867361406:role/etherless-server',
    Runtime: 'nodejs12.x',
  };

  const lambda = new Lambda();

  try {
    return await lambda.createFunction(params).promise();
  } catch (err) {
    return err;
  }
};
