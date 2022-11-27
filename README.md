<img src="./level1.png">
<h4 align="center">
  Game utility: Trigger a function after a set amount of game updates.
</h4>
<div align="center">
  <img src="https://badgen.net/npm/v/l1?icon=npm" />
  <!-- <img src="https://badgen.net/npm/dw/l1?icon=npm" /> -->
  <img src="https://badgen.net/bundlephobia/minzip/l1" />
  <img src="https://badgen.net/github/last-commit/rymdkraftverk/level1?icon=github" />
</div>

---

## :sparkles: Features

This library is like `setTimeout` and `setInterval` controlled by updates from a game loop.

This way, if you want to something to happen in your game after 60 updates, you just have to write:

```ts
await delay(60)
transitionToNextScreen()
```

In order for this to work, you need to call `update` on every update. If you are using PixiJS this would mean that somewhere in your code you have to write:

```ts
ticker.add(update)
```

---

## API

- `delay(duration, options)` - Wait a set duration of game updates

```ts
await delay(60)
// Do something once after 60 game updates
```

- [`forever(callback, interval, options)` ](docs/forever.md) - Call a function `forever`, each interval game update

```ts
const interval = 60
forever(() => {
  // Do something forever each 60 game updates
}, interval)
```

- [`every(callback, duration, options)` ](docs/every.md) - Call a function `every` update until duration is reached

```ts
const duration = 60
await l1.every(() => {
  // Do something every game update until 60 game updates have passed
}, duration)
```

- [`update(deltaTime)`](docs/update.md) - Needs to be called on every game update

### Utils

- [`getAll()`](docs/getAll.md) - Get all behaviors

- [`get(id)`](docs/get.md) - Get one behavior by id

- [`getByLabel(label)`](docs/getByLabel.md) - Get a list of behaviors with a label

- `cancel(behavior)` - Takes an `id` or `behavior` object. Marks the behavior for cancellation. Will be cancelled after all behaviors have been processed in the current game update.

---

Start by calling `createInstance`.

```ts
const { update, delay } = createInstance()

// Call update every game update
ticker.add(update)
await delay(60)
```

---

## :package: Install

```sh
npm install l1
```

---

## Getting started - once

TODO: Better examples

```ts
import * as l1 from 'l1'
import * as PIXI from 'pixi.js'

const app = new PIXI.Application()

document.body.appendChild(app.view)

app.ticker.add(l1.update)

app.loader.load(() => {
  const square = new PIXI.Sprite(texture)
  app.stage.addChild(square)

  // Move 1 pixel every 3 ticks
  const move = l1.repeat(
    () => {
      square.x += 1
      if (square.x > 500) {
        l1.cancel('move')
      }
    },
    3,
    { id: 'move' },
  )
})
```

---

## Recipes

### Deleting behaviors

`cancel` just marks the behavior for cancellation, but it won't actually be cancelled until the next update

Therefore, you might need to wait a game update before you continue:

```ts
const gameOver = () => {
  cancel('gameLoop')
  // Ensures that the game doesn't continue until the `gameLoop` behavior has been deleted
  await delay(1)
  // Continue
}
```

### Log `update` duration

Use `performance.now`

```ts
import * as l1 from 'l1'

app.ticker.add((deltaTime) => {
  const before = performance.now()

  l1.update(deltaTime)

  const after = performance.now()
  const delta = after - before
})
```

### Log update duration averages

### Catch errors

Wrap `l1.update` with a try catch

```ts
import * as l1 from 'l1'

app.ticker.add((deltaTime) => {
  try {
    l1.update(deltaTime)
  } catch (error) {
    console.error(error)
    logToExternalService(error)
  }
})
```

### Use delay in a loop

Use a `for..of` loop

```ts
for (const item of list) {
  doStuff(item)
  await delay(50)
}
```
