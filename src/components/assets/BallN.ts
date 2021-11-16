import { BaseTexture, Rectangle, Sprite } from "pixi.js";
import { Dict } from "@pixi/utils";
import { AnimatedSprite, LoaderResource, Texture } from "pixi.js";
import IAsset from "./interface/IAsset";
import AssetsManager from "../managers/AssetsManager";
import AttackEnum from "../enuns/resourcesEnuns/AttackEnum";

class BallN extends AnimatedSprite implements IAsset {
  private _ball: Sprite;
  private _shape: Sprite;
  private _border: Sprite;
  constructor() {
    super([Texture.EMPTY]);
    this._ball = new Sprite(Texture.EMPTY);
    this._shape = new Sprite(Texture.EMPTY);
    this._border = new Sprite(Texture.EMPTY);
    let res = AssetsManager.Instance.GetPreloaded(AttackEnum.SPECIAL);
    this.textures = [new Texture(BaseTexture.from(res.data))];
    this.onComplete = () => (this.visible = false);
    this.pivot.set(this.width / 2, this.height / 2);
  }

  OnLoad(args: LoaderResource | Dict<LoaderResource>): void {
    throw new Error("Method not implemented.");
  }

  OnLoadError(args: any): void {
    throw new Error("Method not implemented.");
  }
}

export default BallN;
