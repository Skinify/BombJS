import { Rectangle, Sprite } from "pixi.js";
import { Dict } from "@pixi/utils";
import { AnimatedSprite, LoaderResource, Texture } from "pixi.js";
import IAsset from "./interface/IAsset";
import AssetsManager from "../managers/AssetsManager";
import AttackEnum from "../enuns/resourcesEnuns/AttackEnum";

class TSBallAsset extends AnimatedSprite implements IAsset {
  private _ball: Sprite;
  private _shape: Sprite;
  private _border: Sprite;
  private _blast: AnimatedSprite;
  constructor() {
    super([Texture.EMPTY]);
    this._ball = new Sprite(Texture.EMPTY);
    this._shape = new Sprite(Texture.EMPTY);
    this._border = new Sprite(Texture.EMPTY);
    let res = AssetsManager.Instance.GetPreloaded(AttackEnum.PLANE_SPRITESHEET);
    this.textures = [Texture.EMPTY];

    if (res.texture) {
      let spriteObj: Array<Texture> = [];
      let t = res.texture.baseTexture;
      let h = 52;
      let w = 264 / 4;
      for (let i = 0; i < 4; i++) {
        spriteObj.push(new Texture(t, new Rectangle(i * w, 0, w, h)));
      }
      this.textures = spriteObj;
    }

    this.onComplete = () => (this.visible = false);
    this.pivot.set(this.width / 2, this.height / 2);

    this._blast = new AnimatedSprite([Texture.EMPTY]);
    this._blast.loop = false;
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

export default TSBallAsset;
