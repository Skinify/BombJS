import {
  AbstractRenderer,
  BaseTexture,
  Sprite,
  Resource,
  Container,
  Rectangle,
} from "pixi.js";

declare module "pixi.js" {
  interface AbstractRenderer {
    context: CanvasRenderingContext2D | any;
    extract: any;
  }
  interface Resource {
    source: any;
  }
}

declare global {
  interface Window {
    Temp: any;
  }
}

window.Temp = window.Temp || {};
