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
import paths from "../../config/paths.json";
import SoundManager from "../managers/SoundManager";
import SoundEffectEnum from "../enuns/resourcesEnuns/SoundEffectEnum";
import PropEffectEnum from "../enuns/resourcesEnuns/PropEffectEnum";
import PropEnum from "../enuns/resourcesEnuns/PropEnum";

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
        key: AttackEnum.PLANE_SPRITESHEET,
        path: `${paths.IMAGE_PATH}/attacks/${AttackEnum.PLANE_SPRITESHEET}.png`,
      },
      {
        key: AttackEnum.SPECIAL,
        path: `${paths.IMAGE_PATH}/attacks/${AttackEnum.SPECIAL}.png`,
      },
      {
        key: AttackEnum.BOOM_SPRITESHEET,
        path: `${paths.IMAGE_PATH}/attacks/${AttackEnum.BOOM_SPRITESHEET}.png`,
      },
      {
        key: PropEffectEnum.PROP_USE_EFFECT,
        path: `${paths.IMAGE_PATH}/prop_effect/${PropEffectEnum.PROP_USE_EFFECT}.png`,
      },
      {
        key: PropEnum.PLANE,
        path: `${paths.IMAGE_PATH}/prop/${PropEnum.PLANE}.png`,
      },
    ]);

    SoundManager.Instance.PreLoadSounds([
      SoundEffectEnum.SOUND_EFFECT020,
      SoundEffectEnum.SOUND_EFFECT095,
      SoundEffectEnum.SOUND_EFFECT044,
      SoundEffectEnum.SOUND_EFFECT075,
      SoundEffectEnum.SOUND_EFFECT033,
      SoundEffectEnum.SOUND_EFFECT023,
      SoundEffectEnum.SOUND_EFFECT019,
      SoundEffectEnum.SOUND_EFFECT006,
      SoundEffectEnum.SOUND_EFFECT096,
      SoundEffectEnum.SOUND_EFFECT008,
    ]);
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
    this._map.AddPhysical(this._player);
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
    //_propBar.btnProp1.visible = true;
    SoundManager.Instance.Play(SoundEffectEnum.SOUND_EFFECT1001);
    //nextStep();
  }

  SetupEvents(): void {
    let leftEvent = KeyboardEvent(KeyboardKeysEnum.ARROW_LEFT);
    leftEvent.press = () => {
      if (!this._player.IsAttacking) return;

      this._player.Direction = -1;
      this._player.Walk();
    };
    leftEvent.release = () => {
      this._player.StopWalk();
    };

    let rightEvent = KeyboardEvent(KeyboardKeysEnum.ARROW_RIGHT);
    rightEvent.press = () => {
      if (!this._player.IsAttacking) return;

      this._player.Direction = 1;
      this._player.Walk();
    };
    rightEvent.release = () => {
      this._player.StopWalk();
    };

    let upArrowEvent = KeyboardEvent(KeyboardKeysEnum.ARROW_UP);
    upArrowEvent.press = () => {
      this._player.GunAngle = this._player.GunAngle + 1;
      SoundManager.Instance.Play(SoundEffectEnum.SOUND_EFFECT006);
    };
    upArrowEvent.hold = () => {
      upArrowEvent.press();
    };

    let downArrowEvent = KeyboardEvent(KeyboardKeysEnum.ARROW_DOWN);
    downArrowEvent.press = () => {
      this._player.GunAngle = this._player.GunAngle - 1;
      SoundManager.Instance.Play(SoundEffectEnum.SOUND_EFFECT006);
    };
    downArrowEvent.hold = () => {
      downArrowEvent.press();
    };

    let spaceEvent = KeyboardEvent(KeyboardKeysEnum.SPACE);
    spaceEvent.press = () => {
      if (!this._player.IsAttacking) return;

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

    spaceEvent.hold = () => {
      spaceEvent.press();
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
  }
}

export default Fight;
