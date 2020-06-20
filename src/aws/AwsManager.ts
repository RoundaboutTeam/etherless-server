import AWS, { Lambda } from 'aws-sdk';
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
        const payload = JSON.parse(data.Payload);
        if (data.FunctionError) {
          return Promise.resolve(payload.errorMessage); // runtime exceptions are considered valid results
        } return Promise.resolve(payload.message);
      } catch (err) {
        return Promise.reject(new Error(err.message));
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
        const payload = JSON.parse(data.Payload);
        if (data.FunctionError) { // lambda deployer invocation error
          throw new Error(payload.errorMessage); // caught by next catch block
        } else if (payload.message) { // createFunction error in deployer
          throw new Error(payload.message); // caught by next catch block
        } return Promise.resolve(`${functionName} successfully deployed`);
      } catch (err) {
        return Promise.reject(new Error(err.message));
      }
    }

    /**
    * @async
    * @desc deletes a Lambda function using the given function name,
    * returning an asynchronous response or error message.
    * @method deleteLambda
    * @param functionName name of the function to be deleted.
    * @return Promise<string> - deletion success or error message.
    */
    async deleteLambda(functionName: string): Promise<string> {
      const parameters = {
        FunctionName: `etherless-server-dev-${functionName}`,
      };
      try {
        await this.lambda.deleteFunction(parameters).promise();
        return Promise.resolve(`${functionName} deleted successfully`);
      } catch (err) {
        return Promise.reject(new Error(`${functionName} could not be deleted`));
      }
    }

    /**
    * @async
    * @desc invokes the AWSDeployer Lambda function using the name and the content 
    * of the Lambda function to be edited, returning an asynchronous response or error message.
    * @method editLambda
    * @param functionName name of the function to be deployed.
    * @param parametersCount number of parameters required by the function.
    * @param fileBuffer Buffer containing a stringified version of the function to be deployed.
    * @return Promise<string> - edit success or error message.
    */
    async editLambda(functionName: string, parametersCount: number, fileBuffer: Buffer): Promise<string> {
      const parameters = {
        // the edit steps are very similar to the deployment steps, therefore the deployer is used in both cases
        FunctionName: 'etherless-server-dev-deploy',
        Payload: JSON.stringify({
          functionName: functionName,
          parametersCount: parametersCount,
          fileBuffer: fileBuffer,
          edit: true,
        }),
      };

      try {
        const data: any = await this.lambda.invoke(parameters).promise();
        const payload = JSON.parse(data.Payload);
        if (data.FunctionError) { // lambda deployer (with edit=true) invocation error
          throw new Error(payload.errorMessage); // caught by next catch block
        } else if (payload.message) { // updateFunctionCode error in deployer (with edit=true)
          throw new Error(payload.message); // caught by next catch block
        } return Promise.resolve(`${functionName} successfully edited`);
      } catch (err) {
        return Promise.reject(new Error(err.message));
      }
    }
}

export default AwsManager;
