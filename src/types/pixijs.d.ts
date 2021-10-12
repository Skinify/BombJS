import { Resource } from "@pixi/core";
import { AbstractRenderer, BaseTexture } from "pixi.js";

declare module "pixi.js" {
  interface AbstractRenderer {
    context: CanvasRenderingContext2D | any;
    extract: any;
  }
  interface Resource {
    source: any;
  }
}
