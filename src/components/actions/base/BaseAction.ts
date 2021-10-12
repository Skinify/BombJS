abstract class BaseAction {
  protected _isFinished: boolean;
  constructor() {
    this._isFinished = false;
  }

  CanReplace(actions: BaseAction): boolean {
    return false;
  }

  Execute(): void {
    this._isFinished = true;
  }

  Prepare(): void {}

  ExecuteAtOnce(): void {}

  Connect(action: BaseAction): boolean {
    return false;
  }

  get IsFinished(): boolean {
    return this._isFinished;
  }
}

export default BaseAction;
