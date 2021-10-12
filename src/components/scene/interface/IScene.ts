import { Container } from "pixi.js";

interface IScene extends Container {
  Load(): Promise<void>;
  Enter(): Container;
  Quit(): Promise<void>;
}

export default IScene;
