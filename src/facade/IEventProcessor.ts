import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';

/**
  * @interface
  * @desc interface that provides processing methods for each type of event.
  * @uses RunEventData
  * @uses DeployEventData
*/
export default interface IEventProcessor {
  /**
    * @abstract
    * @desc processes the given RunEventData object.
    * @method processRunEvent
    * @param data RunEventData class object, content of the request to be processed.
    * @return void - run result or error message.
  */
  processRunEvent(data: RunEventData): void;

  /**
    * @abstract
    * @desc processes the given DeployEventData object.
    * @method processDeployEvent
    * @param data DeployEventData class object, content of the request to be processed.
    * @return void - deployment success or error message.
  */
  processDeployEvent(data: DeployEventData): void;
};
