import { Sprite, Point } from "pixi.js";
import TrainerMap from "../map/TrainerMap";
import EulerVector from "../math/EulerVector";

class Physics extends Sprite {
  protected _mass: number;
  protected _gravityFactor: number;
  protected _windFactor: number;
  protected _airResitFactor: number;
  protected _airResist: number;
  protected _arf: number;
  protected _vx: EulerVector;
  protected _vy: EulerVector;
  protected _ef: Point;
  protected _isMoving: boolean;
  protected _wf: number;
  protected _gf: number;
  protected _map: TrainerMap | any;
  constructor(
    mass: number = 1,
    gravityFactor: number = 1,
    windFactor: number = 1,
    airResitFactor: number = 1
  ) {
    super();
    this._mass = mass;
    this._gravityFactor = gravityFactor;
    this._windFactor = windFactor;
    this._airResitFactor = airResitFactor;
    this._vx = new EulerVector(0, 0, 0);
    this._vy = new EulerVector(0, 0, 0);
    this._ef = new Point(0, 0);
    this._isMoving = false;
    this._airResist = 0;
    this._arf = 0;
    this._gf = 0;
    this._wf = 0;
    this._map = null;
  }

  SetSpeedXY(vector: Point): void {
    this._vx.x1 = vector.x;
    this._vy.x1 = vector.y;
    if (!this._isMoving && this._map) {
      this.StartMoving();
    }
  }

  Update(dt: number): void {
    console.log("updatando")
    if (this._isMoving && this._map) {
      this.UpdatePosition(dt);
    }
  }

  AddExternForce(force: Point): void {
    this._ef.x += force.x;
    this._ef.y += force.y;
    if (!this._isMoving && this._map) {
      this.StartMoving();
    }
  }

  MoveTo(p: Point): void {
    if (p.x != this.x || p.y != this.y) {
      this.Pos = p;
    }
  }

  UpdatePosition(dt: number): void {
    console.log("EAE")
    this.MoveTo(this.ComputeFallNextXY(dt));
  }

  ComputeFallNextXY(dt: number): Point {
    this._vx.ComputeOneEulerStep(
      this._mass,
      this._arf,
      this._wf + this._ef.x,
      dt
    );
    this._vy.ComputeOneEulerStep(
      this._mass,
      this._arf,
      this._gf + this._ef.y,
      dt
    );
    return new Point(this._vx.x0, this._vy.x0);
  }

  StartMoving(): void {
    this._isMoving = true;
  }

  StopMoving(): void {
    this._vx.clearMotion();
    this._vy.clearMotion();
    this._isMoving = false;
  }

  AddSpeedXY(vector: Point): void {
    this._vx.x1 += vector.x;
    this._vy.x1 += vector.y;
    if (!this._isMoving && this._map) {
      this.StartMoving();
    }
  }

  Dispose(): void {
    if (this._map) this._map.RemovePhysical(this);
  }

  set Map(map: TrainerMap | null) {
    this._map = map;
    if (this._map) {
      this._arf = this._map.airResistance * this._airResitFactor;
      this._gf = this._map.gravity * this._gravityFactor * this._mass;
      this._wf = this._map.wind * this._windFactor;
    }
  }

  set X(value: number) {
    super.x = value;
    this._vx.x0 = value;
  }

  set Y(value: number) {
    super.y = value;
    this._vy.x0 = value;
  }

  set Pos(value: Point) {
    this.x = value.x;
    this.y = value.y;
  }

  get Pos(): Point {
    return new Point(this.x, this.y);
  }

  get Map(): TrainerMap | any {
    return this._map;
  }

  get Vx(): number {
    return this._vx.x1;
  }

  get MotionAngle(): number {
    return Math.atan2(this._vy.x1, this._vx.x1);
  }

  get IsMoving(): boolean {
    return this.IsMoving;
  }
}

export default Physics;
