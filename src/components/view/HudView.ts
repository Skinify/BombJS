import { Container } from "pixi.js";
import AngleBarAsset from "../assets/AngleBarAsset";
import FlyButtonAsset from "../assets/FlyButtonAsset";
import PowerBarAsset from "../assets/PowerBarAsset";

class HudView extends Container {
  private _angleBar: AngleBarAsset;
  private _powerBar: PowerBarAsset;
  private _flyButton: FlyButtonAsset;
  constructor() {
    super();
    this._angleBar = new AngleBarAsset();
    this._powerBar = new PowerBarAsset();
    this._flyButton = new FlyButtonAsset();
    this._angleBar.height = 118;
    this._angleBar.width = 297;
    this._powerBar.height = 103;
    this._powerBar.width = 193;
    this._angleBar.y = 603 - this._angleBar.height;
    this._angleBar.x = -2;
    this._powerBar.y = 600 - this._powerBar.height;
    this._powerBar.x = 1000 - this._powerBar.width;
    this._flyButton.y = 490;
    this._flyButton.x = 90;
    this.addChild(this._angleBar);
    this.addChild(this._powerBar);
    this.addChild(this._flyButton);
  }
}

export default HudView;
