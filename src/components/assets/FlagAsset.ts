import {
  AnimatedSprite,
  BaseTexture,
  Rectangle,
  Sprite,
  Texture,
} from "pixi.js";
import HudEnums from "../enuns/resourcesEnuns/HudEnum";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";
import GeneralEnum from "../enuns/resourcesEnuns/GeneralEnum";

class FlagAsset extends AnimatedSprite implements IAsset {
  private _flagSheet: {};
  constructor() {
    super([Texture.EMPTY]);
    this._flagSheet = {};
    AssetsManager.Instance.LoadAsset(
      GeneralEnum.FLAG_SPRITE_SHEET,
      `${paths.IMAGE_PATH}/general/${HudEnums.FLAG_SPRITE_SHEET}.png`
    )
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }

  OnLoad(args): void {
    let w = 73;
    let h = 101;
    this.scale.set(0.9, 0.9);
    let ssheet = BaseTexture.from(args.data);
    this._flagSheet["STAND"] = [
      new Texture(ssheet, new Rectangle(0, 0, w, h)),
      new Texture(ssheet, new Rectangle(1 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(2 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(3 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(4 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(5 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(6 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(7 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(8 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(9 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(10 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(11 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(12 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(13 * w, 0, w, h)),
    ];

    super.textures = this._flagSheet["STAND"];
    this.animationSpeed = 0.6;
    this.loop = true;
    this.play();
  }
  OnLoadError(args: any): void {
    console.log(args);
  }
}

export default FlagAsset;
