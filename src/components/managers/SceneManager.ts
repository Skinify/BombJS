import SceneEnum from "../enuns/gameEnuns/SceneEnum";
import Fight from "../scene/Fight";
import IScene from "../scene/interface/IScene";
import BaseManager from "./base/BaseManager";

class SceneManager extends BaseManager {
  protected static _instance: SceneManager | null;
  private _currentScene: IScene | null = null;
  private constructor() {
    super();
  }

  async Start(scene: SceneEnum): Promise<IScene> {
    let toStart: IScene | null = null;
    switch (scene) {
      case SceneEnum.FIGHT:
        toStart = new Fight();
        break;

      default:
        throw new Error("Scene não implementada");
    }
    if (toStart) {
      await toStart.Load();
      this.SceneLoaded(toStart);
      return toStart;
    } else {
      throw new Error("Erro ao carregar scena");
    }
  }

  async SceneLoaded(scene: IScene | null): Promise<void> {
    try {
      await this._currentScene?.Quit();
      this._currentScene = scene;
    } catch (ex) {
      console.log("Erro na transição de scena");
    }
  }

  static get Instance(): SceneManager {
    if (!this._instance) {
      this._instance = new SceneManager();
    }
    return this._instance;
  }
}

export default SceneManager;
