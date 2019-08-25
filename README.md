# level1

A combination of tools to make games web based games.

 - Utilities for [`pixi.js`](https://github.com/pixijs/pixi.js).

 - Behaviors. Pretty much `setTimeout` (`l1.once`) and `setInterval` (`l1.repeat`) controlled by updates from a game loop.

 - General game utilities

## Features

### Pixi utilities

- `l1.resize` - Resize the canvas and retain the correct proportions

- `l1.getTexture` - Function to get pre-loaded textures

- `l1.getGlobalPosition` - Function to get the global position of a Pixi display object

 - `l1.displayHitBoxes`
 
 - `l1.makeDraggable`


TODO: makeClickable
getScale
convertColorHex => fromHex

===
sprite
animatedSprite
text
===

### Game utils

- `l1.distance` - Get the distance between two positions.

- `l1.angle` - Get the angle between two positions.

- `l1.isColliding` - Collision detection between two Pixi display objects

- `l1.getOverlappingArea` - Overlapping area between two Pixi display objects

# Deprecate
- `l1.isKeyDown` - Keyboard input

- TODO: Resize text objects without blurriness

### Behaviors

 - `l1.once` 
 
 - `l1.repeat` 
 
 - `l1.get` 
 
 - `l1.getAll` 

 - `l1.remove` 

## Index

1. [Getting started](docs/getting-started.md#getting-started)
1. [Docs / API](https://rymdkraftverk.github.io/level1/)
1. [Gotchas](https://github.com/sajmoni/level1#docs/gotchas)

---

## Installation

`npm install l1`

`yarn add l1`

## Hello world with Pixi.js

```js
import * as l1 from 'l1'
import * as PIXI from 'pixi.js'

const app = new PIXI.Application()

document.body.appendChild(app.view)

// Give l1 a reference to the Pixi app in order to enable Pixi util features
l1.init(app)

app.loader.add('assets/spritesheet.json')

app.loader.load(() => {
  // Add game logic here
})
```

---

## Recipes and patterns

### Behaviors

#### Keep state between game updates

Use a closure

```js
const move = () => {
  let x = 1

  l1.repeat(() => {
    x += 1
  })
}
```

#### Deleting behaviors

When you delete a behavior, it will be removed in the next game update.

Therefore, you might need to wait a game update before you continue:

```js
const gameOver = () => {
  l1.remove('gameLoop')
  l1.once(() => {
    // Continue doing stuff
  })
}
```

### Pixi

#### Resize to full screen while retaining correct proportions

```js
const resizeGame = () => {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  l1.resize(screenWidth, screenHeight)
}
resizeGame()

window.addEventListener('resize', resizeGame)
```

If you want the game to be centered:

```css
#container {
  display: flex;
  justify-content: center;
}
```

```html
<div id="container">
  <div id="game"></div>
</div>
```

---

## Other useful tools

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
