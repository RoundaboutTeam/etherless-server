import AWS from 'aws-sdk';
import AwsConfig from '../config/AwsConfig';

class AwsManager {
    private lambda: AWS.Lambda;

    constructor(config: AwsConfig) {
      AWS.config.update({
        region: config.awsRegion,
        credentials: new AWS.Credentials(config.awsKey, config.awsSecretKey),
      });
      this.lambda = new AWS.Lambda();
    }

    async invokeLambda(functionName: string, params: Array<string>): Promise<string> {
      const parameters = {
        FunctionName: `serverless-dev-${functionName}`,
        Payload: JSON.stringify({ parameters: params }),
      };
      try {
        const data: any = await this.lambda.invoke(parameters).promise();
        // runtime error in developer's code
        if (data.FunctionError !== undefined && data.Payload !== undefined) {
          throw (new Error('Runtime Error: ' + JSON.parse(data.Payload).errorMessage));
        }
        return data.Payload;
      } catch (err) { // lambda error, i.e. functionNotFound
        if (err.code !== undefined) {
          throw (new Error('Fatal: ' + err.code));
        } else {
          throw (new Error('Fatal: Lambda function could not be run.'));
        }
      }
    }
}

export default AwsManager;
