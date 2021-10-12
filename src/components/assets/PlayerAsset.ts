import {
  BaseTexture,
  Rectangle,
  Texture,
  AnimatedSprite,
  ImageSource,
} from "pixi.js";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";
import GeneralEnum from "../enuns/resourcesEnuns/GeneralEnum";

class PlayerAsset extends AnimatedSprite implements IAsset {
  private _playerSheet: {};
  constructor() {
    super([Texture.EMPTY]);
    this._playerSheet = {};
    AssetsManager.Instance.LoadAsset(
      GeneralEnum.PLAYER_SPRITE_SHEET,
      `${paths.IMAGE_PATH}/general/${GeneralEnum.PLAYER_SPRITE_SHEET}.png`
    )
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }

  OnLoad(args): void {
    let w = 114;
    let h = 95;
    let ssheet = BaseTexture.from(args.data);
    this._playerSheet["STAND"] = [
      new Texture(ssheet, new Rectangle(1 * w, 0, w, h)),
    ];

    this._playerSheet["PREPARE"] = [
      new Texture(ssheet, new Rectangle(1 * w, 0, w, h)),
    ];

    this._playerSheet["WALK"] = [
      new Texture(ssheet, new Rectangle(2 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(2 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(3 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(4 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(5 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(6 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(7 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(8 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(9 * w, 0, w, h)),
    ];

    this._playerSheet["GHOST"] = [
      new Texture(ssheet, new Rectangle(11 * w, 2 * h, w, h)),
      new Texture(ssheet, new Rectangle(12 * w, 2 * h, w, h)),
    ];

    this._playerSheet["STOP"] = [
      new Texture(ssheet, new Rectangle(1 * w, 0, w, h)),
    ];
    this._playerSheet["SHOOT"] = [];

    super.textures = this._playerSheet["STAND"];
    this.animationSpeed = 0.3;
    this.loop = true;
    this.play();
  }

  OnLoadError(args): void {}

  GotoAndPlay(v: string) {
    super.textures = this._playerSheet[v];
    super.gotoAndPlay(0);
  }
}

export default PlayerAsset;
