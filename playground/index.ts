import { Application } from "pixi.js";
import { Live2DModel } from "../src";
import Live2D from "./Live2D";
import './Message';


export interface SpeechRecognition {
  continuous: Boolean;
  interimResults: Boolean;
  lang: string;
  maxAlternatives: number;
  recording: Boolean;
  transcription: string;
  start: Function;
  stop: Function;
  onerror: Function;
  onend: Function;
  onresult: Function;
  onstart: Function;
}

export interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

export interface CustomWindow extends Window {
  SpeechRecognition: SpeechRecognition | null;
  webkitSpeechRecognition: SpeechRecognition | null;
  Modules: {
    live2d: {
      app: Application,
      model: Live2DModel
    };
    // nlp: any;
    // recognition: SpeechRecognition;
  }
}

declare const window: CustomWindow;

window.Modules = {
  live2d: Live2D,
//   nlp: NLP,
//   recognition: SpeechRecognition,
};

document.getElementById('loader')!.style.display = 'none';