import { Container } from "pixi.js";
import AngleBarAsset from "../assets/AngleBarAsset";
import FlyButtonAsset from "../assets/FlyButtonAsset";
import ForceBarAsset from "../assets/ForceBarAsset";
import PlayerImageAsset from "../assets/PlayerImageAsset";
import SpecialBarAsset from "../assets/SpecialBarAsset";
import PropBarAsset from "../assets/PropBarAsset";
import SmallMapAsset from "../assets/SmallMapAsset";
import Player from "../physics/Player";

class HudView extends Container {
  private _angleBar: AngleBarAsset;
  private _powerBar: SpecialBarAsset;
  private _flyButton: FlyButtonAsset;
  private _forceBar: ForceBarAsset;
  private _propBar: PropBarAsset;
  private _smallMap: SmallMapAsset;
  private _playerImage: PlayerImageAsset;
  constructor(player: Player) {
    super();
    this._angleBar = new AngleBarAsset(player);
    this._powerBar = new SpecialBarAsset();
    this._flyButton = new FlyButtonAsset();
    this._forceBar = new ForceBarAsset();
    this._propBar = new PropBarAsset();
    this._smallMap = new SmallMapAsset();
    this._playerImage = new PlayerImageAsset();
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
    this._propBar.position.set(660, 552);
    this._smallMap.position.set(804, 1);
    this._playerImage.position.set(4, 2);
    this.addChild(this._angleBar);
    this.addChild(this._powerBar);
    this.addChild(this._flyButton);
    this.addChild(this._forceBar);
    this.addChild(this._propBar);
    this.addChild(this._smallMap);
    this.addChild(this._playerImage);
  }
}

export default HudView;
