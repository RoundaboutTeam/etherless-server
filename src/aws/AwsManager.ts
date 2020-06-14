import AWS, { Lambda } from 'aws-sdk';
import { rejects } from 'assert';

/**
  * @desc class used to communicate with AWS Services, particularly with AWS Lambda.
  * @attr lambda - service interface object used to interact with the AWS Lambda service.
  * @uses aws-sdk
*/
class AwsManager {
    private lambda: AWS.Lambda;

    constructor(lambda: AWS.Lambda) {
      this.lambda = lambda;
    }

    /**
    * @async
    * @desc invokes a Lambda function using the given function name and parameters,
    * returning an asynchronous response or error message.
    * @method invokeLambda
    * @param functionName name of the function to be invoked.
    * @param params parameters with which the function will be invoked.
    * @return Promise<string> - invocation result or error message.
    */
    async invokeLambda(functionName: string, params: Array<string>): Promise<string> {
      const parameters = {
        FunctionName: `etherless-server-dev-${functionName}`,
        Payload: JSON.stringify({ parameters: params }),
      };
      return this.invokeHelper(parameters);
    }

    /**
    * @async
    * @desc invokes the AWSDeployer Lambda function using the name and the content 
    * of the Lambda function to be deployed, returning an asynchronous response or error message.
    * @method deployLambda
    * @param functionName name of the function to be deployed.
    * @param parametersCount number of parameters required by the function.
    * @param fileBuffer Buffer containing a stringified version of the function to be deployed.
    * @return Promise<string> - deployment success or error message.
    */
    async deployFunction(functionName: string, parametersCount: number, fileBuffer: Buffer) {
      const parameters = {
        FunctionName: 'etherless-server-dev-deploy',
        Payload: JSON.stringify({
          functionName: functionName,
          parametersCount: parametersCount,
          fileBuffer: fileBuffer,
        }),
      };
      return this.invokeHelper(parameters);
    }

    /**
    * @async
    * @desc invokes a Lambda function using the given parameters,
    * returning aa promise that will either resolve or reject.
    * @method invokeHelper
    * @param parameters contains the name of the Lambda function to be invoked
    * and the parameters required
    * @return Promise<string> - invocation result or error message.
    */
    private async invokeHelper(parameters: any): Promise<string> {
      return new Promise((resolve, reject) => {
        this.lambda.invoke(parameters, (err, data: any) => {
          if (err) {
            reject(err.message);
          } else if (data.FunctionError) {
            const payload = JSON.parse(data.Payload);
            reject(`${payload.errorType}: ${payload.errorMessage}`);
          } else {
            resolve(data.Payload?.toString());
          }
        });
      });
    }
}

export default AwsManager;
