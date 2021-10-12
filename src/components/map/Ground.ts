import { Sprite } from "pixi.js";
import { Rectangle } from "@pixi/math";
import "@pixi/math-extras";
import Tile from "./Tile";

class Ground extends Tile {
  constructor(boundRect: Rectangle, digable: boolean, groundSprite: Sprite) {
    super(digable, groundSprite);
    this.width = boundRect.width;
    this.height = boundRect.height;
    this._boundsRect = boundRect;
  }

  IsYLineEmtpy(x: number, y: number, h: number): boolean {
    y = y < 0 ? 0 : y;
    h = y + h > this._boundsRect.height ? this._boundsRect.height - y : h;
    for (let i: number = 0; i < h; i++) {
      if (!this.IsEmpty(x, y + 1)) {
        return false;
      }
    }
    return true;
  }

  IsXLineEmpty(x: number, y: number, w: number): boolean {
    x = x < 0 ? 0 : x;
    w = x + w > this._boundsRect.width ? this._boundsRect.width - x : w;
    for (var i: number = 0; i < w; i++) {
      if (!this.IsEmpty(x + i, y)) {
        return false;
      }
    }
    return true;
  }

  IsRectangleEmpty(rect: Rectangle): boolean {
    rect = this.Intersect(this._boundsRect, rect);
    if (rect.width == 0 || rect.height == 0) {
      return true;
    }
    if (rect.height > 1) {
      if (!this.IsXLineEmpty(rect.x, rect.y + rect.height - 1, rect.width)) {
        return false;
      }
      if (!this.IsYLineEmtpy(rect.x, rect.y + 1, rect.height - 1)) {
        return false;
      }
      if (
        rect.width > 1 &&
        !this.IsYLineEmtpy(rect.x + rect.width - 1, rect.y, rect.height - 1)
      ) {
        return false;
      }
    }
    return true;
  }

  Intersect(a: Rectangle, b: Rectangle): Rectangle {
    let x = Math.max(a.x, b.x);
    let num1 = Math.min(a.x + a.width, b.x + b.width);
    let y = Math.max(a.y, b.y);
    let num2 = Math.min(a.y + a.height, b.y + b.height);
    if (num1 >= x && num2 >= y) return new Rectangle(x, y, num1 - x, num2 - y);
    else return Rectangle.EMPTY;
  }

  IsRectangeEmptyQuick(rectB: Rectangle): boolean {
    let rect = new Rectangle();
    this._boundsRect.intersection(rectB, rect);
    if (
      this.IsEmpty(rect.right, rect.bottom) &&
      this.IsEmpty(rect.left, rect.bottom) &&
      this.IsEmpty(rect.right, rect.top) &&
      this.IsEmpty(rect.left, rect.top)
    ) {
      return true;
    }
    return false;
  }
}

export default Ground;
