import { Graphics, Sprite } from "pixi.js";

class Tile extends Graphics {
  digable: boolean;
  canvas: HTMLCanvasElement;
  constructor(digable: boolean, groundSprite: Sprite) {
    super();
    this.digable = digable;
    this.canvas = document.createElement("canvas");
    this.canvas.height = groundSprite.height;
    this.canvas.width = groundSprite.width;
  }

  SetGroundTiles(groundSprite: HTMLImageElement): void {
    this.canvas
      .getContext("2d")
      ?.drawImage(groundSprite, 0, 0, groundSprite.width, groundSprite.height);
  }

  IsEmpty(x: number, y: number): boolean {
    let pixel = this.canvas.getContext("2d")?.getImageData(x, y, 1, 1).data;
    if (pixel) return pixel[3] !== 255;
    else return false;
  }
}

export default Tile;
