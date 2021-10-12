import { Sprite } from "pixi.js";
import { BaseTexture, Texture } from "@pixi/core";
import IAsset from "./interface/IAsset";
import AssetsManager from "../managers/AssetsManager";
import GeneralEnum from "../enuns/resourcesEnuns/GeneralEnum";
import paths from "../../config/paths.json";

class MoveStripAsset extends Sprite implements IAsset {
  constructor() {
    super(Texture.EMPTY);
    AssetsManager.Instance.LoadAsset(
      GeneralEnum.STAMINA_BAR,
      `${paths.IMAGE_PATH}/general/${GeneralEnum.STAMINA_BAR}.png`
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

export default MoveStripAsset;
