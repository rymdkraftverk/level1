# level1

> Quickly get started creating 2D games in the browser with minimal setup or configuration

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

`npm run build:watch` = Continously build dist files

---

## Dependency references:

 - Rendering: [Pixi.js](https://github.com/pixijs/pixi.js)
 - Physics: [Matter.js](https://github.com/liabru/matter-js)
 - Sound: [Howler.js](https://github.com/goldfire/howler.js)
 - Multiplayer: [Socket.io](https://github.com/socketio/socket.io)

 ---

#### TODO

 #### Future
 
 - Debug: Enable printing of all ID's (display on mouse hover??)
 - Find way to detect coordinate (display on mouse hover??)
 - Debug: Add info about connected controllers 
 - Camera (check for camera in pixi)
 - Dev and prod builds
 - Create a script for building game dist files
 - Custom length animations (being able to define an animation speed / length for each frame in the animation)
 - Quickly switch between "dev" and "prod" mode, aka installing from a local folder vs from npm
 - Use delta when updating entity state, (pass delta to all run functions) (only relevant with a flunctuating time step)
 - Other javascript physics engines?
 - Logo?
 - Nicer looking loading screen
 - Use a real docs site
 - Add better comments for documentation
 - better error logging (winston node-bunyon?)
stacktrace: https://github.com/stacktracejs/stacktrace.js
logger: https://github.com/winstonjs/winston
 - Use an actual toggle for hitboxes
 https://www.w3schools.com/howto/howto_css_switch.asp
 - Progress bar for loading resouces?
 
#### 0.3: 

STATE MANAGEMENT
 - global state object and selectors (investigate how to handle global state in games)
 - finite state machine (leave to userland?)
- Components and one way data flow?
 - Try to work with immutability

BUGS / IMPROVEMENTS

 - Add juicying functions
 - Expose default behaviors (scan for gamepads etc)
 - Publish script: Should run tests, build, bump version(maybe), and publish
 - Add more tests
 - Better error messages when providing custom element for injecting game into
 - Throw exception if duplicates in sprites.json

SOUND
 - Change sound lib to: https://github.com/CreateJS/SoundJS
 - Load music assets before game starts

SPRITES AND ANIMATIONS
- Bug: AddSprite has to be used before addBody
- add a setsprite and setanimation (handle switching between animations easier, Animation.create() ? animation state machine?)
- Refactor flipSprite (or don't use at all)?

BUNDLING
 - Investigate upgrading to webpack (if pixi supports it)
 - Use dev server to combine start and watch commands
 - Bundle pressplay font with engine

CROSS PLATFORM
 - Look into converting to iOS and android with cocoonjs or phonegap
 - Look into Electron for mac/pc desktop

PHYSICS REFACTOR
 - Make Engine addCollision predictable (bodyA is always first entityType)
 - Add a remove collision function

 DEBUG

 - Toggle physics / Sprite hitboxes (different colours?)

EXAMPLES:

- platformer
- simple turnbased multiplayer
- real-time multiplayer

GAMEPAD: 

 - Fix l1controller API
 - Remove legacy controller code (or keep as fallback)
 - Game should not crash if controller is added after game is started
 
MULTIPLAYER:

 - Sockets should not be connected 
 - Display connected players in the debug console
 - Display ping
 - Debug console for server??
 - Prompt to reconnect when connection is lost
 - Abstract socket.io code away, map socket.io keys 1:1 with network functions
 - shared constants between server / client
 - Let user use async / await

We need some conept of scenes / components to quickly bulk remove add components and 
transition between scenes

 Update API docs after everything is done..
