import { logger } from "../src";
import { sampleBase64 } from "./Hiyori/sounds/sample_sounds";
import Live2D from "./Live2D";
import Motion from "./Motion";
import NekoConversationAPI, { NekoConversation } from "./api/conversation";


const { app, model } = Live2D;
const { expressions, motions } = Motion

const form = <HTMLFormElement>document.getElementById('form');
const input = <HTMLInputElement>document.getElementById('message');
const messages = <HTMLElement>document.getElementById('messages');

const createMessage = (sender: 'user' | 'reply', message: string) => {
  const div = document.createElement('div');

  div.className = sender;
  div.innerText = message;

  messages.append(div);
  div.scrollIntoView();
}

const callConversationAPI = async (promt: NekoConversation) => {
  const res = await NekoConversationAPI.conver(promt)
  if (res?.status == 200) {
    logger.log('message', 'call api conver success')
    return res.data
  } else {
    logger.error('message', 'call conver failed')
  }

}

const processMessage = async (message: string) => {
  // random delay for "authenticity"
  const delay = Math.random() * 1000 + 300;
  const motion = 'Idle'
  const motionIndex = 0
  const priority = 3
  // const sound = 'sounds/azure-aisha-th.wav'

  /** call brain  */
  const nekoConverPromt: NekoConversation = { 'user_name': 'fill', 'user_input': message }

  const res = await callConversationAPI(nekoConverPromt)
  logger.log('message', 'res ' + res)
  const answer = res['Message']
  const sound = "data:audio/wav;base64," + res['Data']
  // const sound = sampleBase64

  logger.log('message','sound'+ sound)

  setTimeout(() => {
    createMessage('reply', answer || "Sorry, I don't speak that language");
    model.motion(motion, motionIndex, priority, sound);
  }, delay);

  // const res = await NLP.process(message)
  // const { answer, intent } = res;

  // decide which motion to use by getting the last dot in intent
  // const intentMotion = intent.match(/\.(\w+)$/)?.[1];
  // const motionGroup = intent === 'None'
  //   ? 'disagree'
  //   : intentMotion in motions
  //     ? intentMotion
  //     : 'talk';

  // randomize motion group
  // const random = Math.round(Math.random() * (motions[motionGroup].length - 1));
  // const motion = motions[motionGroup][random];


}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = input.value.trim();

  if (!message.length) return;

  createMessage('user', message);
  processMessage(message);

  input.value = '';
});

export { createMessage, processMessage };