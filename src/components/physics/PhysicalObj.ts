import { Point } from "@pixi/math";
import { Rectangle, Sprite } from "pixi.js";
import Physics from "./Physics";

class PhysicalObj extends Physics {
  protected _canCollided: boolean;
  protected _testRect: Rectangle;
  protected _isLiving: boolean;
  constructor(
    mass: number = 1,
    gravityFactor: number = 1,
    windFactor: number = 1,
    airResitFactor: number = 1
  ) {
    super(mass, gravityFactor, windFactor, airResitFactor);
    this._canCollided = false;
    this._testRect = new Rectangle(-5, -5, 10, 10);
    this._isLiving = true;
  }

  get IsLiving(): boolean {
    return this._isLiving;
  }

  get CanCollided(): boolean {
    return this._canCollided;
  }

  Die(): void {
    this._isLiving = false;
    if (this._isMoving) {
      this.StopMoving();
    }
  }

  IsBox(): boolean {
    return false;
  }

  GetTestRect(): Rectangle {
    return this._testRect.clone();
  }

  GetAngleTwoPoint(point1: Point, point2: Point): number {
    var disX: number = point1.x - point2.x;
    var disY: number = point1.y - point2.y;
    return Math.floor(this.RadianToAngle(Math.atan2(disY, disX)));
  }

  IsPlayer(): boolean {
    return false;
  }

  get SmallView(): Sprite {
    return new Sprite();
  }

  RadianToAngle(radian: number): number {
    return (radian / Math.PI) * 180;
  }

  MoveTo(p: Point): void {
    let dx = NaN;
    let dy = NaN;
    let count = 0;
    let dt;
    let cur;
    let dest;
    let t = 0;
    let rect;
    let list;
    if (this.PointDistance(p, super.Pos) >= 1) {
      dx = Math.abs(p.x - super.x);
      dy = Math.abs(p.y - super.y);
      count = dx > dy ? dx : dy;
      dt = 1 / count;
      cur = super.Pos;
      for (t = Math.abs(count); t > 0; t--) {
        dest = this.PointInterpolate(cur, p, dt * t);
        rect = this.GetTestRect();
        rect.x = rect.x + dest.x;
        rect.y = rect.y + dest.y;
        list = this._map.GetPhysicalObjects(rect, this);
        if (list?.length > 0) {
          super.Pos = dest;
          this.CollideObject(list);
        } else if (!this._map.IsRectangleEmpty(rect)) {
          super.Pos = dest;
          this.CollideGround();
        } else if (this._map.IsOutMap(dest.x, dest.y)) {
          super.Pos = dest;
          this.FlyOutMap();
        }
        if (!this._isMoving) {
          return;
        }
      }
      super.Pos = p;
    }
  }

  CalcObjectAngle(): number {
    let pre_array;
    let next_array;
    let pre;
    let next;
    let bound;
    let m;
    let n;
    let nn;
    let i;
    let j;
    if (this._map) {
      pre_array = new Array();
      next_array = new Array();
      pre = new Point();
      next = new Point();
      bound = 16;
      for (m = 1; m <= bound; m += 2) {
        for (i = -10; i <= 10; i++) {
          if (this._map.IsEmpty(this.x + m, this.y - i)) {
            pre_array.push(new Point(this.x + m, this.y - i));
            break;
          }
        }
        for (j = -10; j <= 10; j++) {
          if (this._map.IsEmpty(this.x - m, this.y - j)) {
            next_array.push(new Point(this.x - m, this.y - j));
            break;
          }
        }
      }
      pre = new Point(this.x, this.y);
      next = new Point(this.x, this.y);
      for (n = 0; n < pre_array.length; n++) {
        pre = pre.add(pre_array[n]);
      }
      for (nn = 0; nn < next_array.length; nn++) {
        next = next.add(next_array[nn]);
      }
      pre.x /= pre_array.length + 1;
      pre.y /= pre_array.length + 1;
      next.x /= next_array.length + 1;
      next.y /= next_array.length + 1;
      return this.GetAngleTwoPoint(pre, next);
    }
    return 0;
  }

  CollideObject(list: Array<PhysicalObj>): void {
    list.forEach((phy) => {
      phy.CollideBy(this);
    });
  }

  CollideBy(phy: PhysicalObj): void {}

  FlyOutMap(): void {
    this.Die();
  }

  CollideGround(): void {
    this.StopMoving();
  }

  SetTestRect(left: number, top: number, right: number, bottom: number): void {
    let newRect = new Rectangle(top, left, right - left, top - bottom);
    this._testRect = newRect;
  }

  PointDistance(p1: Point, p2: Point) {
    let a = p1.x - p2.x;
    let b = p1.y - p2.y;
    return Math.sqrt(a * a + b * b);
  }

  PointInterpolate(a: Point, b: Point, frac: number): Point {
    var nx = a.x + (b.x - a.x) * frac;
    var ny = a.y + (b.y - a.y) * frac;
    return new Point(nx, ny);
  }
}

export default PhysicalObj;
