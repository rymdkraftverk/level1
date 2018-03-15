# level1

> Quickly get started creating 2D games in the browser with minimal setup or configuration

## Index

1. [Getting started](https://github.com/sajmoni/level1#1-getting-started)
1. [Docs / API: Client](https://github.com/sajmoni/level1#2-docs--api-client)
    - [Game](https://github.com/sajmoni/level1#game)
    - [Entity](https://github.com/sajmoni/level1#entity)
    - [Timer](https://github.com/sajmoni/level1#timer)
    - [Sound](https://github.com/sajmoni/level1#sound)
    - [Util](https://github.com/sajmoni/level1#util)
    - [Physics](https://github.com/sajmoni/level1#physics)
    - [Gamepad](https://github.com/sajmoni/level1#gamepad)
    - [Debug](https://github.com/sajmoni/level1#debug)
    - [Net](https://github.com/sajmoni/level1#net)
1. [Docs / API: Server](https://github.com/sajmoni/level1#3-docs--api-server)
    - [Server](https://github.com/sajmoni/level1#server)
    - [Net](https://github.com/sajmoni/level1#net-1)
1. [Develop](https://github.com/sajmoni/level1#4-develop)
1. [Dependency references](https://github.com/sajmoni/level1#5-dependency-references)

---

## 1. Getting started

Use the template project as a starter.

### Create game

```javascript
import { Game } from 'l1';
import sprites from './sprites.json';

Game.init(800, 400, sprites, { debug: true, physics: true }).then(() => {
  Game.start();
}
```

---

### Sprites

- Put sprites in `public/assets/`
- Add sprite file name to `src/client/sprites.json`

*Sprites have to be .png*

Example:

`public/assets/mySprite.png`

```json
// src/client/sprites.json
[
  "mySprite"
]

```

---

### Entities

#### Create

```javascript
  import { Entity } from 'l1';

  const lizard = Entity.create('lizard');
```

#### Add sprite and position it

```javascript
  const sprite = Entity.addSprite(lizard, 'lizard1');
  sprite.x = 200;
  sprite.y = 200;
```

*Check PIXI.Sprite docs for properties on sprite object*


#### Add animation

```javascript
  const sprite = Entity.addAnimation(lizard, ['lizard1', 'lizard2'], 0.1);
  sprite.x = 200;
  sprite.y = 200;
```

*Check PIXI.AnimatedSprite docs for properties on animation object*

---

### Behaviors

Behaviors are objects with two properties: 

 - `run(behavior, entity)` is called 60 times per second. (mandatory)

 - `init(behavior, entity)` is only called the first time the behavior runs. (optional)

 Both are passed the current behavior as first argument and the entity that the
 behavior belongs to as the second argument.

#### Define behavior

```javascript
  const moveLeft = () => ({
    init: (behavior, entity) => {

    },
    run: (behavior, entity) => {
      entity.sprite.x -= 1;
    },
  })
```

#### Add behavior

```javascript
  lizard.behaviors.moveLeft = moveLeft();
```

---

## 2. Docs / API: Client

### Game

#### Game.init(width, height, sprites, ?options) => Promise

Initialize game main loop.

```javascript
options: {
  physics: bool,
  element: HTMLElement,
  debug: bool,
}
```

physics = Enable physics provided by matter-js. (Default: `false`)

element = Where to inject game. (Default: `document.body`)

debug = Display the debug tools underneath game window. (Default: `false`)

#### Game.start() => void

#### Game.stop() => void

#### Game.getRenderer() => PIXI.CanvasRenderer

#### Game.getStage() => PIXI.Container

#### Game.getGraphics() => PIXI.Graphics

*Note: Graphics need to be redrawn each update*

#### Game.getPhysicsEngine() => Matter-js Engine

---

### Entity

#### Entity.create(id: string) => object

#### Entity.addSprite(entity: object, filename: string, ?options: object) => PIXI.Sprite

```javascript
options: {
  zIndex: number
}
```

#### Entity.addEmptySprite(entity: object) => { x, y, width, height }

#### Entity.addAnimation(entity: object, filenames: array[string], ?animationSpeed: number, ?options: object) => PIXI.AnimatedSprite

Default animationSpeed = 0.05.

#### Entity.addText(entity: object, text: string, ?textStyle: object(PIXI.TextStyle), ?options: object) => PIXI.Text

http://pixijs.download/release/docs/PIXI.TextStyle.html

#### Entity.addBody(entity: object, body: Matter.Body)

Add Physics body.

#### Entity.removeBody(body: Matter.Body)

#### Entity.addCollision(entityType: string, otherTypes: array[string], onCollision: (bodyA, bodyB) => void, ?collisionType: string);

Default collisionType: `collisionActive`

Other options: `collisionStart` | `collisionEnd`

#### Entity.destroy(entity: object)

Remove entity, sprite, animation and body.

#### Entity.getAll()

#### Entity.get(id: string)

Get entitiy by id.

#### Entity.getByType(type: string)

Get entitiy by type.

#### Entity.isCollding(entity: entity, otherEntity: entity)

#### Entity.overlappingRectangleArea(entity: entity, otherEntity: entity)

---

### Entity object properties

The following properties are specified for objects created by Entity.create.

#### entity.id

Unique id.

#### entity.types (array)

Type field to group entities together, also used for collisions

#### entity.behaviors (object)

Map with all behaviors.

#### entity.body (Matter-js body)

Physics body. Always has default body with entity as only property.

#### entity.sprite (Pixi Sprite or AnimatedSprit)

Either null, PIXI.Sprite or PIXI.AnimatedSprite

---

### Timer

Timer starts at 0 and counts up to duration. (60 = Approx. 1 sec)

#### create(duration: number) => object

---

### Timer object properties

The following properties are specified for objects created by Timer.create.

#### timer.run()

Should be called on every game update. Will return true once when duration is reached.

```javascript
  timerBehavior = () => ({
    timer: Timer.create(100),
    run: (b) => {
      if (b.timer.run()) {
        // Run code when timer duration is reached

        b.timer.reset();
      }
    } 
  })
```

#### timer.reset() => void

Reset counter to 0.

#### timer.counter() => number

The current value of the counter.

#### timer.duration() => number

#### timer.finished() => bool

---

### Sound

#### Sound.getSound(filePath: string, ?options: object)

Options are Howler options other than src:
https://github.com/goldfire/howler.js#options

*Note: Call .play() on the sound object to play it.*

```javascript
  const sound = Sound.getSound('sounds/hit.wav', { volume: 0.8 });
  sound.play();
```

---

### Util

#### Util.getRandomInRange(from: number, to: number)

Get a random number in range (from (inclusive) - to (exclusive))

#### Util.flipSprite(sprite: PIXI.Sprite|PIXI.AnimatedSprite|PIXI.Text)

Flip sprite horizontally

#### Util.grid(startX, startY, width, height, itemsPerRow) => (index) => { x, y } 

#### Util.getDistance(startX, startY, endX, endY) => number

#### Util.getAngle(startX, startY, endX, endY) => number (in radians)

---

### Physics

Physics is just an alias for matter-js

___


### Gamepad

#### Gamepad.addPreset(typeId: string, preset: L1ControllerPreset)

```javascript
addPreset('MY-POWER CO.,LTD. USB Joystick (Vendor: 0e8f Product: 310d)', new L1ControllerPreset().aliasButton(0, 'y'));
```

#### Gamepad.getGamepads()

#### Gamepad.isPressed(gamepadId, buttonId:number|alias:string)

---

### L1ControllerPreset - instance methods

```javascript
  const preset = new L1ControllerPreset();
```

#### preset.aliasButton(id, alias)

---

### Debug

#### Debug.toggleHitBoxes()

#### Debug.printIDs()

___

### Key

#### Key.add(key: string)

#### Key.isDown(key: string)

---

### Net

#### Net.start()

Initialize socket.io client

#### Net.on(key: string, func: func)

Run function when message with key is received.

#### Net.emit(message: string, data: object)

Send data to all other clients.

---

## 3. Docs / API: Server

### Server

#### Server.start(?options: object)

```javascript
options: {
  network: bool
}
```

#### Server.getApp() => Express App

---

### Net

#### Net.on(key: string, func: func)

#### Net.emit(key: string, data: object)

#### Net.broadcast(key: string, data: object)

---

## 4. Develop

In `client` and `server`

`npm install` = Install dependencies

`npm run build:watch` = Continously build dist files

---

## 5. Dependency references:

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
 - Notify about browser not being supported (or javascript not being enabled)
 - Other javascript physics engines?
 
#### 0.3: 

STATE MANAGEMENT
 - one way dataflow?
 - global state object and selectors (investigate how to handle global state in games)
 - finite state machine (leave to userland?)

BUGS / IMPROVEMENTS
 - Split up readme into different files: https://help.github.com/articles/about-readmes/
 - Loading screen (level1 splash screen)
 - Logo?
 - Fix test linting
 - Add juicying functions
 - Expose default behaviors (scan for gamepads etc)
 - Add better comments for documentation
 - Publish script: Should run tests, build, bump version(maybe), and publish

SOUND
 - Change sound lib to: https://github.com/CreateJS/SoundJS
 - Load music assets before game starts

SPRITES AND ANIMATIONS
- Bug: AddSprite has to be used before addBody
- add a setsprite and setanimation (handle switching between animations easier, Animation.create() ? animation state machine?)
- Refactor flipSprite ?

BUNDLING
 - Investigate upgrading to webpack (if pixi supports it)
 - Use dev server to combine start and watch commands
 - Bundle pressplay font with engine

CROSS PLATFORM
 - Look into converting to iOS and android with cocoonjs or phonegap

PHYSICS REFACTOR
 - Make Engine addCollision predictable (bodyA is always first entityType)
 - Add a remove collision function

 DEBUG 

- better error logging (winston node-bunyon?)
stacktrace: https://github.com/stacktracejs/stacktrace.js
logger: https://github.com/winstonjs/winston

 - Toggle physics / Sprite hitboxes

 - Use an actual toggle for hitboxes

EXAMPLES:

- platformer
- multiplayer

GAMEPAD: 

 - Fix l1controller API
 - Remove legacy controller code (or keep as fallback)
 - Game should not crash if controller is added after game is started
 
 Update API docs after everything is done..