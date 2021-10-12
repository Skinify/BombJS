import { Resource, Texture } from "@pixi/core";
import { AnimatedSprite } from "@pixi/sprite-animated";
import MoveStripAssetImage from "../../images/moveStrip/1.png";

class MoveStripAsset extends AnimatedSprite {
  constructor() {
    let t: Texture<Resource>[] = [];

    /*
    for (let i = 0; i < textures.length; i++) {
      t.push(Texture.from(textures[i]));
    }*/

    t.push(Texture.from(MoveStripAssetImage));

    super(t);
  }
}

export default MoveStripAsset;
