import { Container } from "@pixi/display";
import TrainerMap from "../map/TrainerMap";
import Player from "../physics/Player";
import PlayerEventsEnum from "../enuns/gameEnuns/PlayerEventsEnum";
import HudView from "../view/HudView";
import KeyBoardEvent from "../events/KeyboardEvent";

import BaseScene from "./base/BaseScene";
import FlagAsset from "../assets/FlagAsset";

class Fight extends BaseScene {
  private _map: TrainerMap;
  private _player: Player;
  private _hud: HudView;
  private _flag: FlagAsset;

  constructor() {
    super();
    this._map = new TrainerMap();
    this._player = new Player();
    this._hud = new HudView();
    this._flag = new FlagAsset();
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
    this._player.x = 800;
    this._player.y = 123;
    this._player.StartMoving();
    this._player.BeginNewGame();
    this._player.BeginNewTurn();
    this._hud.x = 0;
    this._hud.y = 0;
    this._player.interactive = true;
    this._player.IsAttacking = true;
    this.addChild(this._hud);
    this.addChild(this._flag);
    this._flag.x = 400;
    this._flag.y = 350;
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
}

export default Fight;
