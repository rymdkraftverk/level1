# level1

> A utility library for [`pixi.js`](https://github.com/pixijs/pixi.js).

## Features

Replaces pixi's `addChild` with [`l1.add`](https://rymdkraftverk.github.io/level1/add). It improves display object management by extending pixi display objects with:

- id
- zIndex
- labels

Other features:

- [Behaviors](https://rymdkraftverk.github.io/level1/addBehavior). Dynamically add and remove behaviors in the game.
- Resize text objects without blurriness
- Resize the canvas and retain the correct proportions
- Function to get pre-loaded textures
- Function to get the global position of a display object
- Function to get the distance and angle between two positions.
- Collision detection
- Detect overlapping area
- Sound
- Keyboard input

## Index

1. [Getting started](docs/getting-started.md#getting-started)
1. [Docs / API](https://rymdkraftverk.github.io/level1/)
1. [Gotchas](https://github.com/sajmoni/level1#docs/gotchas)

---

## How to use

`npm install l1`

`yarn add l1`

### Hello world

```js
import * as l1 from 'l1'
import * as PIXI from 'pixi.js'

const app = new PIXI.Application()

document.body.appendChild(app.view)

l1.init(app)

app.loader.add('assets/spritesheet.json')

app.loader.load(() => {
  // Add game logic here
})
```

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
1. Go to the `template` folder
1. Run `yarn l1` to install `level1`
1. Run `yarn start` and `yarn watch` in separate terminal windows
1. Test your new features!
