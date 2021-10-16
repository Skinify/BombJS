import { Sprite } from "pixi.js";
import { BaseTexture, Texture } from "@pixi/core";
import IAsset from "./interface/IAsset";
import AssetsManager from "../managers/AssetsManager";
import GeneralEnum from "../enuns/resourcesEnuns/GeneralEnum";
import paths from "../../config/paths.json";

class TakeAimAsset extends Sprite implements IAsset {
  private _bar: Sprite;
  constructor() {
    super(Texture.EMPTY);
    this._bar = new Sprite();

    AssetsManager.Instance.LoadAssets([
      {
        key: GeneralEnum.AIM,
        path: `${paths.IMAGE_PATH}/general/${GeneralEnum.AIM}.png`,
      },
      {
        key: GeneralEnum.AIM_BAR,
        path: `${paths.IMAGE_PATH}/general/${GeneralEnum.AIM_BAR}.png`,
      },
    ])
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }
  OnLoad(args): void {
    this.texture = new Texture(BaseTexture.from(args[GeneralEnum.AIM].data));
    this._bar.texture = new Texture(
      BaseTexture.from(args[GeneralEnum.AIM_BAR].data)
    );
    this._bar.position.set(52, 40);
    this.addChild(this._bar);
  }

  RotateAim(v: number) {
    this._bar.angle = v * -1;
  }

  OnLoadError(args: any): void {
    throw new Error("Method not implemented.");
  }
}

export default TakeAimAsset;
