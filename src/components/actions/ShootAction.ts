import { Point } from "@pixi/math";
import PlayerEventsEnum from "../enuns/gameEnuns/PlayerEventsEnum";
import SoundEffectEnum from "../enuns/resourcesEnuns/SoundEffectEnum";
import SoundManager from "../managers/SoundManager";
import Player from "../physics/Player";
import BaseAction from "./base/BaseAction";

class ShootAction extends BaseAction {
  private _player: Player;
  private _isSpecial: boolean;
  private _isFly: boolean;
  private _angle: number;
  private _force: number;
  private _pos: Point;
  private _count: number;
  constructor(
    player: Player,
    pos: Point,
    force: number,
    angle: number,
    isSpecial: boolean,
    isFly: boolean
  ) {
    super();
    this._isFinished = false;
    this._count = 0;
    this._player = player;
    this._pos = pos;
    this._force = force;
    this._angle = angle;
    this._isSpecial = isSpecial;
    this._isFly = isFly;
  }

  Prepare(): void {
    this._player.DoAction(PlayerEventsEnum.SHOOT);
  }

  Stop(): void {
    this._isFinished = true;
    this._player.DoAction(Player.STOP);
  }

  Execute(): void {
    /*
    let v;
    var bomb: SimpleBomb = null;
    this._count++;
    if (this._count > 15) {
      v = Point.polar(this._force, (this._angle / 180) * Math.PI);
      bomb = null;
      if (this._isSpecial) {
        bomb = new SimpleBomb(this._player, new BallSPAsset());
        //SoundManager.instance.play("075");
        bomb.bombSound = "095";
      } else if (this._isFly) {
        bomb = new SimpleBomb(this._player, new TSBallAsset());
        //SoundManager.instance.play("023");
        bomb.bombSound = "096";
        bomb.isFly = true;
      } else {
        bomb = new SimpleBomb(this._player, new BallN());
        //SoundManager.instance.play("033");
        bomb.bombSound = "095";
      }
      bomb.setSpeedXY(v);
      bomb.pos = this._pos;
      this._player.Map.addPhysical(bomb);
      bomb.startMoving();
      Player.SHOOT;
      this._player.DoAction(PlayerEventsEnum.SHOOT);
      this._isFinished = true;
    }*/
  }

  Connect(action: BaseAction): boolean {
    return action instanceof ShootAction;
  }
}

export default ShootAction;
