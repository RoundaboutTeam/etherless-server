import EventData from './EventData';

class EventDispatcher {
    private callbacks: Array<any>;

    constructor() {
      this.callbacks = [];
    }

    public attach(callback: any): void {
      this.callbacks.push(callback);
    }

    public detach(callback: any): void {
      for (let i = 0; i < this.callbacks.length; i += 1) {
        if (this.callbacks[i] === callback) {
          this.callbacks.splice(i, 1);
          return;
        }
      }
    }

    public dispatch(data: EventData): void {
      this.callbacks.forEach((callback) => {
        callback(data);
      });
    }
}

export default EventDispatcher;
