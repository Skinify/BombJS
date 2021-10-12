import BaseManager from "./base/BaseManager";
import { Loader, LoaderResource } from "pixi.js";
import AssetLoadEventEnum from "../enuns/gameEnuns/AssetLoadEventEnum";
import AssetLoadEvent from "../events/AssetLoadEvent";
import { Dict } from "@pixi/utils";

class AssetsManager extends BaseManager {
  private _loadedAssets: { [key: string]: LoaderResource };
  protected static _instance: AssetsManager | null;
  private constructor() {
    super();
    this._loadedAssets = {};
  }

  static get Instance(): AssetsManager {
    if (!this._instance) {
      this._instance = new AssetsManager();
    }
    return this._instance;
  }

  LoadAsset(key: string, path: string): Promise<LoaderResource> {
    dispatchEvent(new AssetLoadEvent(AssetLoadEventEnum.START_LOADING));
    let loader = new Loader();

    if (this._loadedAssets[key]) {
      dispatchEvent(new AssetLoadEvent(AssetLoadEventEnum.FINISHED_LOADING));
      return new Promise((resolve) => resolve(this._loadedAssets[key]));
    } else {
      return new Promise((resolve, reject) => {
        loader.add(key, path);
        loader.onError.add((x) => reject(x));
        loader.onComplete.add((loader, resources) => {
          dispatchEvent(
            new AssetLoadEvent(AssetLoadEventEnum.FINISHED_LOADING)
          );
          resolve(resources[key]);
        });
        loader.load();
      });
    }
  }

  LoadAssets(
    toLoad: Array<{ key: string; path: string }>
  ): Promise<Dict<LoaderResource>> {
    dispatchEvent(new AssetLoadEvent(AssetLoadEventEnum.START_LOADING));
    let loadedAssets = {};
    let loader = new Loader();

    for (let i = 0; i < toLoad.length; i++) {
      if (this._loadedAssets[toLoad[i].key]) {
        loadedAssets[toLoad[i].key] = this._loadedAssets[toLoad[i].key];
        toLoad = toLoad.filter((x) => x === toLoad[i]);
      }
    }

    if (toLoad.length === 0) {
      dispatchEvent(new AssetLoadEvent(AssetLoadEventEnum.FINISHED_LOADING));
      return new Promise((resolve) => resolve(loadedAssets));
    } else {
      return new Promise((resolve, reject) => {
        for (let i = 0; i < toLoad.length; i++) {
          loader.add(toLoad[i].key, toLoad[i].path);
        }
        loader.onError.add((x) => reject(x));
        loader.onComplete.add((loader, resources) => {
          dispatchEvent(
            new AssetLoadEvent(AssetLoadEventEnum.FINISHED_LOADING)
          );
          resolve(resources);
        });
        loader.load();
      });
    }
  }
}

export default AssetsManager;
