import { Point } from "@pixi/math";
import PlayerEventsEnum from "../enuns/gameEnuns/PlayerEventsEnum";
import SoundEffectEnum from "../enuns/resourcesEnuns/SoundEffectEnum";
import SoundManager from "../managers/SoundManager";
import Player from "../physics/Player";
import SimpleBomb from "../physics/SimpleBomb";
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

  Execute(): void {
    let v;
 
    var bomb: SimpleBomb | null = null;
    this._count++;
    if (this._count > 60) {
      v = this.Polar(this._force, (this._angle / 180) * Math.PI);
      bomb = null;
      if (this._isSpecial) {
        //bomb = new SimpleBomb(this._player, new BallSPAsset());
        
        SoundManager.Instance.Play(SoundEffectEnum.SOUND_EFFECT075);
        bomb = new SimpleBomb(this._player);
        bomb.BombSound = "095";
      } else if (this._isFly) {
        //bomb = new SimpleBomb(this._player, new TSBallAsset());
        bomb = new SimpleBomb(this._player);
        SoundManager.Instance.Play(SoundEffectEnum.SOUND_EFFECT023);
        //SoundManager.instance.play("023");
        bomb.BombSound = "096";
        bomb.IsFly = true;
      } else {
        //bomb = new SimpleBomb(this._player, new BallN());
        bomb = new SimpleBomb(this._player);
        SoundManager.Instance.Play(SoundEffectEnum.SOUND_EFFECT033);
        //SoundManager.instance.play("033");
        bomb.BombSound = "095";
      }
      bomb.SetSpeedXY(v);
      bomb.Pos = this._pos;
      this._player.Map.AddPhysical(bomb);
      bomb.StartMoving();
      this._player.DoAction(PlayerEventsEnum.STOP);
      this._isFinished = true;
    }
  }

  Connect(action: BaseAction): boolean {
    return action instanceof ShootAction;
  }

  Polar(r: number, theta: number): Point {
    let x = r * Math.cos(theta);
    let y = r * Math.sin(theta);
    return new Point(x, y);
  }
}

export default ShootAction;
