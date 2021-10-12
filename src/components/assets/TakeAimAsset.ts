import { Resource, Texture } from "@pixi/core";
import { AnimatedSprite } from "@pixi/sprite-animated";
import AimAssetImage from "../../images/aim/1.png";

class TakeAimAsset extends AnimatedSprite {
  constructor() {
    let t: Texture<Resource>[] = [];

    /*
    for (let i = 0; i < textures.length; i++) {
      t.push(Texture.from(textures[i]));
    }*/

    t.push(Texture.from(AimAssetImage));

    super(t);
  }
}

export default TakeAimAsset;
