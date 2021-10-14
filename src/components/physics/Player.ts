import { Point, Rectangle, Sprite, Texture } from "pixi.js";
import BaseAction from "../actions/base/BaseAction";
import PlayerWalkAction from "../actions/PlayerWalkAction";
import BloodAsset from "../assets/BloodAsset";
import MoveStripAsset from "../assets/MoveStripAsset";
import PlayerAsset from "../assets/PlayerAsset";
import TakeAimAsset from "../assets/TakeAimAsset";
import PlayerEvent from "../events/PlayerEvent";
import PhysicalObj from "./PhysicalObj";
import KeyboardEvent from "../events/KeyboardEvent";
import ActionManager from "../managers/ActionManager";
import PlayerEventsEnum from "../enuns/gameEnuns/PlayerEventsEnum";
import KeyboardKeysEnum from "../enuns/gameEnuns/KeyboardKeysEnum";

class Player extends PhysicalObj {
  protected _player: Sprite;
  protected _body: PlayerAsset;
  private _takeAim: TakeAimAsset;
  private _bloodBarWidth: number;
  private _direction: number;
  private _dander: number;
  private _energy: number;
  private _isUsedProp: boolean;
  private _playerAngle: number;
  private _totalBlood: number;
  private _isSpecial: boolean;
  private _isUsedSpecial: boolean;
  private _currentAction: string;
  private _moveStrip: MoveStripAsset;
  private _isAttacking: boolean;
  private _smallBlood: BloodAsset;
  private _action: PlayerWalkAction | null;
  private _gunAngle: number;
  private _force: number;
  private _forceDir: number;
  private _isFly: boolean;
  private _blood: number;

  constructor() {
    super(10, 100);
    this._testRect = new Rectangle(-5, -10, 20, 20);
    this._body = new PlayerAsset();
    let tst = new Sprite(Texture.WHITE);
    tst.x = 0;
    tst.y = 0;
    tst.height = 1;
    tst.width = 100;
    this.addChild(tst);
    this._body.y = -80;
    this._body.x = -60;
    this._player = new Sprite();
    this._player.addChild(this._body);
    this.addChild(this._player);
    this._smallBlood = new BloodAsset();
    this._smallBlood.x = -20;
    this._smallBlood.y = 16;
    this._bloodBarWidth = 100; ///REFATORAR
    this.addChild(this._smallBlood);
    this._takeAim = new TakeAimAsset();
    this._takeAim.x = Player.BALL_POS.x;
    this._takeAim.y = Player.BALL_POS.y;
    ///_takeAim.hand.rotation = MIN_ANGLE; ///REFATORAR
    this._takeAim.scale.set(-1, 1);
    this._player.addChild(this._takeAim);
    this._moveStrip = new MoveStripAsset();
    this._moveStrip.x = -20;
    this._moveStrip.y = 26;
    this.addChild(this._moveStrip);
    this._gunAngle = 55;
    this._moveStrip.visible = this.visible;
    this._smallBlood.visible = this.visible;
    this._takeAim.visible = this.visible;
    this._direction = -1;
    this._dander = 1;
    this._energy = 1;
    this._isUsedProp = false;
    this._playerAngle = 0;
    this._totalBlood = 100;
    this._isSpecial = false;
    this._isUsedSpecial = false;
    this._currentAction = Player.STAND;
    this._isAttacking = false;
    this._action = null;
    this._force = 0;
    this._forceDir = 1;
    this._isFly = false;
    this._blood = 100;
    this._isLiving = true;
    this.SetupMov();
  }

  SetupMov() {
    let leftEvent = KeyboardEvent(KeyboardKeysEnum.ARROW_LEFT);
    leftEvent.press = () => {
      this.Direction = -1;
      this.Walk();
    };
    leftEvent.release = () => {
      this.StopWalk();
    };

    let rightEvent = KeyboardEvent(KeyboardKeysEnum.ARROW_RIGHT);
    rightEvent.press = () => {
      this.Direction = 1;
      this.Walk();
    };
    rightEvent.release = () => {
      this.StopWalk();
    };

    let upArrowEvent = KeyboardEvent(KeyboardKeysEnum.ARROW_UP);
    upArrowEvent.press = () => {
      this._gunAngle++;
    };
    upArrowEvent.hold = () => {
      this._gunAngle++;
      console.log(this._gunAngle);
    };

    let downArrowEvent = KeyboardEvent(KeyboardKeysEnum.ARROW_DOWN);
    downArrowEvent.press = () => {
      this._gunAngle--;
    };
    downArrowEvent.hold = () => {
      this._gunAngle--;
      console.log(this._gunAngle);
    };

    let spaceEvent = KeyboardEvent(KeyboardKeysEnum.SPACE);
    spaceEvent.press = () => {
      console.log("clicou");
    };
    spaceEvent.release = () => {
      console.log("soltou");
    };
    spaceEvent.hold = () => {
      console.log("teste");
    };
  }

  DoAction(action: string): void {
    if (this._currentAction != action && this._currentAction != Player.GHOST) {
      this._currentAction = action;
      this._body.GotoAndPlay(action); ///REFATORAR
    }
  }

