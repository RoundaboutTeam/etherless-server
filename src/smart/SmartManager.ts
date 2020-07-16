import { BigNumber } from 'ethers/utils';
import EventDispatcher from '../event/EventDispatcher';
import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';
import DeleteEventData from '../event/DeleteEventData';
import EditEventData from '../event/EditEventData';

/**
  * @abstract
  * @desc abstract class whose derivatives allow to listen to external events,
  * create processing requests and send responses to the external events source.
  * @attr runEventDispatcher - EventDispatcher object, used to dispatch run processing requests
  * represented by RunEventData objects.
  * @attr deployEventDispatcher - EventDispatcher object, used to dispatch deploy processing requests
  * represented by DeployEventData objects.
  * @attr deleteEventDispatcher - EventDispatcher object, used to dispatch delete processing requests
  * represented by DeleteEventData objects.
  * @attr editEventDispatcher - EventDispatcher object, used to dispatch edit processing requests
  * represented by EditEventData objects.
  * @uses ethers
  * @uses EventDispatcher
  * @uses DeployEventData
  * @uses RunEventData
  * @uses DeleteEventData
  * @uses EditEventData
*/
abstract class SmartManager {
    protected runEventDispatcher: EventDispatcher;

    protected deployEventDispatcher: EventDispatcher;

    protected deleteEventDispatcher: EventDispatcher;

    protected editEventDispatcher: EventDispatcher;

    constructor() {
      this.runEventDispatcher = new EventDispatcher();
      this.deployEventDispatcher = new EventDispatcher();
      this.deleteEventDispatcher = new EventDispatcher();
      this.editEventDispatcher = new EventDispatcher();
    }

    /**
      * @desc sends the result of a previously received run request back to the event source.
      * The response contains a message and useful request related information.
      * @method sendRunResult
      * @param response response message.
      * @param id request id.
      * @param success 'true' if the request was successful, 'false' otherwise.
      * @return void
    */
    abstract sendRunResult(response: string, id: BigNumber, success: boolean): void;

    /**
      * @desc sends the result of a previously received deploy request back to the event source.
      * The response contains a message and useful request related information.
      * @method sendDeployResult
      * @param response response message.
      * @param functionName name of the deployed function.
      * @param id request id.
      * @param success 'true' if the request was successful, 'false' otherwise.
      * @return void
    */
    abstract sendDeployResult(response: string, functionName: string, id: BigNumber, success: boolean): void;

    /**
      * @desc sends the result of a previously received delete request back to the event source.
      * The response contains a message and useful request related information.
      * @method sendDeleteResult
      * @param response response message.
      * @param functionName name of the deleted function.
      * @param id request id.
      * @param success 'true' if the request was successful, 'false' otherwise.
      * @return void
    */
   abstract sendDeleteResult(response: string, functionName: string, id: BigNumber, success: boolean): void;

   /**
     * @desc sends the result of a previously received edit request back to the event source.
     * The response contains a message and useful request related information.
     * @method sendEditResult
     * @param response response message.
     * @param functionName name of the edited function.
     * @param id request id.
     * @param success 'true' if the request was successful, 'false' otherwise.
     * @return void
   */
   abstract sendEditResult(response: string, functionName: string, signature: string, id: BigNumber, success: boolean): void;

   /**
      * @desc allows to subscribe a callback to the runDispatcher attribute.
      * @method onRun
      * @param callback callback to be subscribed.
      * @return void
    */
   public onRun(callback: any) {
     return this.runEventDispatcher.attach(callback);
   }

   /**
     * @desc allows to subscribe a callback to the deployDispatcher attribute.
     * @method onDeploy
     * @param callback callback to be subscribed.
     * @return void
   */
   public onDeploy(callback: any) {
     return this.deployEventDispatcher.attach(callback);
   }

   /**
      * @desc allows to subscribe a callback to the deleteDispatcher attribute.
      * @method onDelete
      * @param callback callback to be subscribed.
      * @return void
    */
   public onDelete(callback: any) {
     return this.deleteEventDispatcher.attach(callback);
   }

   /**
     * @desc allows to subscribe a callback to the editDispatcher attribute.
     * @method onEdit
     * @param callback callback to be subscribed.
     * @return void
   */
   public onEdit(callback: any) {
     return this.editEventDispatcher.attach(callback);
   }

   /**
      * @desc runs all callbacks in the run dispatcher callbacks array with data as parameter.
      * @method dispatchRunEvent
      * @param data RunEventData to be processed.
      * @return void
    */
   dispatchRunEvent(data: RunEventData) {
     this.runEventDispatcher.dispatch(data);
   }

   /**
      * @desc runs all callbacks in the deploy dispatcher callbacks array with data as parameter.
      * @method dispatchDeployEvent
      * @param data DeployEventData to be processed.
      * @return void
    */
   dispatchDeployEvent(data: DeployEventData) {
     this.deployEventDispatcher.dispatch(data);
   }

   /**
      * @desc runs all callbacks in the delete dispatcher callbacks array with data as parameter.
      * @method dispatchDeleteEvent
      * @param data DeleteEventData to be processed.
      * @return void
   */
   dispatchDeleteEvent(data: DeleteEventData) {
     this.deleteEventDispatcher.dispatch(data);
   }

   /**
      * @desc runs all callbacks in the edit dispatcher callbacks array with data as parameter.
      * @method dispatchEditEvent
      * @param data EditEventData to be processed.
      * @return void
   */
   dispatchEditEvent(data: EditEventData) {
     this.editEventDispatcher.dispatch(data);
   }
}

export default SmartManager;
