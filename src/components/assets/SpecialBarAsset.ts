import {
  AnimatedSprite,
  BaseTexture,
  Rectangle,
  Sprite,
  Texture,
} from "pixi.js";
import HudEnums from "../enuns/resourcesEnuns/HudEnum";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";
import HitAreaShapes from "hitarea-shapes";
import * as PIXI from "pixi.js";

class SpecialBarAsset extends Sprite implements IAsset {
  private _lightFilter;
  private _darkFilter;

  constructor() {
    super(Texture.EMPTY);
    AssetsManager.Instance.LoadAssets([
      {
        key: HudEnums.RIGHT_BAR,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.RIGHT_BAR}.png`,
      },
      {
        key: HudEnums.SPECIAL_METER,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.SPECIAL_METER}.png`,
      },
      {
        key: HudEnums.SPECIAL_SPRITESHEET,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.SPECIAL_SPRITESHEET}.png`,
      },
      {
        key: HudEnums.SPECIAL_DISABLED,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.SPECIAL_DISABLED}.png`,
      },
      {
        key: HudEnums.LIFE_BAR,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.LIFE_BAR}.png`,
      },
      {
        key: HudEnums.CHAT_BUTTON,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.CHAT_BUTTON}.png`,
      },
      {
        key: HudEnums.EMOTICON_BUTTON,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.EMOTICON_BUTTON}.png`,
      },
      {
        key: HudEnums.FRIENDS_BUTTON,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.FRIENDS_BUTTON}.png`,
      },
      {
        key: HudEnums.CONFIG_BUTTON,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.CONFIG_BUTTON}.png`,
      },
      {
        key: HudEnums.QUIT_BUTTON,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.QUIT_BUTTON}.png`,
      },
      {
        key: HudEnums.SUICIDE_BUTTON,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.SUICIDE_BUTTON}.png`,
      },
      {
        key: HudEnums.SPECIAL_HITAREA,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.SPECIAL_HITAREA}.json`,
      },
      {
        key: HudEnums.BUTTONS_HITAREA,
        path: `${paths.IMAGE_PATH}/hud/${HudEnums.BUTTONS_HITAREA}.json`,
      },
    ])
      .then((x) => this.OnLoad(x))
      .catch((x) => this.OnLoadError(x));

    this._lightFilter = new PIXI.filters.ColorMatrixFilter();
    this._lightFilter.brightness(1.2, false);

    this._darkFilter = new PIXI.filters.ColorMatrixFilter();
    this._darkFilter.brightness(0.8, false);
  }

  OnLoad(args): void {
    this.texture = new Texture(BaseTexture.from(args[HudEnums.RIGHT_BAR].data));

    let specialMeter = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.SPECIAL_METER].data))
    );
    specialMeter.position.set(26, 56);

    let lifeBar = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.LIFE_BAR].data))
    );
    lifeBar.position.set(127, 12);
    lifeBar.scale.set(1.08, 1.08);

    let specialDisabled = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.SPECIAL_DISABLED].data))
    );
    specialDisabled.position.set(3, 43);

    let chatButton = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.CHAT_BUTTON].data))
    );
    chatButton.position.set(62, 48);

    let emoticonButton = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.EMOTICON_BUTTON].data))
    );
    emoticonButton.position.set(76, 18);

    let friendsButton = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.FRIENDS_BUTTON].data))
    );
    friendsButton.position.set(96, -6);

    let configButton = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.CONFIG_BUTTON].data))
    );
    configButton.position.set(124, -20);

    let quitButton = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.QUIT_BUTTON].data))
    );
    quitButton.position.set(156, -24);

    let suicideButton = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.SUICIDE_BUTTON].data))
    );
    suicideButton.scale.set(0.9, 0.9);
    suicideButton.position.set(97, 48);

    let hitAreaButton = new HitAreaShapes(args[HudEnums.BUTTONS_HITAREA].data);
    this.ConfigurateButtons(hitAreaButton, [
      chatButton,
      emoticonButton,
      friendsButton,
      configButton,
      quitButton,
      suicideButton,
    ]);

    let w = 94;
    let h = 165;
    let ssheet = args[HudEnums.SPECIAL_SPRITESHEET].texture.baseTexture;
    let specialSheet = {};
    specialSheet["NORMAL"] = [
      new Texture(ssheet, new Rectangle(0, 0, w, h)),
      new Texture(ssheet, new Rectangle(1 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(2 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(3 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(4 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(5 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(6 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(7 * w, 0, w, h)),
      new Texture(ssheet, new Rectangle(8 * w, 0, w, h)),
    ];
    let special = new AnimatedSprite(specialSheet["NORMAL"]);

    const hitArea = new HitAreaShapes(args[HudEnums.SPECIAL_HITAREA].data);
    special.hitArea = hitArea;

    special.position.set(-16, -48);
    special.buttonMode = true;
    special.interactive = true;
    special.animationSpeed = 0.4;
    special.loop = true;
    special.on("click", () => {
      special.visible = false;
    });
    special.play();

    this.addChild(specialMeter);
    this.addChild(specialDisabled);
    this.addChild(special);
    this.addChild(lifeBar);
    this.addChild(chatButton);
    this.addChild(emoticonButton);
    this.addChild(friendsButton);
    this.addChild(configButton);
    this.addChild(quitButton);
    this.addChild(suicideButton);
  }

  OnLoadError(args: any): void {
    console.log(args);
  }

  ConfigurateButtons(hitArea: any, btns: Array<Sprite>): void {
    for (let i = 0; i < btns.length; i++) {
      let button = btns[i];
      button.on("pointerover", () => (button.filters = [this._lightFilter]));
      button.on("pointerout", () => (button.filters = []));
      button.on("pointerdown", () => (button.filters = [this._darkFilter]));
      button.on("pointerup", () => (button.filters = []));
      button.interactive = true;
      button.buttonMode = true;
      button.hitArea = hitArea;
    }
  }
}

export default SpecialBarAsset;
