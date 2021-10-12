import { Rectangle, Sprite } from "pixi.js";
import { BaseTexture, ImageSource, Texture } from "@pixi/core";
import ForceMapAssetImage from "../../images/map/ForceMapAssetImage.png";
import MapEnum from "../enuns/resourcesEnuns/MapEnum";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import Ground from "../map/Ground";

class ForceMapAsset extends Ground implements IAsset {
  private _backgroundSprite: Sprite;
  constructor(width: number, height: number, digible: boolean) {
    let backgroundSprite = new Sprite(Texture.EMPTY);
    backgroundSprite.height = height;
    backgroundSprite.width = width;
    super(new Rectangle(0, 0, width, height), digible, backgroundSprite);
    this._backgroundSprite = backgroundSprite;
    super.width = width;
    super.height = height;
    this.addChild(this._backgroundSprite);
    AssetsManager.Instance.LoadAsset(
      MapEnum.MAP_01_FORCEMAP,
      ForceMapAssetImage
    )
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }

  get Width(): number {
    return this._width;
  }

  get Height(): number {
    return this._height;
  }

  OnLoad(args: { data: string | ImageSource }): void {
    this._backgroundSprite.texture = new Texture(BaseTexture.from(args.data));
    this.SetGroundTiles(
      this._backgroundSprite.texture.baseTexture.resource.source
    );
  }
  OnLoadError(args: any): void {
    throw new Error("Method not implemented.");
  }
}

export default ForceMapAsset;
