import { Container } from "@pixi/display";
import TrainerMap from "../map/TrainerMap";
import Player from "../physics/Player";
import PlayerEventsEnum from "../enuns/gameEnuns/PlayerEventsEnum";
import HudView from "../view/HudView";
import KeyboardEvent from "../events/KeyboardEvent";
import KeyboardKeysEnum from "../enuns/gameEnuns/KeyboardKeysEnum";

import BaseScene from "./base/BaseScene";
import FlagAsset from "../assets/FlagAsset";
import AssetsManager from "../managers/AssetsManager";
import AttackEnum from "../enuns/resourcesEnuns/AttackEnum";
import paths from '../../config/paths.json'
import SoundManager from "../managers/SoundManager";
import SoundEffectEnum from "../enuns/resourcesEnuns/SoundEffectEnum";

class Fight extends BaseScene {
  private _map: TrainerMap;
  private _player: Player;
  private _hud: HudView;
  private _flag: FlagAsset;

  constructor() {
    super();
    this._map = new TrainerMap();
    this._player = new Player();
    this._hud = new HudView(this._player);
    this._flag = new FlagAsset();

    AssetsManager.Instance.LoadAssets([
      {
        key: AttackEnum.BALL,
        path: `${paths.IMAGE_PATH}/attacks/${AttackEnum.BALL}.png`,
      },
      {
        key: AttackEnum.BOOM_SPRITESHEET,
        path: `${paths.IMAGE_PATH}/attacks/${AttackEnum.BOOM_SPRITESHEET}.png`,
      }
    ])

    SoundManager.Instance.PreLoadSounds([SoundEffectEnum.SOUND_EFFECT095, SoundEffectEnum.SOUND_EFFECT020, SoundEffectEnum.SOUND_EFFECT044])

  }

  Load(): Promise<void> {
    return super.Load();
  }

  Enter(): Container {
    this.addChild(this._map);
    this._player.addListener(
      PlayerEventsEnum.BEGIN_NEW_TURN,
      this.BeginNewTurn
    );
    this._player.addListener(PlayerEventsEnum.ADD_PROP, this.AddProp);
    this._map.AddPhysical(this._player)
    this._player.x = 600;
    this._player.y = 223;
    this._player.StartMoving();
    this._player.BeginNewGame();
    this._player.BeginNewTurn();
    this._player.Direction = -1;
    this._hud.x = 0;
    this._hud.y = 0;
    this._player.interactive = true;
    this._player.IsAttacking = true;
    this.addChild(this._hud);
    this.addChild(this._flag);
    this._flag.x = 400;
    this._flag.y = 350;
    this.SetupEvents();
    return this;
  }

  Quit(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  BeginNewTurn(event: Event): void {
    /*
         _keyDown = false;
         _isSpaceDown = false;
         _forceDir = 1;
         _propBar.btnProp1.visible = true;*/
  }

  AddProp(event: Event): void {
    /*
         _propBar.btnProp1.visible = true;
         SoundManager.instance.play("1001");
         nextStep();*/
  }

  SetupEvents(): void {
    let leftEvent = KeyboardEvent(KeyboardKeysEnum.ARROW_LEFT);
    leftEvent.press = () => {
      this._player.Direction = -1;
      this._player.Walk();
    };
    leftEvent.release = () => {
      this._player.StopWalk();
    };

    let rightEvent = KeyboardEvent(KeyboardKeysEnum.ARROW_RIGHT);
    rightEvent.press = () => {
      this._player.Direction = 1;
      this._player.Walk();
    };
    rightEvent.release = () => {
      this._player.StopWalk();
    };

    let upArrowEvent = KeyboardEvent(KeyboardKeysEnum.ARROW_UP);
    upArrowEvent.press = () => {
      this._player.GunAngle = this._player.GunAngle + 1;
    };
    upArrowEvent.hold = () => {
      this._player.GunAngle = this._player.GunAngle + 1;
    };

    let downArrowEvent = KeyboardEvent(KeyboardKeysEnum.ARROW_DOWN);
    downArrowEvent.press = () => {
      this._player.GunAngle = this._player.GunAngle - 1;
    };
    downArrowEvent.hold = () => {
      this._player.GunAngle = this._player.GunAngle - 1;
    };

    let spaceEvent = KeyboardEvent(KeyboardKeysEnum.SPACE);
    spaceEvent.press = () => {
      if (this._player.Force >= Player.FORCE_MAX) {
        this._player.ForceDir = -1;
      }
      this._player.Force += this._player.ForceDir * 24;
      SoundManager.Instance.Play(SoundEffectEnum.SOUND_EFFECT020);
      if (this._player.Force < 0) {
        SoundManager.Instance.Stop(SoundEffectEnum.SOUND_EFFECT020);
        this._player.BeginNewTurn();
      }
    };
    spaceEvent.release = () => {
      this._player.StopWalk();
      if (this._player.IsAttacking && this._player.Force > 0) {
        this._player.IsAttacking = false;
        this._player.Shoot();
        this._player.ForceDir = 1;
      }
      SoundManager.Instance.Stop(SoundEffectEnum.SOUND_EFFECT020);
      SoundManager.Instance.Play(SoundEffectEnum.SOUND_EFFECT019);
    };
    spaceEvent.hold = () => {
      if (this._player.Force >= Player.FORCE_MAX) {
        this._player.ForceDir = -1;
      }
      this._player.Force += this._player.ForceDir * 24;
      SoundManager.Instance.Play(SoundEffectEnum.SOUND_EFFECT020,true);
      if (this._player.Force < 0) {
        SoundManager.Instance.Stop(SoundEffectEnum.SOUND_EFFECT020);
        this._player.BeginNewTurn();
      }
    };
  }
}

export default Fight;
