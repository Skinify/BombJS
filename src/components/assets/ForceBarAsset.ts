import { BaseTexture, Sprite, Texture } from "pixi.js";
import HudEnums from "../enuns/resourcesEnuns/HudEnum";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";
import PlayerEventsEnum from "../enuns/gameEnuns/PlayerEventsEnum";
import Player from "../physics/Player";

class ForceBarAsset extends Sprite implements IAsset {
  private _forceMarker: Sprite;
  private _force: any;
  private _forceTrace: any;
  private _player: Player;
  private _recordeWidth: any;
  private _teste : number;
  constructor(player : Player) {
    super(Texture.EMPTY);
    this._forceMarker = new Sprite(Texture.EMPTY);
    this._player = player;
    this._teste = 0;
    AssetsManager.Instance.LoadAssets([
      {
        key: HudEnums.FORCE_BAR,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FORCE_BAR}.png`,
      },
      {
        key: HudEnums.FORCE_METER,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FORCE_METER}.png`,
      },
      {
        key: HudEnums.FORCE,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FORCE}.png`,
      },
      {
        key: HudEnums.FORCE_TRACE,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FORCE_TRACE}.png`,
      },
      {
        key: HudEnums.FORCE_MARKER,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FORCE_MARKER}.png`,
      },
    ])
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }

  OnLoad(args): void {
    this.texture = new Texture(BaseTexture.from(args[HudEnums.FORCE_BAR].data));

    let forceMeter = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.FORCE_METER].data))
    );

    forceMeter.on("click", (e) => {
      this._forceMarker.visible = true;
      this._forceMarker.x = e.data.global.x - 72;
    });
    forceMeter.buttonMode = true;
    forceMeter.interactive = true;

    this._force = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.FORCE].data))
    );

    this._forceTrace = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.FORCE_TRACE].data))
    );

    this._forceMarker = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.FORCE_MARKER].data))
    );

    this._forceMarker.position.set(200, 26);
    this._forceMarker.visible = false

    forceMeter.position.set(84, 37);
    this._force.position.set(84, 38);
    this._forceTrace.position.set(84, 38);
    this._force.width = 100;
    this._forceTrace.width = 250;

    this.addChild(this._forceTrace);
    this.addChild(this._force);
    this.addChild(forceMeter);
    this.addChild(this._forceMarker);
  
    this._player.on(
      PlayerEventsEnum.BEGIN_NEW_TURN,
      this._BeginNewTurn.bind(this)
    );

    this._player.on(
      PlayerEventsEnum.FORCE_CHANGED,
      this._ForceChanged.bind(this)
    );

  }
  OnLoadError(args: any): void {
    console.log(args);
  }

  _BeginNewTurn() : void {
    this._force.width = 0;
    this._forceTrace.width =  this._recordeWidth;
    
  }

  _ForceChanged() : void {
    this._force.width = Math.ceil(500 / Player.FORCE_MAX * this._player.Force);
     if(this._player.IsAttacking)
     {
        this._recordeWidth = this._force.width;
     }
  }

}

export default ForceBarAsset;
