import { AnimatedSprite, Rectangle, Sprite, Texture } from "pixi.js";
import BallSPAsset from "../assets/BallSPAsset";
import AttackEnum from "../enuns/resourcesEnuns/AttackEnum";
import SoundEffectEnum from "../enuns/resourcesEnuns/SoundEffectEnum";
import AssetsManager from "../managers/AssetsManager";
import SoundManager from "../managers/SoundManager";
import PhysicalObj from "./PhysicalObj";
import Player from "./Player";

class SimpleBomb extends PhysicalObj {
  private _player: Player;
  private _blastMC: AnimatedSprite;
  private _isFly: boolean;
  private _bombSound: SoundEffectEnum;
  private _ball: BallSPAsset;
  constructor(player: Player, bombSound: SoundEffectEnum, bomb: any) {
    super(10, 100, 1, 1);
    this._testRect = new Rectangle(-3, -3, 6, 6);
    this._player = player;
    this._ball = bomb;
    this.addChild(this._ball);
    this._isFly = false;
    this._bombSound = bombSound;

    this._blastMC = new AnimatedSprite([Texture.EMPTY]);
    this._blastMC.loop = false;

    let ssheet = AssetsManager.Instance.GetPreloaded(
      AttackEnum.BOOM_SPRITESHEET
    );
    if (ssheet.texture) {
      let t = ssheet.texture.baseTexture;
      let h = 240;
      let w = 320;

      let c = 0;
      let spriteObj: Array<Texture> = [];
      while (true) {
        spriteObj.push(new Texture(t, new Rectangle(c * w, 0, w, h)));
        c++;
        if (c === 16) break;
      }

      this._blastMC.textures = spriteObj;
    }
  }

  get Player(): Player {
    return this._player;
  }

  Bomb(): void {
    if (this._blastMC) {
      this._blastMC.x = this.x - 150;
      this._blastMC.y = this.y - 120;
      this._map.addChild(this._blastMC);
      this._blastMC.play();
      this._blastMC.onComplete = () => (this._blastMC.visible = false);
    }
    if (this._isFly) {
      this._player.Pos = this.Pos;
      this._player.StartMoving();
    }
    SoundManager.Instance.Play(this._bombSound);
    this.Die();
  }

  set IsFly(v: boolean) {
    this._isFly = v;
  }

  override CollideGround(): void {
    this.Bomb();
  }

  override Die(): void {
    super.Die();
    if (this._map) {
      this._map.RemovePhysical(this);
    }
    this._player.BeginNewTurn();
  }

  override UpdatePosition(dt: number): void {
    super.UpdatePosition(dt);
    this.angle = (this.MotionAngle * 180) / Math.PI;
    this.scale._y = this.Vx > 0 ? 1 : -1;
  }
}

export default SimpleBomb;
