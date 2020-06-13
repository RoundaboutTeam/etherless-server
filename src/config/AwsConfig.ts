import AWS from 'aws-sdk';

/**
  * @desc class containing the configurations used to communicate with the AWS, allowing
  * the creation of instances of said services using the aws-sdk library.
  * @attr awsKey - string containing the key to access the AWS account used to communicate with AWS.
  * @attr awsSecretKey - string containing the secret key to access the AWS account
  * used to communicate with AWS.
  * @attr awsRegion - string specifying on which region AWS will operate.
  * @uses aws-sdk
*/

class AwsConfig {
    public readonly awsKey: string;

    public readonly awsSecretKey: string;

    public readonly awsRegion: string;

    constructor(awsKey: string, awsSecretKey: any, awsRegion: string) {
      this.awsKey = awsKey;
      this.awsSecretKey = awsSecretKey;
      this.awsRegion = awsRegion;
    }

    /**
    * @desc sets the current AWS confguration to the ones contained in the AWSConfig object,
    * and returns an instance of a Lambda service interface object.
    * @method createLambda
    * @return AWS.Lambda - instance of a Lambda service interface object.
    */
    createLambda(): AWS.Lambda {
      AWS.config.update({
        region: this.awsRegion,
        credentials: new AWS.Credentials(this.awsKey, this.awsSecretKey),
      });
      return new AWS.Lambda();
    }
}

export default AwsConfig;
