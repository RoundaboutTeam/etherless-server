const init = require('./init');
const business = require('./business');

// EVENT
/*
init.contract.on("runRequest", (funcname, param, id, event) => {
  console.log('\nRun Request Received:' + '\nFunction Name: ' + funcname + "\nid: " + id);

  const params = {
    FunctionName: "serverless-dev-" + funcname,
    Payload: JSON.stringify({"parameters": JSON.stringify(param.split(','))})
  };

  init.lambda.invoke(params, (err, data) => {
    if (err){
      console.log('Error: ', err);
      business.sendResponse("An error occured. The function named " + funcname + " was not run.", id);
    }
    else
      business.sendResponse(data.Payload.toString(), id);
  });
});*/

//serverless-cli functionality, used for testing
init.contract.on("response", (response, id) => {
  console.log('\nCaptured response for CLI with id ' + id + ' :\n' + response);
});

(async function() {
  await business.runFunction('mul', '3,-5', '7');
})();