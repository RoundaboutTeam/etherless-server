import EventData from './EventData';

/**
  * @desc class which forwards a given EventData object to all the objects
  * that have subscribed to it.
  * @attr callbacks - array containing all the callbacks to be run when the dispatch method is
  * called.
  * @uses EventData
*/
class EventDispatcher {
    private callbacks: Array<any>;

    constructor() {
      this.callbacks = [];
    }

    /**
    * @desc inserts a new callback in the callbacks array.
    * @method attach
    * @param callback callback to be inserted into the callbacks array.
    * @return boolean - returns 'true' if the insertion was successful, 'false' otherwise.
    */
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

    /**
    * @desc removes a callback from the callbacks array.
    * @method detach
    * @param callback callback to be removed from the callbacks array.
    * @return boolean - returns 'true' if the removal was successful, 'false' otherwise.
    */
    public detach(callback: any): boolean {
      for (let i = 0; i < this.callbacks.length; i += 1) {
        if (this.callbacks[i] === callback) {
          this.callbacks.splice(i, 1);
          return true;
        }
      }
      return false;
    }

    /**
    * @desc forwards a given EventData to all the objects that have subscribed to it, through
    * the invocation of the callbacks provided in the callbacks array.
    * @method dispatch
    * @param data EventData object to be forwarded.
    * @return void
    */
    public dispatch(data: EventData): void {
      this.callbacks.forEach((callback) => {
        callback(data);
      });
    }
}

export default EventDispatcher;
