# etherless-server

Module for Ethereum events listening and managing of calls to AWS lambda functions.

## Instructions:
- run `npm install` to install the necessary dependencies;
- insert the configuration file, provided directly by our team, in the *configs* folder;
- run `npm start` to run the listener;

The listener is now up and running. It will capture function run requests, communicate with AWS Lambda and return the function invocation result to the caller.
