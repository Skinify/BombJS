import { Options, Sound, SoundLibrary } from "@pixi/sound";
import BaseManager from "./base/BaseManager";
import paths from "../../config/paths.json";
import SoundEffectEnum from "../enuns/resourcesEnuns/SoundEffectEnum";

class SoundManager extends BaseManager {
  private _loadedSounds: { [indice: string]: Sound };
  private _musicVolume: number;
  private _effectsVolume: number;
  private _defaultPlayingOptions: Options;
  protected static _instance: SoundManager | null;
  private _sound: SoundLibrary;
  private constructor() {
    super();
    this._musicVolume = 0.4;
    this._effectsVolume = 0.4;
    this._sound = new SoundLibrary();
    this._defaultPlayingOptions = {
      autoPlay: false,
      volume: this._musicVolume,
      singleInstance: true,
      complete: (loadedSound) => loadedSound.resume(),
    };
    this._loadedSounds = {};
  }

  static get Instance(): SoundManager {
    if (!this._instance) {
      this._instance = new SoundManager();
    }
    return this._instance;
  }

  Play(
    soundEffect: SoundEffectEnum,
    playMultiple: boolean = true,
    replaceSame = false
  ): void {
    try {
      if (!playMultiple) this._sound.stopAll();
      if (!this.IsSoundLoaded(soundEffect)) {
        let snd = Sound.from({
          ...this._defaultPlayingOptions,
          url: `${paths.SOUND_PATH}/${soundEffect.toString()}.mp3`,
        });
        this._loadedSounds[soundEffect.toString()] = snd;
      } else {
        if (!replaceSame) {
          if (!this.IsPlaying(soundEffect))
            this._loadedSounds[soundEffect.toString()].play();
        } else {
          this._loadedSounds[soundEffect.toString()].play();
        }
      }
    } catch (ex) {
      console.log("Houve um erro ao reproduzir o som: " + ex);
    }
  }

  IsPlaying(soundEffect: SoundEffectEnum): boolean {
    return this._loadedSounds[soundEffect.toString()].isPlaying;
  }

  Stop(soundEffect: SoundEffectEnum): void {
    this._loadedSounds[soundEffect.toString()].stop();
  }

  StopAll() {
    for (let i in this._loadedSounds) {
      this._loadedSounds[i].stop();
    }
  }

  PreLoadSound(soundEffect: SoundEffectEnum): void {
    if (!this.IsSoundLoaded(soundEffect)) {
      let snd = Sound.from({
        ...this._defaultPlayingOptions,
        url: `${paths.SOUND_PATH}/${soundEffect.toString()}.mp3`,
      });
      this._loadedSounds[soundEffect.toString()] = snd;
    }
  }

  PreLoadSounds(soundEffects: Array<SoundEffectEnum>): void {
    for (let i = 0; i < soundEffects.length; i++) {
      let soundEffect = soundEffects[i];
      if (!this.IsSoundLoaded(soundEffect)) {
        let snd = Sound.from({
          ...this._defaultPlayingOptions,
          preload: true,
          url: `${paths.SOUND_PATH}/${soundEffect.toString()}.mp3`,
        });
        this._loadedSounds[soundEffect.toString()] = snd;
      }
    }
  }

  private IsSoundLoaded(sound: SoundEffectEnum): boolean {
    if (typeof this._loadedSounds[sound] !== "undefined") return true;
    return false;
  }
}

export default SoundManager;
