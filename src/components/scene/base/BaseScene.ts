import { Container } from "@pixi/display";
import AssetLoadEventEnum from "../../enuns/gameEnuns/AssetLoadEventEnum";
import IScene from "../interface/IScene";

abstract class BaseScene extends Container implements IScene {
  private _loadingResources: number;
  private _loadedResources: number;
  private _loaded: boolean;
  protected constructor() {
    super();
    this._loaded = false;
    this._loadedResources = 0;
    this._loadingResources = 0;
    self.addEventListener(AssetLoadEventEnum.START_LOADING, () => {
      this._loadingResources++;
    });
    self.addEventListener(AssetLoadEventEnum.FINISHED_LOADING, () => {
      this._loadedResources++;
      if (this._loadedResources == this._loadingResources) this._loaded = true;
    });
  }

  Load(): Promise<void> {
    return new Promise((resolve, rej) => {
      setInterval(() => {
        if (this._loaded) {
          resolve();
        }
      }, 10);
    });
  }

  Enter(): Container {
    return this;
  }

  Quit(): Promise<void> {
    return new Promise((resolve, rej) => resolve());
  }
}

export default BaseScene;
