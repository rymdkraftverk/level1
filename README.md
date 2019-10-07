# level1

> Delayed and repeated callback execution for games

This library is like `setTimeout` (`l1.once`) and `setInterval` (`l1.repeat`) controlled by updates from a game loop.

The main use case is games but can be used in any application that runs within a loop.

## Features

 - `l1.once(callback[, delay = 1])` 

 Run a callback function once after a delay. The callback is called with no arguments.

 - `l1.repeat(callback[, interval = 1])` 

 Run a callback function repeatedly in an interval. The callback is called with `updates` (number): The amount of updates since it was run the first time.

Both `once` and `repeat` return a `behavior` object. Has two mutable fields: `id` and `labels`.

### Other

- `get` - Get one behavior by id
- `getByLabel` - 
- `getAll`
- `remove` - Takes an `id` or `behavior` object. Marks the behavior for deletion. Will be deleted after all behaviors have been processed.
- `update` - Needs to be called on every game update.

## Docs

[Docs / API](https://rymdkraftverk.github.io/level1/)

---

## Installation

`npm install l1`

or

`yarn add l1`

---

## Examples

### With Pixi.js

```js
import * as l1 from 'l1'
import * as PIXI from 'pixi.js'

const app = new PIXI.Application()

document.body.appendChild(app.view)

app.ticker.add(l1.update())

// Example spritesheet
app.loader.add('assets/spritesheet.json')

app.loader.load(() => {
  const square = new PIXI.Sprite(
    texture, 
  )
  app.stage.addChild(square)
  
    // Move 1 pixel every 3 ticks
  const move = l1.repeat(() => {
    square.x += 1
    if (square.x > 500) {
      l1.remove('move')
    }
  }, 3)
  move.id = 'move'
})
```

---

## Recipes

### Keep state between game updates

Use a closure

```js
const move = () => {
  let x = 1

  l1.repeat(() => {
    x += 1
  })
}
```

### Deleting behaviors

`l1.remove` just marks the behavior for deletion, but it won't actually be deleted until all other behaviors have been processed.

Therefore, you might need to wait a game update before you continue:

```js
const gameOver = () => {
  l1.remove('gameLoop')
  // `l1.once` ensures that the following code won't be executed until the `gameLoop` behavior has been deleted.
  l1.once(() => {
    // Continue doing stuff
  })
}
```

---

## Other useful tools

[`juice.js`]() - Make your animations look nicer

[`muncher`]() - Generate sprite sheets from the command line

[`tiny-toolkit`]() - General game utils

[`pixi-ex`]() - Pixi.js util functions

---

## Develop

### Custom commands

Command | Description
------- | -----------
`yarn build` | Generate files in the `dist` folder
`yarn build:watch` | Continuously build files in the `dist` folder
`yarn clean` | Remove the `dist` folder
`yarn test` | Run the tests
`yarn test:watch` | Continuously run the tests
`yarn release` | Start the wizard to release a new version

### Workflow

To test changes, use the `template` project.

1. Build the `dist` files in the `level1` folder (`yarn build:watch`)
2. Go to the `template` folder
3. Run `yarn l1` to install `level1`
4. Run `yarn start` and `yarn watch` in separate terminal windows
5. Test your new features!

## TODO

Revise docs

Make sure only dist folder is published to npm

// Pixi usage guide
