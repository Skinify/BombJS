import {
  BaseTexture,
  Container,
  Graphics,
  Sprite,
  Text,
  Texture,
} from "pixi.js";
import HudEnums from "../enuns/resourcesEnuns/HudEnum";
import AssetsManager from "../managers/AssetsManager";
import IAsset from "./interface/IAsset";
import paths from "../../config/paths.json";
import Player from "../physics/Player";
import PlayerEventsEnum from "../enuns/gameEnuns/PlayerEventsEnum";

class AngleBarAsset extends Sprite implements IAsset {
  private _angleHolder: Sprite;
  private _sector: Graphics;
  private _lastShootAngle: any;
  private _anglePointer: Sprite;
  private _player: Player;
  private _container: Container;
  private _recordRotation: number;
  private _angleText: Text;
  private _anglePointerTrace: Sprite;

  constructor(player: Player) {
    super(Texture.EMPTY);
    this._angleHolder = new Sprite(Texture.EMPTY);
    this._anglePointerTrace = new Sprite(Texture.EMPTY)
    this._sector = this._DrawSector(0, 0, 55, 0, 90);
    this._anglePointer = new Sprite();
    this._angleText = new Text("This is a PixiJS text", {
      align: "right",
      fontFamily: "Arial",
      fontWeight: "bold",
      fontSize: 16,
      stroke: "black",
      strokeThickness: 3,
      fill: 0xffffff,
      dropShadow: true,
      dropShadowAlpha: 0.6,
      dropShadowDistance: 0,
      dropShadowAngle: 0,
      letterSpacing: -0.5,
      dropShadowBlur: 10,
    });
    this._player = player;
    this._container = new Container();
    this._recordRotation = 0;

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

    this._angleHolder = new Sprite(
      new Texture(BaseTexture.from(args[HudEnums.ANGLE_HOLDER].data))
    );

    this._anglePointer.texture = new Texture(
      BaseTexture.from(args[HudEnums.ANGLE_POINTER].data)
    );

    this._anglePointerTrace = new Sprite(
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

    this._angleHolder.scale.set(1.05, 1.05);
    this._angleHolder.pivot.set(
      this._angleHolder.height / 2,
      this._angleHolder.width / 2
    );
    this._angleHolder.y = 61;
    this._angleHolder.x = 61;

    anglePointerHolder.x = 52;
    anglePointerHolder.y = 52;

    this._anglePointerTrace.x = 58;
    this._anglePointerTrace.y = 58;
    this._anglePointerTrace.anchor.set(0, 0.5);
    this._anglePointerTrace.scale.x = 0.92;

    this._anglePointerTrace.visible = false

    this._anglePointer.anchor.set(0, 0.5);
    this._anglePointer.x = 58;
    this._anglePointer.y = 58;
    this._anglePointer.scale.x = 0.92;

    this._sector.pivot.set(0, 0.5);
    this._sector.x = 58;
    this._sector.y = 58;
    this._sector.scale.set(0.9, 0.9);

    auxAttackButton.x = 130;
    auxAttackButton.y = 40;

    this._angleText.position.set(42, 68);

    this.addChild(this._sector);
    this.addChild(this._angleHolder);
    this.addChild(this._anglePointerTrace);
    this.addChild(this._anglePointer);
    this.addChild(anglePointerHolder);
    this.addChild(angle);
    this.addChild(auxAttackButton);
    this.addChild(this._angleText);

    this._Reset();
    this._AddEventListeners();
  }
  OnLoadError(args: any): void {
    console.log(args);
  }

  private _ChangeSectorAngle(
    graphics: Graphics,
    x: number,
    y: number,
    radius: number,
    sAngle: number,
    lAngle: number
  ) {
    var nx: number = NaN;
    var ny: number = NaN;
    graphics.clear();
    var sx: number = radius;
    var sy: number = 0;
    if (sAngle != 0) {
      sx = Math.cos((sAngle * Math.PI) / 180) * radius;
      sy = Math.sin((sAngle * Math.PI) / 180) * radius;
    }
    graphics.beginFill(0xc0dba2, 0.6);
    graphics.moveTo(x, y);
    graphics.lineTo(x + sx, y - sy);
    var a: number = (lAngle * Math.PI) / 180 / lAngle;
    var cos: number = Math.cos(a);
    var sin: number = Math.sin(a);
    for (var i: number = 0; i < lAngle; i++) {
      nx = cos * sx - sin * sy;
      ny = cos * sy + sin * sx;
      sx = nx;
      sy = ny;
      graphics.lineTo(sx + x, -sy + y);
    }
    graphics.lineTo(x, y);
    graphics.endFill();
  }

  private _DrawSector(
    x: number,
    y: number,
    radius: number,
    sAngle: number,
    lAngle: number
  ): Graphics {
    var nx: number = NaN;
    var ny: number = NaN;
    var graphics: Graphics = new Graphics();
    var sx: number = radius;
    var sy: number = 0;
    if (sAngle != 0) {
      sx = Math.cos((sAngle * Math.PI) / 180) * radius;
      sy = Math.sin((sAngle * Math.PI) / 180) * radius;
    }

    graphics.beginFill(0xc0dba2, 0.6);
    graphics.moveTo(x, y);
    graphics.lineTo(x + sx, y - sy);
    var a: number = (lAngle * Math.PI) / 180 / lAngle;
    var cos: number = Math.cos(a);
    var sin: number = Math.sin(a);
    for (var i: number = 0; i < lAngle; i++) {
      nx = cos * sx - sin * sy;
      ny = cos * sy + sin * sx;
      sx = nx;
      sy = ny;
      graphics.lineTo(sx + x, -sy + y);
    }
    graphics.lineTo(x, y);
    graphics.endFill();

    return graphics;
  }

  private _WeapAngle(): void {
    var temp: number = 0;
    if (this._player.Direction == -1) {
      temp = 0;
    } else {
      temp = 180;
    }
    if (this._player.GunAngle < 0) {
      this._anglePointer.angle =
        360 - (this._player.GunAngle - 180 + temp) * this._player.Direction;
    } else {
      this._anglePointer.angle =
        360 - (this._player.GunAngle + 180 + temp) * this._player.Direction;
    }
    this._lastShootAngle = this._player.GunAngle;
    this._AngleText =
      this._player.GunAngle +
      this._player.PlayerAngle * -1 * this._player.Direction;
  }

  private set _AngleText(value: number) {
    this._angleText.text = value.toString();
    let valueLenght = value.toString().length;
    if (valueLenght === 1) {
      this._angleText.x = 52;
    } else if (valueLenght === 2) {
      this._angleText.x = 48;
    } else {
      this._angleText.x = 44;
    }
  }

  private _Reset(): void {
    this._ChangeSectorAngle(
      this._sector,
      0,
      0,
      55,
      Player.MIN_ANGLE,
      Player.MAX_ANGLE - Player.MIN_ANGLE
    );
  }

  private _ChangeDirection(): void {
    if (this._player.Direction == -1) {
      this._sector.scale.set(-0.9, 0.9);
      this._anglePointer.scale.y = -1;
    } else {
      this._sector.scale.set(0.9, 0.9);
      this._anglePointer.scale.y = 1;
    }
    this._WeapAngle();
  }

  private _ChangeAngle(): void {
    var dis: number = this._anglePointer.rotation - this._player.PlayerAngle;
    this._sector.angle = this._player.PlayerAngle;
    this._angleHolder.angle = this._player.PlayerAngle;

    var temp: number = 0;
    if (this._player.Direction == -1) {
      temp = 0;
    } else {
      temp = 180;
    }

    if (this._player.GunAngle < 0) {
      this._anglePointer.angle =
        360 -
        (this._player.GunAngle - 180 + temp) * this._player.Direction +
        this._player.PlayerAngle;
    } else {
      this._anglePointer.angle =
        360 -
        (this._player.GunAngle + 180 + temp) * this._player.Direction +
        this._player.PlayerAngle;
    }

    this._recordRotation += dis;
  }

  private _SetArrowClone(): void {
    if(!this._player.IsAttacking)
    {
      this._anglePointerTrace.visible = true;
      this._recordRotation = this._anglePointer.angle
      this._anglePointerTrace.angle = this._recordRotation;
    }
  }

  private _FlyChanged(): void {}

  private _PlayerDie(): void {}

  private _AddEventListeners(): void {
    this._player.on(
      PlayerEventsEnum.GUN_ANGEL_CHANGED,
      this._WeapAngle.bind(this)
    );
    this._player.on(
      PlayerEventsEnum.DIR_CHANGED,
      this._ChangeDirection.bind(this)
    );
    this._player.on(
      PlayerEventsEnum.PLAYER_ANGEL_CHANGED,
      this._ChangeAngle.bind(this)
    );
    this._player.on(
      PlayerEventsEnum.ATTACKING_CHANGED,
      this._SetArrowClone.bind(this)
    );
    this._player.on(PlayerEventsEnum.FLY_CHANGED, this._FlyChanged.bind(this));
    this._player.on(PlayerEventsEnum.DIE, this._PlayerDie.bind(this));
    this._player.on(PlayerEventsEnum.RESET, this._Reset.bind(this));
  }
}

export default AngleBarAsset;
