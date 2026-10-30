import Colors from './colors.js'
import Settings from './settings.js'

const ctx = document.getElementById('canvas').getContext('2d')
const { alive: colorLife, dead: colorDead } = Colors
let lastBoard = null
let size = Settings.size

function renderCell(i, j, life) {
  if (lastBoard && lastBoard[i][j] === life) return
  ctx.fillStyle = life ? colorLife : colorDead
  ctx.fillRect(j * size, i * size, size, size)
}

function render(board) {
  board.forEach((line, i) => line.forEach((cell, j) => renderCell(i, j, cell)))
  lastBoard = board
}

function restart() {
  lastBoard = null
  size = Settings.size
  document.documentElement.style.setProperty('--cell-alive', colorLife)
  document.documentElement.style.setProperty('--cell-dead', colorDead)

  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight
  document.body.style.backgroundColor = colorDead
}

export default {
  render,
  restart,
}
