class AwsConfig {
    public readonly awsKey: string;

    public readonly awsSecretKey: string;

    public readonly awsRegion: string;

    constructor(awsKey: string, awsSecretKey: any, awsRegion: string) {
      this.awsKey = awsKey;
      this.awsSecretKey = awsSecretKey;
      this.awsRegion = awsRegion;
    }
}

export default AwsConfig;
