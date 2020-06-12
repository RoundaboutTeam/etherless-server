import { BigNumber } from 'ethers/utils';
import EventDispatcher from '../event/EventDispatcher';
import RunEventData from '../event/RunEventData';
import DeployEventData from '../event/DeployEventData';

abstract class SmartManager {
    protected runEventDispatcher: EventDispatcher;

    protected deployEventDispatcher: EventDispatcher;

    constructor() {
      this.runEventDispatcher = new EventDispatcher();
      this.deployEventDispatcher = new EventDispatcher();
    }

    // sends a run result with a specific id to Etherless-smart
    abstract sendRunResult(response: string, id: BigNumber, error: boolean): void;

    // sends a deploy result to Etherless-smart
    abstract sendDeployResult(response: string, functionName: string, id: BigNumber, error: boolean): void;

    // allows callbacks to be subscribed to the run event dispatcher
    public onRun(callback: any) {
      return this.runEventDispatcher.attach(callback);
    }

    public onDeploy(callback: any) {
      return this.deployEventDispatcher.attach(callback);
    }

    // runs all callbacks in the run dispatcher callbasks array with data as parameter
    dispatchRunEvent(data: RunEventData) {
      this.runEventDispatcher.dispatch(data);
    }

    dispatchDeployEvent(data: DeployEventData) {
      this.deployEventDispatcher.dispatch(data);
    }
}

export default SmartManager;
