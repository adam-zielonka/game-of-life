import { getRandom, getRandomBool } from './utils'

const COLORS_PAIRS = [
  ['green', 'yellow'],
  ['red', 'pink'],
  ['blue', 'turquoise'],
  ['orange', 'purple'],
]

function random() {
  const [color1, color2] = COLORS_PAIRS[getRandom(0, COLORS_PAIRS.length)]

  return getRandomBool() ? [color1, color2] : [color2, color1]
}

export default {
  random,
}
