import BaseAction from "../actions/base/BaseAction";
import BaseManager from "./base/BaseManager";

class ActionManager extends BaseManager {
  protected static _instance: ActionManager | null;
  private _queue: Array<BaseAction>;
  private constructor() {
    super();
    this._queue = [];
  }

  static get Instance(): ActionManager {
    if (!this._instance) {
      this._instance = new ActionManager();
    }
    return this._instance;
  }

  Act(action: BaseAction): boolean {
    console.log(action)
    var c: BaseAction | null = null;
    for (var i: number = 0; i < this._queue.length; i++) {
      c = this._queue[i];
      if (c.Connect(action)) {
        return false;
      }
      if (c.CanReplace(action)) {
        action.Prepare();
        this._queue[i] = action;
        return true;
      }
    }
    this._queue.push(action);
    if (this._queue.length == 1) {
      action.Prepare();
    }
    return true;
  }

  Execute(): void {
    var c: BaseAction | null = null;
    if (this._queue.length > 0) {
      c = this._queue[0];
      if (!c.IsFinished) {
        c.Execute();
      }
      if (c.IsFinished) {
        this._queue.shift();
        if (this._queue.length > 0) {
          this._queue[0].Prepare();
        }
      }
    }
  }

  get ActionCount(): number {
    return this._queue.length;
  }
}

export default ActionManager;
