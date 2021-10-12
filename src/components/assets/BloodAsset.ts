import { Sprite } from "pixi.js";
import { BaseTexture, Texture } from "@pixi/core";
import paths from "../../config/paths.json";
import IAsset from "./interface/IAsset";
import AssetsManager from "../managers/AssetsManager";
import GeneralEnum from "../enuns/resourcesEnuns/GeneralEnum";

class BloodAsset extends Sprite implements IAsset {
  constructor() {
    super(Texture.EMPTY);
    AssetsManager.Instance.LoadAsset(
      GeneralEnum.BLOOD_BAR,
      `${paths.IMAGE_PATH}/general/${GeneralEnum.BLOOD_BAR}.png`
    )
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }
  OnLoad(args: any): void {
    this.texture = new Texture(BaseTexture.from(args.data));
  }
  OnLoadError(args: any): void {
    throw new Error("Method not implemented.");
  }
}

export default BloodAsset;
