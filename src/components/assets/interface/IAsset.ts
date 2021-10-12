import { LoaderResource } from "pixi.js";
import { Dict } from "@pixi/utils";

interface IAsset {
  OnLoad(args: Dict<LoaderResource> | LoaderResource): void;
  OnLoadError(args: any): void;
}

export default IAsset;
