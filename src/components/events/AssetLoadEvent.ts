import AssetLoadEventEnum from "../enuns/gameEnuns/AssetLoadEventEnum";

class AssetLoadEvent extends Event {
  constructor(type: AssetLoadEventEnum) {
    super(type, {
      bubbles: true,
      cancelable: false,
    });
  }
}

export default AssetLoadEvent;
