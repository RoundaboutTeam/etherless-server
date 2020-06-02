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
          return 'Runtime Error: ' + JSON.parse(data.Payload).errorMessage;
        }
        return data.Payload;
      } catch (err) { // lambda error, i.e. functionNotFound
        return 'Fatal: ' + err.code;
      }
    }
}

export default AwsManager;