  StopWalk(): void {
    if (this._action) {
      this._action.Stop();
      this._action = null;
    }
  }

  BeginNewGame(): void {
    this._totalBlood = 1000;
    this._blood = 1000;
    this._direction = 1;
  }

  BeginNewTurn(): void {
    this._isUsedProp = false;
    this._isUsedSpecial = false;
    this._force = 0;
    this._energy = 240;
    if (this.IsLiving) {
      this._dander = 200;
    } else {
      this._dander = 0;
    }
    this._isSpecial = false;
    this._isAttacking = true;
    this._isFly = false;
    dispatchEvent(new PlayerEvent(PlayerEventsEnum.BEGIN_NEW_TURN));
  }

  set IsFly(value: boolean) {
    if (this._isFly == value) {
      return;
    }
    this._isFly = value;
    if (this._isFly && this._isLiving) {
      //SoundManager.instance.play("008");
      //addChild(new MovieClipWrapper(new UsingFlyAsset(),true,true));
    }
    dispatchEvent(new PlayerEvent(PlayerEventsEnum.FLY_CHANGED));
  }

  get ShootAngle(): number {
    if (this._direction > 0) {
      return this._playerAngle - this._gunAngle;
    }
    return this._playerAngle + this._gunAngle - 180;
  }

  UseProp(): void {
    this._isUsedProp = true;
  }

  Act(act: BaseAction): boolean {
    return ActionManager.Instance.Act(act);
  }

  CanStand(x: number, y: number): boolean {
    var rect: Rectangle = this._testRect.clone();
    rect.x = rect.x + x;
    rect.y = rect.y + y;
    return !this._map.IsRectangleEmpty(rect);
  }

  get CurrentAction(): string {
    return this._currentAction;
  }

  get IsUsedProp(): boolean {
    return this._isUsedProp;
  }

  get Energy(): number {
    return this._energy;
  }

  set Energy(value: number) {
    this._energy = value;
  }

  get Direction(): number {
    return this._direction;
  }

  set Direction(value: number) {
    if (this._direction == value) return;
    this._direction = value;
    this.scale.x = value;
  }

  CanMoveDirection(dir: number): boolean {
    return !this._map.IsOutMap(this.x + 17 * dir, this.y);
  }

  GetNextWalkPoint(): Point | null {
    var tx: number = NaN;
    var ty: number = NaN;
    var i: number = 0;
    var j: number = 0;
    if (this.CanMoveDirection(this._direction)) {
      tx = this.x + this._direction * 2;
      ty = this.y;
      if (this.CanStand(tx, ty)) {
        for (i = 1; i < 10; i++) {
          if (!this.CanStand(tx, ty - i)) {
            return new Point(tx, ty - i + 1);
          }
        }
      } else {
        for (j = 1; j < 10; j++) {
          if (this.CanStand(tx, ty + j)) {
            return new Point(tx, ty + j);
          }
        }
      }
      return null;
    }
    return null;
  }

  Walk(): void {
    let temp: PlayerWalkAction | null = null;
    if (!this._isMoving && this._isLiving) {
      temp = new PlayerWalkAction(this);
      if (this.Act(temp)) {
        this._action = temp;
      }
    }
  }

  set IsAttacking(value: boolean) {
    this._isAttacking = true;
  }

  ComputeFallNextXY(dt: number): Point {
    return new Point(this.x, this.y + 6);
  }

  set PlayerAngle(value: number) {
    if (this._playerAngle == value) {
      return;
    }
    this._playerAngle = value;
    //this._player.rotation = value * 10;
    this._player.angle = value;
    dispatchEvent(new PlayerEvent(PlayerEventsEnum.PLAYER_ANGEL_CHANGED));
  }

  set Pos(value: Point) {
    //this._energy -= Math.abs(value.x - this.x);
    super.Pos = value;
    if (this._isLiving) {
      this.PlayerAngle = this.CalcObjectAngle();
    } else {
      this.PlayerAngle = 0;
    }
    var rect: Rectangle = this.GetTestRect();
    rect.x = this.x;
    rect.y = this.y;
    var list: Array<PhysicalObj> = this._map.GetPhysicalObjects(rect, this);
    if (list.length > 0) {
      this.CollideObject(list);
    }
  }

  Update(dt: number): void {
    super.Update(dt);
    ActionManager.Instance.Execute();
  }

  static get MIN_ANGLE(): number {
    return 35;
  }

  static get PREPARE(): string {
    return "PREPARE";
  }

  static get WALK(): string {
    return "WALK";
  }

  static get GHOST(): string {
    return "GHOST";
  }

  static get STOP(): string {
    return "STOP";
  }

  static get BALL_POS(): Point {
    return new Point(30, -20);
  }

  static get STAND(): string {
    return "STAND";
  }

  static get FORCE_MAX(): number {
    return 2000;
  }

  static get MAX_ANGLE(): number {
    return 65;
  }

  static get SHOOT(): string {
    return "SHOOT";
  }
}

export default Player;
