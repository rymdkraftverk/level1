# level1

> Quickly get started creating 2D games in the browser with minimal setup or configuration

level1 is a library to create games with javascript. It combines rendering from pixi.js with physics
from matter.js and runs a gameloop etc etc.

The API is designed to be as minimal as possible to be easy to learn and work with.

*This project is experimental and breaking changes might be introduced in any update.*

## Index

1. [Getting started](docs/getting-started.md#getting-started)
1. [Docs / API: Client](docs/api-client.md)
    - [Game](docs/api-client.md#game)
    - [Entity](docs/api-client.md#entity)
    - [Timer](docs/api-client.md#timer)
    - [Sound](docs/api-client.md#sound)
    - [Util](docs/api-client.md#util)
    - [Physics](docs/api-client.md#physics)
    - [Gamepad](docs/api-client.md#gamepad)
    - [Debug](docs/api-client.md#debug)
    - [Net](docs/api-client.md#net)
    - [Text](docs/api-client.md#text)
    - [BitmapText](docs/api-client.md#bitmaptext)
    - [Sprite](docs/api-client.md#sprite)
    - [Animation](docs/api-client.md#animation)
    - [Particles](docs/api-client.md#particles)
    - [Graphics](docs/api-client.md#graphics)
    - [Matter](docs/api-client.md#matter)
1. [Docs / API: Server](docs/api-server.md)
    - [Server](docs/api-server.md#server)
    - [Net](docs/api-server.md#net)
1. [Develop](https://github.com/sajmoni/level1#develop)
1. [Dependency references](https://github.com/sajmoni/level1#dependency-references)

---

## Develop

In `client` and `server`

`npm install` = Install dependencies

### Custom commands

Command | Description
------- | -----------
`npm run build` | Generate files in the `dist` folder
`npm run build:watch` | Continously build files in the `dist` folder
`npm run clean` | Remove the `dist` folder
`npm run clean-build` | `npm run clean` + `npm run build`
`npm run test` | Run the tests
`npm run test:watch` | Continously run the tests
`npm run patch` | -

### Workflow

To test changes, use the `template` project.

1. Build the `dist` files in either `client` or `server` (`npm run build:watch`)
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

## Entities

Entities:

- Entities have a list of children (other entities)
- Entities need to have 1 parent
- Children will be removed when entity is.
- An entity can have 0 or 1 asset (Sprite, Animation, Text, BitmapText, Particles, Sound)
- An entity can have 0 or 1 physics body.
- An entity has an x and y position
- An entity's position is relative to its parent 
- An entity has width and height.
