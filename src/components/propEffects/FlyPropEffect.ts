import { Texture } from "@pixi/core";
import { AnimatedSprite } from "@pixi/sprite-animated";
import { Rectangle } from "pixi.js";
import PropEffectEnum from "../enuns/resourcesEnuns/PropEffectEnum";
import AssetsManager from "../managers/AssetsManager";
import Player from "../physics/Player";

class FlyPropEffect extends AnimatedSprite {
  private _player: Player;
  constructor(player: Player) {
    super([Texture.EMPTY]);
    this._player = player;
    let res = AssetsManager.Instance.GetPreloaded(
      PropEffectEnum.PROP_USE_EFFECT
    );
    if (res.texture) {
      let t = res.texture.baseTexture;
      let h = 185;
      let w = 3629 / 19;

      let c = 0;
      let spriteObj: Array<Texture> = [];
      while (true) {
        spriteObj.push(new Texture(t, new Rectangle(c * w, 0, w, h)));
        c++;
        if (c === 19) break;
      }
      this.textures = spriteObj;
    }
    this.animationSpeed = 0.6;
    this.position.set(this._player.BodyPos.x, this._player.BodyPos.y);
    this.loop = false;
    this.play();
    this.onComplete = () => (this.visible = false);
  }
}

export default FlyPropEffect;
