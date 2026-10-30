import assert from 'node:assert/strict'
import test from 'node:test'

// Exercise the actual renderer with a known synthetic board, without changing
// the simulation or relying on the random board to contain both states.
test('true/false cells and legend share stable colors across restarts', async () => {
  const fills = []
  const properties = new Map()
  const context = {
    canvas: {},
    fillRect(...rect) { fills.push({ color: this.fillStyle, rect }) },
  }
  const controls = { time: {}, size: {}, canvas: { getContext: () => context } }
  globalThis.document = {
    getElementById: (id) => controls[id],
    documentElement: { style: { setProperty: (name, value) => properties.set(name, value) } },
    body: { style: {} },
  }
  globalThis.window = { innerWidth: 320, innerHeight: 480 }
  const { default: Engine } = await import('../src/engine.js')
  const { default: Colors } = await import('../src/colors.js')
  const random = Math.random
  Math.random = () => { throw new Error('A restart must not randomize the palette') }
  try {
    for (const size of [15, 30, 8, 15]) {
      controls.size.value = size
      Engine.restart()
      fills.length = 0
      Engine.render([[true, false], [false, true]])
      assert.deepEqual(fills.map(({ color }) => color), [Colors.alive, Colors.dead, Colors.dead, Colors.alive])
      assert.deepEqual(fills[1].rect, [size, 0, size, size])
      assert.equal(properties.get('--cell-alive'), Colors.alive)
      assert.equal(properties.get('--cell-dead'), Colors.dead)
      assert.equal(document.body.style.backgroundColor, Colors.dead)
      fills.length = 0
      Engine.render([[false, false], [false, true]])
      assert.deepEqual(fills.map(({ color }) => color), [Colors.dead])
    }
  } finally {
    Math.random = random
    delete globalThis.document
    delete globalThis.window
  }
})
