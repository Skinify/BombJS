import { Sprite } from "pixi.js";
import { BaseTexture, Texture } from "@pixi/core";
import MapEnum from "../enuns/resourcesEnuns/MapEnum";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";

class SmallMapAsset extends Sprite implements IAsset {
  constructor() {
    super(Texture.EMPTY);
    AssetsManager.Instance.LoadAsset(
      MapEnum.SMALL_MAP,
      `${paths.IMAGE_PATH}/map/${MapEnum.SMALL_MAP}.png`
    )
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }
  OnLoad(args): void {
    this.texture = new Texture(BaseTexture.from(args.data));
  }
  OnLoadError(args: any): void {
    throw new Error("Method not implemented.");
  }
}

export default SmallMapAsset;
