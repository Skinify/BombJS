import { BaseTexture, LoaderResource, Sprite, Texture } from "pixi.js";
import HudEnums from "../enuns/resourcesEnuns/HudEnum";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";

class HudAsset extends Sprite implements IAsset {
  constructor() {
    super();
    AssetsManager.Instance.LoadAssets([
      {
        key: HudEnums.RIGHT_BAR,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.RIGHT_BAR}.png`,
      },
      {
        key: HudEnums.LEFT_BAR,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.LEFT_BAR}.png`,
      },
    ])
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }
  OnLoad(args: any): void {
    this.addChild(new Sprite(args[HudEnums.RIGHT_BAR].texture));
    this.addChild(new Sprite(args[HudEnums.LEFT_BAR].texture));
  }
  OnLoadError(args: any): void {
    console.log(args);
  }
}

export default HudAsset;
