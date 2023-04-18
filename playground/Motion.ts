const expressions = { happy: 1, sad: 2, angry: 3 };
const motions: {[key: string]: Array<[string, number]>} = {
  talk: [
    ['tap_body', 0],
    ['tap_body', 2],
    ['pinch_out', 0],
    ['flick_head', 1],
    ['flick_head', 2],
  ],
  cheer: [
    ['tap_body', 1]
  ],
  mouthcover: [
    ['pinch_in', 0],
    ['pinch_in', 1],
    ['pinch_in', 2],
  ],
  disagree: [
    ['pinch_out', 1],
    ['pinch_out', 2],
  ],
  surprised: [
    ['shake', 0],
    ['shake', 2],
  ],
  laugh: [
    ['shake', 1],
  ]
};

export default { expressions, motions }