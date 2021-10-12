abstract class BaseManager {
  protected static _instance: BaseManager | null;
  static get Instance(): BaseManager | null {
    if (!this._instance) throw "Erro";
    return this._instance;
  }
}

export default BaseManager;
