# Etherless-server

Module for Ethereum events listening and managing of calls to AWS Lambda functions.

## Instructions:
- run `npm install` to install the necessary dependencies;
- insert the configuration files, provided directly by our team, in the *configs* folder;
- run `npm start` to run a local version of the listener.

The listener is now up and running locally. It will capture function run requests, communicate with AWS Lambda and return the function invocation result to the caller.

## Ethereum, AWS, IPFS Configurations and contract ABI
Any developer who might want to work with a local version of Etherless-server, and can't contact our team to get the configuration files, should create an `AWSconfig.json` file structured as follows:
`{
		"awsKey": <<insert AWS key>>, 
		"awsSecretKey": <<insert AWS secret key>>, 
		"awsRegion": <<insert AWS region>> 
}`
To interact with the contracts on the Ethereum blockchain, a `smartConfig.json` file should be created with the following structure:
`{
	"walletAddress": <<insert wallet address>>, 
	"privateKey": <<insert private key>>, 
	"contractAddress": <<insert contract address>>, 
	"networkName": <<insert network name>> 
}`
To interact with IPFS, using the `ipfs-mini` API, an `ipfsConfig.json` file should be created with the following structure:
`{
    "host": "ipfs.infura.io",
    "port": 5001,
    "protocol": "https"
}`
And lastly, the code needs the ABI of the smart contract it will interact with. An `abi.json` file containing the Etherless-smart contract ABI should then be created.
The parameters within angular brackets should be replaced with the actual credentials and all the files be moved to the *Config* directory inside Etherless-server.

## Deployment on AWS Elastic Beanstalk
In order to keep the Etherless-server module always active and running, it should be deployed on an AWS Elastic Beanstalk environment. To do that, you should:
- log into AWS and go to AWS Elastic Beanstalk;
- create a new application inside the EBS service;
- locally generate a .zip archive with the content of the *etherless-server* folder;
- deploy the zip archive as a new application version on EBS, which creates an EBS Node.js environment where your application will run.

## Deployment of the Lambda function deployer on AWS Lambda
In addition to this process, in order to allow the serverless deployment of new functions on the platform, you should deploy on AWS Lambda a deployer function. The content of the deployer function is stored inside the *serverless* folder in the Etherless-server directory. To deploy this function using the Serverless Framework you should:
- position yourself inside the *serverless* folder;
- run the `serverless` command;
- follow the prompt instructions to configure your AWS and Serverless account;
- run the `serverless deploy` command, which will use the already present `serverless.yml` configuration file, to perform the deployment on AWS Lambda.

