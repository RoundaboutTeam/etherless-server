import EventData from './EventData';

class EventDispatcher {
    private callbacks: Array<any>;

    constructor() {
      this.callbacks = [];
    }

    public attach(callback: any): boolean {
      let exists = false;
      this.callbacks.forEach((cb) => {
        if (cb === callback) {
          exists = true;
        }
      });
      if (!exists) {
        this.callbacks.push(callback);
        return true;
      }
      return false;
    }

    public detach(callback: any): boolean {
      for (let i = 0; i < this.callbacks.length; i += 1) {
        if (this.callbacks[i] === callback) {
          this.callbacks.splice(i, 1);
          return true;
        }
      }
      return false;
    }

    public dispatch(data: EventData): void {
      this.callbacks.forEach((callback) => {
        callback(data);
      });
    }
}

export default EventDispatcher;
