import { Container } from "pixi.js";
import AngleBarAsset from "../assets/AngleBarAsset";
import FlyButtonAsset from "../assets/FlyButtonAsset";
import ForceBarAsset from "../assets/ForceBarAsset";
import PowerBarAsset from "../assets/PowerBarAsset";
import PropBarAsset from "../assets/PropBarAsset";

class HudView extends Container {
  private _angleBar: AngleBarAsset;
  private _powerBar: PowerBarAsset;
  private _flyButton: FlyButtonAsset;
  private _forceBar: ForceBarAsset;
  private _propBar: PropBarAsset;
  constructor() {
    super();
    this._angleBar = new AngleBarAsset();
    this._powerBar = new PowerBarAsset();
    this._flyButton = new FlyButtonAsset();
    this._forceBar = new ForceBarAsset();
    this._propBar = new PropBarAsset();
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
    this._forceBar.position.set(60, 538);
    window.Temp = this._propBar;
    this.addChild(this._angleBar);
    this.addChild(this._powerBar);
    this.addChild(this._flyButton);
    this.addChild(this._forceBar);
    this.addChild(this._propBar);
  }
}

export default HudView;
