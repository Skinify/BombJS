import { AnimatedSprite, Rectangle } from "pixi.js";
import { Texture } from "@pixi/core";
import HitAreaShapes from "hitarea-shapes";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";
import HudEnums from "../enuns/resourcesEnuns/HudEnum";
import Player from "../physics/Player";
import PlayerEventsEnum from "../enuns/gameEnuns/PlayerEventsEnum";

class FlyButtonAsset extends AnimatedSprite implements IAsset {
  private _flyButtonSheet = {};
  private _player: Player;
  constructor(player: Player) {
    super([Texture.EMPTY]);
    this._player = player;
    this._flyButtonSheet = {};
    AssetsManager.Instance.LoadAssets([
      {
        key: HudEnums.FLY_BUTTON_SPRITESHEET,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FLY_BUTTON_SPRITESHEET}.png`,
      },
      {
        key: HudEnums.FLY_BUTTON_SPRITESHEET_HITAREA,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FLY_BUTTON_SPRITESHEET_HITAREA}.json`,
      },
    ])
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }
  OnLoad(args): void {
    let w = 67.25;
    let h = 76;

    let ssheet = args[HudEnums.FLY_BUTTON_SPRITESHEET].texture.baseTexture;
    const hitAreaShapes = new HitAreaShapes(
      args[HudEnums.FLY_BUTTON_SPRITESHEET_HITAREA].data
    );

    this.hitArea = hitAreaShapes;

    this._flyButtonSheet["HOVER"] = [
      new Texture(ssheet, new Rectangle(0, 0, w, h)),
    ];

    this._flyButtonSheet["NORMAL"] = [
      new Texture(ssheet, new Rectangle(1 * w, 0, w, h)),
    ];

    this._flyButtonSheet["DISABLED"] = [
      new Texture(ssheet, new Rectangle(2 * w, 0, w, h)),
    ];

    this._flyButtonSheet["PRESSED"] = [
      new Texture(ssheet, new Rectangle(3 * w, 0, w, h)),
    ];

    super.textures = this._flyButtonSheet["NORMAL"];
    this.buttonMode = true;
    this.interactive = true;
    this.animationSpeed = 0.6;
    this.loop = true;
    this.on("pointerover", () => {
      if (this._player.IsFly) super.textures = this._flyButtonSheet["DISABLED"];
      else super.textures = this._flyButtonSheet["HOVER"];
    });
    this.on("pointerout", () => {
      if (this._player.IsFly) super.textures = this._flyButtonSheet["DISABLED"];
      else super.textures = this._flyButtonSheet["NORMAL"];
    });
    this.on("pointerdown", () => {
      if (this._player.IsFly) super.textures = this._flyButtonSheet["DISABLED"];
      else {
        super.textures = this._flyButtonSheet["PRESSED"];
        this._player.IsFly = true;
      }
    });
    this.on("pointerup", () => {
      if (this._player.IsFly) super.textures = this._flyButtonSheet["DISABLED"];
      else super.textures = this._flyButtonSheet["NORMAL"];
    });
    this._player.on(PlayerEventsEnum.BEGIN_NEW_TURN, () => {
      super.textures = this._flyButtonSheet["NORMAL"];
    });
    this.play();
  }
  OnLoadError(args: any): void {
    console.log(args);
    throw new Error("Method not implemented.");
  }
}

export default FlyButtonAsset;
