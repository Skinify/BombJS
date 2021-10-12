import { Container } from "pixi.js";

interface IScene {
  Load(): Promise<void>;
  Enter(): Container;
  Quit(): Promise<void>;
}

export default IScene;
