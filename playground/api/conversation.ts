import request from "./request";

export interface NekoConversation {
  user_name: string,
  user_input: string
}

export interface NekoCharSetting {
  char_name: string
  char_personal: string
  char_greeting: string
  world_scenario: string
  example_dialogue: string
}

export interface NekoGenerationSetting {
  do_sample: boolean
  max_new_tokens: number
  temperature: number
  top_p: number
  top_k: number
  typical_p: number
  repetition_penalty: number
  penalty_alpha: number
}

enum NekoTTSType {
  azure = "azure",
  gtts = "gtts"
}

export interface NekoRegister {
  user_name: string
  char_settings: NekoCharSetting
  generation_settings: NekoGenerationSetting
  tts: NekoTTSType
  target_speaker: string
  history: Array<Array<string>>;
}

const NekoConversationAPI = {
  register: async (nekoAiPropmtRegister: NekoRegister) => {
    try {
      const response = await request.post('/register', nekoAiPropmtRegister);
      return response;
    } catch (error) {
      console.error("error call neko Register api", error);
    }
  },
  conver: async (converData: NekoConversation) => {
    try {
      const response = await request.post('/conver', converData);
      return response;
    } catch (error) {
      console.error("error call neko Conversation api", error);
    }
  }
}

export default NekoConversationAPI;