# level1

> Quickly get started creating 2D games in the browser with minimal setup or configuration

level1 is a library to create games with javascript. It combines rendering from pixi.js with physics
from matter.js and runs a gameloop etc etc.

The API is designed to be as minimal as possible to be easy to learn and work with.

*This project is experimental and breaking changes might be introduced in any update.*

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
l1.init().then(() => {
  console.log('l1 initialized!')
})
```

--

## Develop

In `client` and `server`

`yarn` = Install dependencies

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

1. Build the `dist` files in either `client` or `server` (`yarn build:watch`)
1. Go to the `template` folder
1. Run `yarn l1` to install `client` or `yarn l1-server` to install `server`
1. Run `yarn start` and `yarn watch` in separate terminal windows
1. Test your new features!

---

## Dependency references

- Game loop: [Mainloop.js]()
- Rendering: [Pixi.js](https://github.com/pixijs/pixi.js)
- Particle effects: [pixi-particles](https://github.com/pixijs/pixi-particles)
- Physics: [Matter.js](https://github.com/liabru/matter-js)
- Sound: [Howler.js](https://github.com/goldfire/howler.js)
- Keyboard input: [mousetrap]()
- Multiplayer: [Socket.io](https://github.com/socketio/socket.io)
