import { BaseTexture, Sprite, Texture } from "pixi.js";
import HudEnums from "../enuns/resourcesEnuns/HudEnum";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";

class ForceBarAsset extends Sprite implements IAsset {
  private _forceMarker: Sprite;
  constructor() {
    super(Texture.EMPTY);
    this._forceMarker = new Sprite(Texture.EMPTY);
    AssetsManager.Instance.LoadAssets([
      {
        key: HudEnums.FORCE_BAR,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FORCE_BAR}.png`,
      },
      {
        key: HudEnums.FORCE_METER,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FORCE_METER}.png`,
      },
      {
        key: HudEnums.FORCE,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FORCE}.png`,
      },
      {
        key: HudEnums.FORCE_TRACE,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FORCE_TRACE}.png`,
      },
      {
        key: HudEnums.FORCE_MARKER,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FORCE_MARKER}.png`,
      },
    ])
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }

  OnLoad(args): void {
    this.texture = new Texture(BaseTexture.from(args[HudEnums.FORCE_BAR].data));

    let forceMeter = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.FORCE_METER].data))
    );

    forceMeter.on("click", (e) => {
      this._forceMarker.visible = true;
      this._forceMarker.x = e.data.global.x - 72;
    });
    forceMeter.buttonMode = true;
    forceMeter.interactive = true;

    let force = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.FORCE].data))
    );

    let forceTrace = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.FORCE_TRACE].data))
    );

    this._forceMarker = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.FORCE_MARKER].data))
    );

    this._forceMarker.position.set(200, 26);

    forceMeter.position.set(84, 37);
    force.position.set(84, 38);
    forceTrace.position.set(84, 38);
    force.width = 100;
    forceTrace.width = 250;

    this.addChild(forceTrace);
    this.addChild(force);
    this.addChild(forceMeter);
    this.addChild(this._forceMarker);
  }
  OnLoadError(args: any): void {
    console.log(args);
  }
}

export default ForceBarAsset;
