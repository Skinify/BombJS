import { BaseTexture, Sprite } from "pixi.js";
import { Texture } from "@pixi/core";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";
import HudEnums from "../enuns/resourcesEnuns/HudEnum";
import PropEnum from "../enuns/resourcesEnuns/PropEnum";

class PropBarAsset extends Sprite implements IAsset {
  constructor() {
    super(Texture.EMPTY);
    AssetsManager.Instance.LoadAssets([
      {
        key: HudEnums.PROP_BAR,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.PROP_BAR}.png`,
      },
      {
        key: PropEnum.POWER_50,
        path: `${paths.IMAGE_PATH}/prop/${PropEnum.POWER_50}.png`,
      },
    ])
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }
  OnLoad(args): void {
    this.texture = new Texture(BaseTexture.from(args[HudEnums.PROP_BAR].data));
    let prop = new Sprite(
      new Texture(BaseTexture.from(args[PropEnum.POWER_50].data))
    );

    prop.interactive = true;
    prop.buttonMode = true;
    prop.position.set(5, 4);
    this.addChild(prop);
  }
  OnLoadError(args: any): void {
    console.log(args);
    throw new Error("Method not implemented.");
  }
}

export default PropBarAsset;
