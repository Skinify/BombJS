import { Sprite } from "pixi.js";
import { BaseTexture, ImageSource, Texture } from "@pixi/core";
import BackMapAssetImage from "../../images/map/BackMapAssetImage.jpg";
import MapEnum from "../enuns/resourcesEnuns/MapEnum";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";

class BackMapAsset extends Sprite implements IAsset {
  constructor(width: number, height: number) {
    super(Texture.EMPTY);
    super.width = width;
    super.height = height;
    AssetsManager.Instance.LoadAsset(MapEnum.MAP_01_BACKMAP, BackMapAssetImage)
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
