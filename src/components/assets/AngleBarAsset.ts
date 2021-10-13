import { BaseTexture, Sprite, Texture } from "pixi.js";
import HudEnums from "../enuns/resourcesEnuns/HudEnum";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";

class AngleBarAsset extends Sprite implements IAsset {
  constructor() {
    super(Texture.EMPTY);
    AssetsManager.Instance.LoadAssets([
      {
        key: HudEnums.LEFT_BAR,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.LEFT_BAR}.png`,
      },
      {
        key: HudEnums.ANGLE,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.ANGLE}.png`,
      },
      {
        key: HudEnums.ANGLE_HOLDER,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.ANGLE_HOLDER}.png`,
      },
      {
        key: HudEnums.ANGLE_POINTER_HOLDER,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.ANGLE_POINTER_HOLDER}.png`,
      },
      {
        key: HudEnums.ANGLE_POINTER,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.ANGLE_POINTER}.png`,
      },
      {
        key: HudEnums.ANGLE_POINTER_TRACE,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.ANGLE_POINTER_TRACE}.png`,
      },
      {
        key: HudEnums.AUX_ATTACK_BUTTON,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.AUX_ATTACK_BUTTON}.png`,
      },
    ])
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));
  }

  OnLoad(args): void {
    this.texture = new Texture(BaseTexture.from(args[HudEnums.LEFT_BAR].data));
    let angle = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.ANGLE].data))
    );

    let angleHolder = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.ANGLE_HOLDER].data))
    );

    let anglePointer = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.ANGLE_POINTER].data))
    );

    let anglePointerTrace = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.ANGLE_POINTER_TRACE].data))
    );

    let anglePointerHolder = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.ANGLE_POINTER_HOLDER].data))
    );

    let auxAttackButton = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.AUX_ATTACK_BUTTON].data))
    );

    angle.scale.set(1.05, 1.05);
    angle.y = 12;
    angle.x = 12;

    angleHolder.scale.set(1.05, 1.05);
    angleHolder.y = 7;
    angleHolder.x = 7;

    anglePointerHolder.x = 52;
    anglePointerHolder.y = 52;

    anglePointerTrace.x = 58;
    anglePointerTrace.y = 58;
    anglePointerTrace.anchor.set(0, 0.5);

    anglePointer.anchor.set(0, 0.5);
    anglePointer.x = 58;
    anglePointer.y = 58;

    auxAttackButton.x = 130;
    auxAttackButton.y = 40;

    this.addChild(angleHolder);
    this.addChild(anglePointerTrace);
    this.addChild(anglePointer);
    this.addChild(anglePointerHolder);
    this.addChild(angle);
    this.addChild(auxAttackButton);
  }
  OnLoadError(args: any): void {
    console.log(args);
  }
}

export default AngleBarAsset;
