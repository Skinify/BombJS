import { Point } from "@pixi/math";
import PlayerEventsEnum from "../enuns/gameEnuns/PlayerEventsEnum";
import SoundEffectEnum from "../enuns/resourcesEnuns/SoundEffectEnum";
import SoundManager from "../managers/SoundManager";
import Player from "../physics/Player";
import BaseAction from "./base/BaseAction";

class PlayerWalkAction extends BaseAction {
  private _player: Player;
  constructor(player: Player) {
    super();
    this._player = player;
  }

  Stop(): void {
    this._isFinished = true;
    this._player.DoAction(PlayerEventsEnum.STOP);
  }

  Execute(): void {
    var pos: Point | null = null;
    var tx: number = NaN;
    if (this._player.Energy > 0) {
      pos = this._player.GetNextWalkPoint();
      if (pos) {
        this._player.Pos = pos;
        this._player.DoAction(PlayerEventsEnum.WALK);
        this._isFinished = false;
        SoundManager.Instance.Play(SoundEffectEnum.SOUND_EFFECT044);
      } else {
        this._player.StopMoving();
        this._isFinished = true;
        tx = this._player.x + this._player.Direction * 2;
        if (
          this._player.CanMoveDirection(this._player.Direction) &&
          this._player.CanStand(tx, this._player.y) == false
        ) {
          this._player.Pos = new Point(tx, this._player.y);
          this._player.StartMoving();
        }
      }
    } else {
      this._player.StopMoving();
      this._isFinished = false;
    }
  }

  Connect(action: BaseAction): boolean {
    return action instanceof PlayerWalkAction;
  }
}

export default PlayerWalkAction;
