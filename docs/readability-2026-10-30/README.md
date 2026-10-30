# Cell state readability — 2026-10-30 UTC

Implementation: [`9bd246533b9d853489f854cd8e253bbb23882292`](https://github.com/adam-zielonka/game-of-life/commit/9bd246533b9d853489f854cd8e253bbb23882292). The package does not declare a version. These images show that code; the following documentation commit only publishes evidence.

## Result

One stable palette is offered: Alive is dark navy `#111827`, Dead is light `#f8fafc`. Canvas rendering and legend swatches use the same `src/colors.js` values through CSS custom properties. The visible legend is on a solid white background, with bordered samples. It remains visible during simulation and after resets. The previous four randomly selected pairs and reversed orientations are historical, rather than selectable palettes after this change.

The simulation rules, random board generator, Start confirmation, reset, Time, Size and existing seizure warning remain unchanged. There is no pause or palette selector. This work does not assess seizure risk or claim that it has been eliminated.

## Method

- Chromium 156.0.8078.4, Node.js, existing Playwright; local production Vite build. Capture timestamp: 2026-10-30T11:22:09.599Z.
- Desktop 1280×1000 uses keyboard Enter/Space/Tab. Phone 390×844 uses a touch context and real taps. Frames include the initial warning, running Size 15, and reset Size 30. Every image contains synthetic boards only.
- Test-only `Math.random` uses LCG seed 117 for repeatable synthetic boards. The application's random module and simulation rules are not replaced. Timers remain real. Time is set to 20000 ms to keep comparable capture frames stable; the existing narrow input may show only part of that long test value. A separate Time 40 ms check observes actual generation changes, then restores the capture setting.
- Six restarts per viewport, with Size 30/8/15/20/30/15, plus final settings reset: the same two canvas colors and legend samples remain. Both states are sampled from opaque canvas pixels. A renderer regression test separately supplies explicit true/false cells to establish their semantic mapping, verifies unchanged-cell caching and resets, and rejects random palette calls.
- Gray images use `html { filter: grayscale(1) }` for screenshots only, removed before continuing the controls test. No production UI is hidden or restyled. This is not a physical monochrome panel test or a full WCAG audit.
- Screenshot pixels give Alive/Dead 16.96:1 in color and 17.01:1 in CSS grayscale. Legend text on its white background is 17.74:1 in color. Both state labels and samples were visually inspected in color and gray. The warning overlays the board and settings in the initial frames, as before.
- Fresh viewports 320/360/390/768/1280/1440: document width equals viewport width; no page errors. The initial warning remains present and Start removes it, as before.

## Validation

`pnpm test`, `pnpm build` and `pnpm audit --audit-level=high` pass. The test uses Node's built-in runner and is included in CI. Node emits an informational module-type detection warning for the existing ESM `.js` source layout; no test failure or browser error occurs.

`verify.cjs` is a standalone browser harness. It uses existing Playwright and headless Chromium paths on ted117 (with `/tmp/tetris-sysroot`), starts no server and installs nothing. Set `ISSUE32_URL` to a running production build or public Pages URL, and `ISSUE32_OUT` to an external output directory. `report.json` records the local run; final issue delivery records the separate public verification.

| View | Color | CSS grayscale |
| --- | --- | --- |
| Desktop, warning | [PNG](desktop-warning-color.png) | [PNG](desktop-warning-gray.png) |
| Desktop, running | [PNG](desktop-running-color.png) | [PNG](desktop-running-gray.png) |
| Desktop, reset | [PNG](desktop-reset-color.png) | [PNG](desktop-reset-gray.png) |
| Phone, warning | [PNG](phone-warning-color.png) | [PNG](phone-warning-gray.png) |
| Phone, running | [PNG](phone-running-color.png) | [PNG](phone-running-gray.png) |
| Phone, reset | [PNG](phone-reset-color.png) | [PNG](phone-reset-gray.png) |
