import EventProcessor from '../../src/facade/EventProcessor';
import EthereumSmartManager from '../../src/smart/EthereumSmartManager';
import ConfigUtilities from '../../src/config/ConfigUtilities';
import AwsManager from '../../src/aws/AwsManager';

const { assert } = require('chai');

const smartManager = new EthereumSmartManager(ConfigUtilities.getEthSmartConfig());
const awsManager = new AwsManager(ConfigUtilities.getAwsConfig());

const eventProcessor = new EventProcessor(smartManager, awsManager);

describe('EventProcessor', () => {
  it('is not null', () => {
    assert.isNotNull(eventProcessor, 'Event Processor is null.');
  });
});
