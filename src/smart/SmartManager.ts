import { BigNumber } from 'ethers/utils';
import EventDispatcher from '../event/EventDispatcher';

abstract class SmartManager {
    public readonly runEventDispatcher: EventDispatcher;

    public readonly deployEventDispatcher: EventDispatcher;

    public readonly editEventDispatcher: EventDispatcher;

    public readonly deleteEventDispatcher: EventDispatcher;

    constructor() {
      this.runEventDispatcher = new EventDispatcher();
      this.deployEventDispatcher = new EventDispatcher();
      this.editEventDispatcher = new EventDispatcher();
      this.deleteEventDispatcher = new EventDispatcher();
    }

    abstract sendResponse(response: string, id: BigNumber): void;

    abstract sendError(response: string, id: any): void;
}

export default SmartManager;
