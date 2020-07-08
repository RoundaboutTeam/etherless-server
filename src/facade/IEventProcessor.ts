import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';
import DeleteEventData from '../event/DeleteEventData';
import EditEventData from '../event/EditEventData';

/**
  * @interface
  * @desc interface that provides processing methods for each type of event.
  * @uses RunEventData
  * @uses DeployEventData
  * @uses DeleteEventData
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

  /**
    * @abstract
    * @desc processes the given DeleteEventData object.
    * @method processDeleteEvent
    * @param data DeleteEventData class object, content of the request to be processed.
    * @return void - delete success or error message.
  */
  processDeleteEvent(data: DeleteEventData): void;

  /**
    * @abstract
    * @desc processes the given EditEventData object.
    * @method processEditEvent
    * @param data EditEventData class object, content of the request to be processed.
    * @return void - edit success or error message.
  */
  processEditEvent(data: EditEventData): void;
};
