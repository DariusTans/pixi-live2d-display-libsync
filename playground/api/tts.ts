import request from "./request";

export interface NekoDataTTS{
  text: string,
  lang: string,
  voice_name: string,
  style: string,
  target_speaker: string
}

const NekoTTSApi= {
  call: async (ttsData: NekoDataTTS) => {
    try {
      const response = await request.post('/get_wav', ttsData);
      return response;
    } catch (error) {
      console.error("error call neko TTS api", error);
    }
  },
  test: async () => {
    try {
      const response = await request.get('/test');
      return response;
    } catch (error) {
      console.error('faild')
    }
  }
};

export default NekoTTSApi;