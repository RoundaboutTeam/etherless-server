module.exports.buildDefaultTemplate = function buildDefaultTemplate(functionName, parametersNumber)
{
  const p = "const params = JSON.parse(event.parameters);\n";
  let params = '';
  for (let i = 0; i<parametersNumber; i++){
    if (i!=0) params+= ', ';
    params += 'params[' + i + ']'
  }
  return 'module.exports.defaultHandler = async event =>{\n' + p +  "return {message:" +  functionName + '(' + params + ')};\n}';
}