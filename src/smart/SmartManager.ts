import { BigNumber } from 'ethers/utils';
import EventDispatcher from '../event/EventDispatcher';
import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';

/**
  * @abstract
  * @desc abstract class whose derivatives allow to listen to external events,
  * create processing requests and send responses to the external events source.
  * @attr runEventDispatcher - EventDispatcher object, used to dispatch run processing requests
  * represented by RunEventData objects.
  * @attr runDeployDispatcher - EventDispatcher object, used to dispatch deploy processing requests
  * represented by DeployEventData objects.
  * @uses ethers
  * @uses EventDispatcher
  * @uses DeployEventData
  * @uses RunEventData
*/
abstract class SmartManager {
    protected runEventDispatcher: EventDispatcher;

    protected deployEventDispatcher: EventDispatcher;

    constructor() {
      this.runEventDispatcher = new EventDispatcher();
      this.deployEventDispatcher = new EventDispatcher();
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
    abstract sendRunResult(response: string, id: BigNumber, error: boolean): void;

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
    abstract sendDeployResult(response: string, functionName: string, id: BigNumber, error: boolean): void;

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
}

export default SmartManager;
