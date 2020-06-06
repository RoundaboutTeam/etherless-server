import AwsManager from '../../src/aws/AwsManager';
import AwsConfig from '../../src/config/AwsConfig';

const manager = new AwsManager(new AwsConfig('', '', ''));

test('invokes a lambda function', () => {

});

test('lambda invocation throws error on non existing lambda', () => {

});

test('lambda invocation throws error on Lambda Error', () => {

});
