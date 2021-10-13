import { Sprite } from "pixi.js";
import { BaseTexture, Texture } from "@pixi/core";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";
import HudEnums from "../enuns/resourcesEnuns/HudEnum";

class PlayerImageAsset extends Sprite implements IAsset {
  constructor() {
    super(Texture.EMPTY);
    AssetsManager.Instance.LoadAsset(
      HudEnums.PLAYER_IMAGE,
      `${paths.IMAGE_PATH}/hud/${HudEnums.PLAYER_IMAGE}.png`
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

export default PlayerImageAsset;
