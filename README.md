# etherless-server

Module for Ethereum events listening and managing of calls to AWS Lambda functions.

## Instructions:
- run `npm install` to install the necessary dependencies;
- insert the configuration file, provided directly by our team, in the *configs* folder;
- run `npm start` to run a local version of the listener.

The listener is now up and running locally. It will capture function run requests, communicate with AWS Lambda and return the function invocation result to the caller.

## Deployment on AWS Elastic Beanstalk
In order to keep the Etherless-server module always active and running, it should be deployed on an AWS Elastic Beanstalk environment. To do that, you should:
- log into AWS and go to AWS Elastic Beanstalk;
- create a new application inside the EBS service;
- locally generate a .zip archive with the content of the *etherless-server* folder;
- deploy the zip archive as a new application version on EBS, which creates an EBS Node.js environment where your application will run;

## Deployment of the Lambda function deployer on AWS Lambda
In addition to this process, in order to allow the serverless deployment of new functions on the platform, you should deploy on AWS Lambda a deployer function. The content of the deployer function is stored inside the *serverless* folder in the Etherless-server directory. To deploy this function using the Serverless Framework you should:
- position yourself inside the *serverless* folder;
- run the `serverless` command;
- follow the prompt instructions to configure your AWS and Serverless account;
- run the `serverless deploy` command, which will use the already present `serverless.yml` configuration file, to perform the deployment on AWS Lambda.

