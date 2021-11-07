import { BaseTexture, Sprite } from "pixi.js";
import { Dict } from "@pixi/utils";
import { AnimatedSprite, LoaderResource, Texture } from "pixi.js";
import IAsset from "./interface/IAsset";
import AssetsManager from "../managers/AssetsManager";
import AttackEnum from "../enuns/resourcesEnuns/AttackEnum";
import paths from "../../config/paths.json";

class BallSPAsset extends AnimatedSprite implements IAsset {
  private _ball: Sprite;
  private _shape: Sprite;
  private _border: Sprite;
  private _boon: AnimatedSprite;
  constructor() {
    super([Texture.EMPTY]);
    this._ball = new Sprite(Texture.EMPTY);
    this._shape = new Sprite(Texture.EMPTY);
    this._border = new Sprite(Texture.EMPTY);
    this._boon = new AnimatedSprite([Texture.EMPTY]);
    let ballAsset = AssetsManager.Instance.GetPreloaded(AttackEnum.BALL)
    this.texture = new Texture(BaseTexture.from(ballAsset.data));
  }
  OnLoad(args: LoaderResource | Dict<LoaderResource>): void {
    this.texture = new Texture(BaseTexture.from(args[AttackEnum.BALL].data));
  }
  
  OnLoadError(args: any): void {
    throw new Error("Method not implemented.");
  }
}

export default BallSPAsset;
