import { Options, sound, SoundSourceMap } from "@pixi/sound";
import BaseManager from "./base/BaseManager";
import paths from "../../config/paths.json";
import SoundEffectEnum from "../enuns/resourcesEnuns/SoundEffectEnum";

class SoundManager extends BaseManager {
  private loadedSounds: Array<string>;
  private _musicVolume: number;
  private _effectsVolume: number;
  private _defaultPlayingOptions: Options;
  protected static _instance: SoundManager | null;
  private constructor() {
    super();
    this.loadedSounds = [];
    this._musicVolume = 100;
    this._effectsVolume = 100;
    this._defaultPlayingOptions = {
      autoPlay: false,
      volume: this._musicVolume,
      complete: (loadedSound) => loadedSound.resume(),
    };
  }

  static get Instance(): SoundManager {
    if (!this._instance) {
      this._instance = new SoundManager();
    }
    return this._instance;
  }

  Play(soundEffect: SoundEffectEnum, playMultiple: boolean = false): void {
    try {
      if (!playMultiple) sound.stopAll();
      if (!this.IsSoundLoaded(soundEffect)) {
        sound.add(soundEffect.toString(), {
          ...this._defaultPlayingOptions,
          url: `${paths.SOUND_PATH}/${soundEffect.toString()}.flv`,
        });
      } else {
        sound.play(soundEffect.toString());
      }
    } catch (ex) {
      console.log("Houve um erro ao reproduzir o som: " + ex);
    }
  }

  Stop(soundEffect: SoundEffectEnum): void {
    sound.stop(soundEffect.toString());
  }

  StopAll() {
    sound.stopAll();
  }

  PreLoad(soundEffect: SoundEffectEnum): void {
    if (!this.IsSoundLoaded(soundEffect)) {
      sound.add(
        soundEffect.toString(),
        `${paths.SOUND_PATH}/${soundEffect.toString()}.flv`
      );
    }
  }

  private IsSoundLoaded(sound: SoundEffectEnum): boolean {
    for (let i: number = 0; i < this.loadedSounds.length; i++) {
      this.loadedSounds[i] == sound.toString();
      return true;
    }
    return false;
  }
}

export default SoundManager;
