import { BigNumber } from 'ethers/utils';
import EventDispatcher from '../event/EventDispatcher';
import RunEventData from '../event/RunEventData';

abstract class SmartManager {
    protected runEventDispatcher: EventDispatcher;

    constructor() {
      this.runEventDispatcher = new EventDispatcher();
    }

    abstract sendRunResult(response: string, id: BigNumber, error: boolean): void;

    public onRun(callback: any) {
      return this.runEventDispatcher.attach(callback);
    }

    dispatchRunEvent(data: RunEventData) {
      this.runEventDispatcher.dispatch(data);
    }
}

export default SmartManager;
