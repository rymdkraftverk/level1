# level1

> Quickly get started creating 2D games in the browser with minimal setup or configuration

level1 is a thin layer on top of pixi.js to enable creating games. The API is designed to be as minimal as possible to be easy to learn and work with.

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
1. [Docs / API: Server](docs/api-server.md)
    - [Server](docs/api-server.md#server)
    - [Net](docs/api-server.md#net)
1. [Develop](https://github.com/sajmoni/level1#develop)
1. [Dependency references](https://github.com/sajmoni/level1#dependency-references)

---

## Develop

In `client` and `server`

`npm install` = Install dependencies

#### Custom commands

Command | Description
------- | -----------
`npm run build` | Generate files in the `dist` folder
`npm run build:watch` | Continously build files in the `dist` folder
`npm run clean` | Remove the `dist` folder
`npm run clean-build` | `npm run clean` + `npm run build`
`npm run test` | Run the tests
`npm run test:watch` | Continously run the tests
`npm run patch` | -

#### Workflow

To test changes, use the `template` project.

1. Build the `dist` files in either `client` or `server` (`npm run build:watch`)
1. Go to the `template` folder
1. Run `yarn l1` to install `client` or `yarn l1-server` to install `server`
1. Run `yarn start` and `yarn watch` in separate terminal windows

---

## Dependency references:

 - Rendering: [Pixi.js](https://github.com/pixijs/pixi.js)
 - Physics: [Matter.js](https://github.com/liabru/matter-js)
 - Sound: [Howler.js](https://github.com/goldfire/howler.js)
 - Multiplayer: [Socket.io](https://github.com/socketio/socket.io)
