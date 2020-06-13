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
      try {
        const data: any = await this.lambda.invoke(parameters).promise();
        // runtime error in developer's code
        if (data.FunctionError) {
        // caught by the next catch block
          throw ({ code: data.Payload.errorMessage });
        }
        return Promise.resolve(data.Payload);
      } catch (err) {
        // lambda error, i.e. ResourceNotFound
        if (err.code !== undefined) {
          return Promise.reject(new Error(`Error Code: ${err.code}`));
        }
        return Promise.reject(new Error('Fatal: Lambda function could not be run.'));
      }
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

      try {
        const data: any = await this.lambda.invoke(parameters).promise();
        // runtime error in developer's code
        if (data.FunctionError) {
          throw ({ code: data.Payload.errorMessage }); // caught by the next catch block
        }
        return Promise.resolve(data.Payload);
      } catch (err) {
        // lambda error, i.e. ResourceNotFound
        if (err.code !== undefined) {
          return Promise.reject(new Error(`Error Code: ${err.code}`));
        }
        return Promise.reject(new Error('Fatal: Lambda function could not be deployed.'));
      }

      /*
      this.lambda.invoke(parameters, (err: AWS.AWSError, data:AWS.Lambda.InvocationResponse) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
      */
    }
}

export default AwsManager;
