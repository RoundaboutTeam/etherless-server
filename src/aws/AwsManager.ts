import AWS from 'aws-sdk';

class AwsManager {
    private lambda: AWS.Lambda;

    constructor(lambda: AWS.Lambda) {
      this.lambda = lambda;
    }

    async invokeLambda(functionName: string, params: Array<string>): Promise<string> {
      const parameters = {
        FunctionName: `serverless-dev-${functionName}`,
        Payload: JSON.stringify({ parameters: params }),
      };
      try {
        const data: any = await this.lambda.invoke(parameters).promise();
        // runtime error in developer's code
        if (data.FunctionError) {
          throw ({ code: data.Payload.errorMessage }); // catched by the next catch block
        }
        return Promise.resolve(data.Payload);
      } catch (err) { // lambda error, i.e. ResourceNotFound
        if (err.code !== undefined) {
          return Promise.reject(new Error('Error Code: ' + err.code));
        }
        return Promise.reject(new Error('Fatal: Lambda function could not be run.'));
      }
    }
}

export default AwsManager;
