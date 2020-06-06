import { BigNumber } from 'ethers/utils';
import EventDispatcher from '../event/EventDispatcher';
import RunEventData from '../event/RunEventData';

abstract class SmartManager {
    protected runEventDispatcher: EventDispatcher;

    protected deployEventDispatcher: EventDispatcher;

    protected editEventDispatcher: EventDispatcher;

    protected deleteEventDispatcher: EventDispatcher;

    constructor() {
      this.runEventDispatcher = new EventDispatcher();
      this.deployEventDispatcher = new EventDispatcher();
      this.editEventDispatcher = new EventDispatcher();
      this.deleteEventDispatcher = new EventDispatcher();
    }

    abstract sendResponse(response: string, id: BigNumber): void;

    abstract sendError(response: string, id: any): void;

    public onRun(callback: any) {
      this.runEventDispatcher.attach(callback);
    }

    public onDeploy(callback: any) {
      this.deployEventDispatcher.attach(callback);
    }

    public onEdit(callback: any) {
      this.editEventDispatcher.attach(callback);
    }

    public onDelete(callback: any) {
      this.deleteEventDispatcher.attach(callback);
    }

    dispatchRunEvent(data: RunEventData) {
      this.runEventDispatcher.dispatch(data);
    }

    dispatchDeployEvent(data: RunEventData) {
      this.deployEventDispatcher.dispatch(data);
    }

    dispatchEditEvent(data: RunEventData) {
      this.editEventDispatcher.dispatch(data);
    }

    dispatchDeleteEvent(data: RunEventData) {
      this.deleteEventDispatcher.dispatch(data);
    }
}

export default SmartManager;
