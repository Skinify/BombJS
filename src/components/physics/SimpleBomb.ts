import { AnimatedSprite, Rectangle, Sprite, Texture } from "pixi.js";
import BallSPAsset from "../assets/BallSPAsset";
import PhysicalObj from "./PhysicalObj";
import Player from "./Player";

class SimpleBomb extends PhysicalObj {
  private _player: Player;
  private _blastMC: AnimatedSprite;
  private _isFly: boolean;
  private _bombSound: string;
  private _ball: BallSPAsset;
  constructor(player: Player) {
    super(10, 100, 1, 1);
    this._testRect = new Rectangle(-3, -3, 6, 6);
    this._player = player;
    this._ball = new BallSPAsset();
    this.addChild(this._ball)
    this._blastMC = new AnimatedSprite([Texture.EMPTY]);
    this._isFly = false;
    this._bombSound = "";
  }

  get Player(): Player {
    return this._player;
  }

  Bomb(): void {
    if (this._blastMC) {
      this._blastMC.x = this.x;
      this._blastMC.y = this.y;
      this._map.addChild(this._blastMC);
      this._blastMC.play();
    }
    if (this._isFly) {
      this._player.Pos = this.Pos;
      this._player.StartMoving();
    }
    console.log("BOmmmb")
    //SoundManager.instance.play(bombSound);
    this.Die();
  }

  set BombSound(v: string) {
    this._bombSound = v;
  }

  set IsFly(v: boolean) {
    this._isFly = v;
  }

  override CollideGround(): void {
    console.log("Colide")
    this.Bomb();
  }

  override Die(): void {
    console.log("SHINEE")
    super.Die();
    if (this._map) {
      this._map.RemovePhysical(this);
    }
    this._player.BeginNewTurn();
  }

  override UpdatePosition(dt: number): void {
    super.UpdatePosition(dt);
    this.rotation = (this.MotionAngle * 180) / Math.PI;
    this.scale._y = this.Vx > 0 ? 1 : -1;
  }
}

export default SimpleBomb;
