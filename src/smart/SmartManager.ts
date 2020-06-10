import { BigNumber } from 'ethers/utils';
import EventDispatcher from '../event/EventDispatcher';
import RunEventData from '../event/RunEventData';

abstract class SmartManager {
    protected runEventDispatcher: EventDispatcher;

    constructor() {
      this.runEventDispatcher = new EventDispatcher();
    }

    // sends a run result with a specific id to Etherless-smart
    abstract sendRunResult(response: string, id: BigNumber, error: boolean): void;

    // allows callbacks to be subscribed to the run event dispatcher
    public onRun(callback: any) {
      return this.runEventDispatcher.attach(callback);
    }

    // runs all callbacks in the run dispatcher callbasks array with data as parameter
    dispatchRunEvent(data: RunEventData) {
      this.runEventDispatcher.dispatch(data);
    }
}

export default SmartManager;
