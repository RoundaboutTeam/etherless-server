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

    async invokeLambda(functionName: string, params: Array<string>) {
      const parameters = {
        FunctionName: `serverless-dev-${functionName}`,
        Payload: JSON.stringify({ parameters: params }),
      };

      // check Promise Constructor anti-pattern
      return new Promise<string>((resolve, reject) => {
        (async () => {
          try {
            const response = await this.lambda.invoke(parameters).promise();
            if (response.Payload?.toString() === '') {
              resolve(`The function ${functionName} returned an empty response.`);
            } else resolve(response.Payload?.toString());
          } catch (err) {
            reject(new Error(`An Error occured. The function ${functionName} could not be run.`));
          }
        })();
      });
    }
}

export default AwsManager;
