import { Rectangle, Sprite, Point } from "pixi.js";
import BackMapAsset from "../assets/BackMapAsset";
import ForceMapAsset from "../assets/ForceMapAsset";
import PhysicalObj from "../physics/PhysicalObj";
import Physics from "../physics/Physics";

class TrainerMap extends Sprite {
  public wind: number = 3;
  public gravity: number = 9.8;
  private _layer: Sprite;
  private _objects: Array<PhysicalObj>;
  private _back: BackMapAsset;
  public airResistance: number = 2;
  private _stone: ForceMapAsset;
  private _bound: Rectangle;
  UpdateWrapper: () => void;
  constructor() {
    super();
    this._back = new BackMapAsset(1000, 600);
    this.addChild(this._back);
    this._stone = new ForceMapAsset(1000, 600, false);
    this.addChild(this._stone);
    this._bound = new Rectangle(0, 0, this._stone.Width, this._stone.Height);
    this._objects = [];
    this._layer = new Sprite();
    this.UpdateWrapper = this.Update.bind(this);
    this.Update();
  }

  GetPhysicalObjects(rect: Rectangle, except: PhysicalObj): Array<PhysicalObj> {
    let phy: PhysicalObj | null = null;
    var t: Rectangle | null = null;
    var temp: Array<PhysicalObj> = new Array();
    this._objects.forEach(function (phy) {
      if (phy != except && phy.IsLiving && phy.CanCollided) {
        t = phy.GetTestRect();
        t.x = t.x + phy.x;
        t.y = t.y + phy.y;
        if (t.intersects(rect)) {
          temp.push(phy);
        }
      }
    });
    return temp;
  }

  CanMove(x: number, y: number): boolean {
    return this.IsEmpty(x, y) && !this.IsOutMap(x, y);
  }

  FindYLineNotEmptyPointDown(x: number, y: number, h: number): Point | null {
    x = x < 0 ? 0 : x > this._bound.width ? this._bound.width : x;
    y = y < 0 ? 0 : y;
    h = y + h > this._bound.height ? this._bound.height - y : h;
    for (var i: number = 0; i < h; i++) {
      if (!this.IsEmpty(x - 1, y) || !this.IsEmpty(x + 1, y)) {
        return new Point(x, y);
      }
      y++;
    }
    return null;
  }

  Update(): void {
    this._objects.forEach((phy) => {
      phy.Update(0.04);
    });
    window.requestAnimationFrame(this.UpdateWrapper);
  }

  IsRectangleEmpty(rect: Rectangle): boolean {
    return this._stone.IsRectangleEmpty(rect);
  }

  RemovePhysical(phy: PhysicalObj | Physics) {
    this.removeChild(phy);
    phy.Map = null;
    this._objects = this._objects.filter((x) => x != phy);
  }

  AddPhysical(phy: PhysicalObj): void {
    console.log("Adding")
    this.addChild(phy);
    phy.Map = this;
    this._objects.push(phy);
  }

  IsEmpty(x: number, y: number): boolean {
    return this._stone.IsEmpty(x, y);
  }

  IsOutMap(x: number, y: number): boolean {
    if (x < this._bound.x || x > this._bound.width || y > this._bound.height) {
      return true;
    }
    return false;
  }

  FindYLineNotEmptyPointUp(x: number, y: number, h: number): Point | null {
    x = x < 0 ? 0 : x > this._bound.width ? this._bound.width : x;
    y = y < 0 ? 0 : y;
    h = y + h > this._bound.height ? this._bound.height - y : h;
    for (var i: number = 0; i < h; i++) {
      if (!this.IsEmpty(x - 1, y) || !this.IsEmpty(x + 1, y)) {
        return new Point(x, y);
      }
      y--;
    }
    return null;
  }

  Dispose(): void {
    this._objects = [];
  }
}

export default TrainerMap;
