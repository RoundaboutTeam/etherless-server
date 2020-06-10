import AWS from 'aws-sdk';

class AwsConfig {
    public readonly awsKey: string;

    public readonly awsSecretKey: string;

    public readonly awsRegion: string;

    constructor(awsKey: string, awsSecretKey: any, awsRegion: string) {
      this.awsKey = awsKey;
      this.awsSecretKey = awsSecretKey;
      this.awsRegion = awsRegion;
    }

    createLambda(): AWS.Lambda {
      AWS.config.update({
        region: this.awsRegion,
        credentials: new AWS.Credentials(this.awsKey, this.awsSecretKey),
      });
      return new AWS.Lambda();
    }
}

export default AwsConfig;
