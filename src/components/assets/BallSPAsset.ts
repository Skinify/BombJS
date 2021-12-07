import { BaseTexture, Rectangle, Sprite } from "pixi.js";
import { Dict } from "@pixi/utils";
import { AnimatedSprite, LoaderResource, Texture } from "pixi.js";
import IAsset from "./interface/IAsset";
import AssetsManager from "../managers/AssetsManager";
import AttackEnum from "../enuns/resourcesEnuns/AttackEnum";

class BallSPAsset extends AnimatedSprite implements IAsset {
  private _ball: Sprite;
  private _shape: Sprite;
  private _border: Sprite;
  private _blast: AnimatedSprite;
  constructor() {
    super([Texture.EMPTY]);
    this._ball = new Sprite(Texture.EMPTY);
    this._shape = new Sprite(Texture.EMPTY);
    this._border = new Sprite(Texture.EMPTY);
    let ballAsset = AssetsManager.Instance.GetPreloaded(AttackEnum.BALL);
    this.textures = [new Texture(BaseTexture.from(ballAsset.data))];
    this.pivot.set(this.width / 2, this.height / 2);

    this._blast = new AnimatedSprite([Texture.EMPTY]);
    this._blast.loop = false;

    let ssheet = AssetsManager.Instance.GetPreloaded(
      AttackEnum.BOOM_SPRITESHEET
    );
    if (ssheet.texture) {
      let t = ssheet.texture.baseTexture;
      let h = 240;
      let w = 320;

      let c = 0;
      let spriteObj: Array<Texture> = [];
      while (true) {
        spriteObj.push(new Texture(t, new Rectangle(c * w, 0, w, h)));
        c++;
        if (c === 16) break;
      }

      this._blast.textures = spriteObj;
    }

    this.onComplete = () => (this.visible = false);
  }

  get Blast(): AnimatedSprite {
    return this._blast;
  }

  OnLoad(args: LoaderResource | Dict<LoaderResource>): void {
    throw new Error("Method not implemented.");
  }

  OnLoadError(args: any): void {
    throw new Error("Method not implemented.");
  }
}

export default BallSPAsset;
