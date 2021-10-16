import { Sprite } from "pixi.js";
import { Dict } from "@pixi/utils";
import { AnimatedSprite, LoaderResource, Texture } from "pixi.js";
import IAsset from "./interface/IAsset";
class BallSPAsset extends AnimatedSprite implements IAsset {
  private _ball: Sprite;
  private _shape: Sprite;
  private _border: Sprite;
  private _boon: Sprite;
  constructor() {
    super([Texture.EMPTY]);
    this._ball = new Sprite(Texture.EMPTY);
    this._shape = new Sprite(Texture.EMPTY);
    this._border = new Sprite(Texture.EMPTY);
    this._boon = new Sprite(Texture.EMPTY);
  }
  OnLoad(args: LoaderResource | Dict<LoaderResource>): void {
    throw new Error("Method not implemented.");
  }
  OnLoadError(args: any): void {
    throw new Error("Method not implemented.");
  }
}

export default BallSPAsset;
