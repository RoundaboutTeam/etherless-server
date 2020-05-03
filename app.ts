import business from './src/app/business';
import init from './src/app/init';

// EVENTS
init.contract.on('runRequest', (funcname: string, param: string, id: string, event: any) => {
  console.log(`${'\nRun Request Received:' + '\nFunction Name: '}${funcname}\nid: ${id}`);

  const params = {
    FunctionName: `serverless-dev-${funcname}`,
    Payload: JSON.stringify({ parameters: JSON.stringify(param.split(',')) }),
  };

  init.lambda.invoke(params, (err: AWS.AWSError, data: AWS.Lambda.InvocationResponse) => {
    if (err) {
      console.log('Lambda Invocation Error: ', err);
      business.sendResponse(`An error occured. The function named ${funcname} was not run.`, id);
    } else if (data.Payload) {
      business.sendResponse(data.Payload.toString(), id);
    } else { business.sendResponse('Lambda invocation returned an empty response', id); }
  });
});

// serverless-cli functionality, used for testing
init.contract.on('response', (response: string, id: string) => {
  console.log(`\nCaptured response for CLI with id ${id} :\n${response}`);
});

// Test
(async function () {
  // await business.runFunction('mul', '3,-5');
  // business.printArray(await business.getList());
}());
