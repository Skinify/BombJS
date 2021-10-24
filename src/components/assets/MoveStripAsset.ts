import { Sprite } from "pixi.js";
import { BaseTexture, Texture } from "@pixi/core";
import IAsset from "./interface/IAsset";
import AssetsManager from "../managers/AssetsManager";
import GeneralEnum from "../enuns/resourcesEnuns/GeneralEnum";
import paths from "../../config/paths.json";

class MoveStripAsset extends Sprite implements IAsset {
  private _stripWidth: number = 500;
  private _staminaFill: Sprite;

  constructor() {
    super(Texture.EMPTY);
    this._staminaFill = new Sprite(Texture.EMPTY);
    AssetsManager.Instance.LoadAssets([
      {
        key: GeneralEnum.STAMINA_BAR,
        path: `${paths.IMAGE_PATH}/general/${GeneralEnum.STAMINA_BAR}.png`,
      },
      {
        key: GeneralEnum.STAMINA_BAR_FILL,
        path: `${paths.IMAGE_PATH}/general/${GeneralEnum.STAMINA_BAR_FILL}.png`,
      },
    ])
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }
  OnLoad(args): void {
    this.texture = new Texture(
      BaseTexture.from(args[GeneralEnum.STAMINA_BAR].data)
    );

    this._staminaFill.texture = new Texture(
      BaseTexture.from(args[GeneralEnum.STAMINA_BAR_FILL].data)
    );

    this._staminaFill.position.set(1, 1);

    this.addChild(this._staminaFill);
  }

  set StaminaBarSize(value: number) {
    this._staminaFill.scale.x = value;
  }

  OnLoadError(args: any): void {
    throw new Error("Method not implemented.");
  }

  public ForceChange(): void {
    this.texture._frame;
  }
}

export default MoveStripAsset;
