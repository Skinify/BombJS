export default (value) => {
  let key: any = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  key.hold = undefined;
  key.holdTimeout = 0;
  key.holdInterval = 0;
  key.holdFrequency = 100;
  //The `downHandler`
  key.downHandler = (event) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) {
        key.press();
        key.resetHold();
        if (key.hold) {
          key.holdTimeout = setTimeout(() => {
            key.holdInterval = setInterval(() => {
              key.hold();
            }, /*key.holdFrequency*/ 30);
          }, 100);
        }
      }
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = (event) => {
    if (event.key === key.value) {
      key.resetHold();
      if (key.isDown && key.release) {
        key.release();
      }
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  key.resetHold = () => {
    clearInterval(key.holdInterval);
    clearTimeout(key.holdTimeout);
    key.holdFrequency = 100;
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener("keydown", downListener, false);
  window.addEventListener("keyup", upListener, false);

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };

  return key;
};
