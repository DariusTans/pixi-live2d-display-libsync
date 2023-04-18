import { Application, Ticker } from 'pixi.js';
import { Live2DModel, logger, MotionPreloadStrategy } from '../src';
import NekoTTSApi, { NekoDataTTS } from './api/tts';

Live2DModel.registerTicker(Ticker);

//controll loader
const canvas = document.getElementById('canvas') as HTMLCanvasElement;


// const modelURL = 'https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/Live2D/Senko_Normals/senko.model3.json';
const modelURL =  'Hiyori/Hiyori.model3.json'
// const modelURL = 'neko-model/shizuku.model.json';

const callTTS = async (text: NekoDataTTS) => {
    const response = await NekoTTSApi.call(text)
    // const response = await NekoTTSApi.test()
    if (response?.status == 200) {
        logger.log('main', 'call api tts success')
        return response.data
    } else {
        logger.error('main', 'call tts failed')
    }

}

const app = new Application({
        resizeTo: window,
        view: canvas,
        transparent: true
    });
    (window as any).app = app;

    const model = await Live2DModel.from(modelURL);

async function main() {
    

    app.stage.addChild(model);

    //call api tts 
    const textTTS: NekoDataTTS = {
        "text": "Hello world! my name is Neko to day i will try to help you",
        "lang": "en-US",
        "voice_name": "en-US-JennyNeural",
        "style": "cheerful",
        "target_speaker": "aisha",
    }
    const textTTS_TH: NekoDataTTS = {
        "text": "การเดินทางตลอดหนึ่งปีที่ผ่านมา เราต้องเจอกับเรื่องราวมากมาย เผชิญหน้ากับเหตุการณ์ไม่คาดคิด และรับมือกับหลายความรู้สึกที่เกาะกุมอยู่ในใจ  ด้วยเหตุนี้ ยิ่งใกล้ช่วงท้ายปี หลายคนเลยอยากปล่อยให้ ปีเก่า เป็นเรื่องราวของ ปีเก่าพร้อมทิ้งเรื่องราวเดิมๆ ไว้ข้างหลังและมุ่งหน้าสู่การเดินทางใหม่ที่กำลังจะมาถึง ",
        "lang": "th-TH",
        "voice_name": "th-TH-PremwadeeNeural",
        "style": "cheerful",
        "target_speaker": "aisha",
    }
    // const audioFromAPI = await callTTS(textTTS_TH)
    // const base64Audio = 'data:audio/wav;base64,'+audioFromAPI['data']


    
    // interaction
    // model.on('hit', (hitAreas) => {
    //     if (hitAreas.includes('head')) {
    //         logger.log('main', 'start motion body')
    //         model.motion('Taphead', 0, 3, base64Audio);
    //     }
    // });

}

// TODO: it has to be done twice, idk why
fitModel();
setTimeout(() => fitModel(), 250);

function fitModel() {
  const breakpoint = {
    md: window.innerWidth > 720 && window.innerWidth < 1000,
    lg: window.innerWidth >= 1000
  };

  // set canvas and renderer before model
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // width doesnt matter on md++
  if (!breakpoint.md && !breakpoint.lg) {
    app.renderer.screen.width = window.innerWidth;
  }
  app.renderer.screen.height = window.innerHeight;

  const anchor = {
    x: breakpoint.lg ? 1 : 0.5,
    y: 0.85
  };

  const scale = {
    x: breakpoint.lg ? 0.3 : breakpoint.md ? 0.25 : 0.20,
    y: breakpoint.lg ? 0.3 : breakpoint.md ? 0.25 : 0.20
  };

  const width = breakpoint.md
    ? model.width / 2.35
    : breakpoint.lg
      ? model.width / 1.35
      : app.renderer.screen.width / 2;

  const height = breakpoint.md || breakpoint.lg
    ? app.renderer.screen.height
    : model.height;

  model.anchor.set(anchor.x, anchor.y);
  model.scale.set(scale.x, scale.y);
  model.x = width;
  model.y = height;
}

window.addEventListener('resize', fitModel);


main().then();

export default { app, model }