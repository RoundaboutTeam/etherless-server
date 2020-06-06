class AwsManager {
  invokeLambda = jest.fn(async (functionName: string, params: Array<string>): Promise<string> => {
    if (functionName === 'existingName') return '15';
    throw (new Error('Resource not found/Fatal Error'));
  });
}

export default AwsManager;
