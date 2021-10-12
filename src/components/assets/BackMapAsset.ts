import { Sprite } from "pixi.js";
import { BaseTexture, ImageSource, Texture } from "@pixi/core";
import MapEnum from "../enuns/resourcesEnuns/MapEnum";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";

class BackMapAsset extends Sprite implements IAsset {
  constructor(width: number, height: number) {
    super(Texture.EMPTY);
    super.width = width;
    super.height = height;
    AssetsManager.Instance.LoadAsset(
      MapEnum.MAP_01_BACKMAP,
      `${paths.IMAGE_PATH}/map/${MapEnum.MAP_01_BACKMAP}.jpg`
    )
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }
  OnLoad(args: { data: string | ImageSource }): void {
    this.texture = new Texture(BaseTexture.from(args.data));
  }
  OnLoadError(args: any): void {
    throw new Error("Method not implemented.");
  }
}

export default BackMapAsset;
