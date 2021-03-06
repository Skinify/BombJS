import PlayerEventsEnum from "../enuns/gameEnuns/PlayerEventsEnum";

class PlayerEvent extends Event {
  constructor(
    type: PlayerEventsEnum,
    bubbles: boolean = true,
    cancelable: boolean = false
  ) {
    super(type, {
      bubbles: bubbles,
      cancelable: cancelable,
    });
  }
}

export default PlayerEvent;
