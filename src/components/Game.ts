import { Application } from "pixi.js";
import SceneEnum from "./enuns/gameEnuns/SceneEnum";
import SceneManager from "./managers/SceneManager";

class Game extends HTMLElement {
  app: Application;
  constructor() {
    super();
    this.app = new Application({
      useContextAlpha: true,
      width: 1000,
      height: 600,
      forceCanvas: true,
      antialias: true,
      resolution: 1,
      backgroundAlpha: 1,
      preserveDrawingBuffer: true,
      clearBeforeRender: true,
    });
    this.appendChild(this.app.view);
    this.app.stage.interactive = true;
    this.app.stage.interactiveChildren = true;
  }

  connectedCallback() {
    try {
      let scene = SceneManager.Instance.Start(SceneEnum.FIGHT);
      scene
        .then((loadedScene) => {
          this.app.stage.addChild(loadedScene.Enter());
        })
        .catch((ex) => {
          console.log(ex);
        });
    } catch (ex) {
      console.log(ex);
    }
  }
}

customElements.define("bomb-game", Game);

export default Game;
