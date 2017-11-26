# level1

> Quickly get started creating 2D games in the browser with minimal setup or configuration

## Index

1. [Getting started](https://github.com/sajmoni/level1#1-getting-started)
1. [Docs / API: Client](https://github.com/sajmoni/level1#docs--api)
1. [Develop](https://github.com/sajmoni/level1#3-develop)
1. [Dependency references](https://github.com/sajmoni/level1#4-dependency-references)

---

## 1. Getting started

Use the template project as a starter.

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
  const lizardSprite = Entity.addSprite(lizard, 'lizard1');
  lizardSprite.x = 200;
  lizardSprite.y = 200;
```

*Check PIXI.Sprite docs for properties on sprite object*


#### Add animation

```javascript
  const lizardAnim = Entity.addAnimation(lizard, ['lizard1', 'lizard2'], 0.1);
  lizardAnim.x = 200;
  lizardAnim.y = 200;
```

*Check PIXI.AnimatedSprite docs for properties on animation object*

---

### Behaviors

Behaviors are objects with two properties: 

 - `run(behavior, entity)` which is called 60 times per second. (mandatory)

 - `init(behavior, entity)` which is only called once when the entity is first added. (optional)

 Both are passed the current behavior as first argument and the entity that the
 behavior belongs to as the second argument.

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

### Entity

#### Entity.create(id: string) => object

#### Entity.addSprite(entity: object, filename: string, ?options: object) => PIXI.Sprite

```javascript
options: {
  zIndex: number
}
```

#### Entity.addAnimation(entity: object, filenames: array[string], ?animationSpeed: number) => PIXI.AnimatedSprite

Default animationSpeed = 0.005.

#### Entity.addBody(entity: object, body: Matter.Body)

Add Physics body.

#### Entity.removeBody(body: Matter.Body)

#### Entity.addCollision(entityType: string, otherTypes: array[string], onCollision: (bodyA, bodyB) => void, ?collisionType: string);

Default collisionType: `collisionActive`

Other options: `collisionStart` | `collisionEnd`

#### Entity.destroy(entity: object)

Remove entity, sprite, animation and body.

---

### Entity object properties

The following properties are specified for objects created by Entity.create.

#### entity.id

Unique id.

#### entity.type

Type field to group entities together, also used for collisions (Should perhaps be an array...).

#### entity.behaviors (object)

Map with all behaviors.

#### entity.body

Physics body. Always has default body with entity as only property.

#### entity.sprite

Either null, PIXI.Sprite or PIXI.AnimatedSprite

---

### Net

#### Net.start()

Initialize socket.io client

#### Net.on(key: string, func: func)

Run function when message with key is received.

#### Net.emit(message: string, data: object)

Send data to all other clients.

---

### Timer

Timer starts at 0 and counts up to duration.

#### create(duration: number) => object

---

### Timer object properties

The following properties are specified for objects created by Timer.create.

#### timer.run()

Called on every game update. Will return true when duration is reached. Either reset the timer or delete it when timer.run returns true.

```javascript
  timerBehavior = () => ({
    timer: Timer.create(100),
    run: (b, e) => {
      if (b.timer && b.timer.run()) {
        // Run code when timer duration is reached
        b.timer.reset();
        // or
        delete b.timer;
      }
    } 
  })
```

#### timer.reset()

Reset counter to 0.

#### timer.counter()

The current value of the counter.

#### timer.duration()

Get duration.

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

### Core

#### Core.createCore()

Initialize game main loop.

#### Core.createPhysics()

Initialize Matter.Engine.

#### Core.getEntities()

Get all entities.

#### Core.get(id: string)

Get entitiy by id.

---

### Render

#### Render.getSprite(fileName: string)

#### Render.add(child: PIXI.Sprite|PIXI.AnimatedSprite|PIXI.Text)

#### Render.remove(child: PIXI.Sprite|PIXI.AnimatedSprite|PIXI.Text)

*Note: Only remove what's being rendered. Entity will still exist.*

#### Render.getText(text: string, ?options: object(PIXI.TextStyle))

Text needs to be added with Render.add in order to appear in game.

http://pixijs.download/release/docs/PIXI.TextStyle.html

---

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

### Util

#### Util.getRandomInRange(from: number, to: number)

Get a random number in range (from (inclusive) - to (exclusive))

#### Util.flipSprite(sprite: PIXI.Sprite|PIXI.AnimatedSprite|PIXI.Text)

Flip sprite horizontally

---

## 3. Docs / API: Server

### Server

#### Server.start(?options: object)

```javascript
options: {
  network: bool
}
```

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
 - Multiplayer: [Socket.io ](https://github.com/socketio/socket.io)

 ---

### Note

Matter.js puts the anchor point in the middle of the body. While pixi puts in the the top left
of the sprite. Might try to sync this in the engine in the future..

Not compatible with Webpack (Use Browserify instead)

---

#### TODO

 - Sync sprite and body in engine?? (seems like very common scenario... )
 - Expose default behaviors 
 - Camera (check for camera in pixi)
 - Add examples
 - Add better comments for documentation
 - Dev and prod builds
 - Use dev server to combine start and watch commands
 - Create a script for building game dist files
 - Investigate upgrading to webpack (if pixi supports it)
 - Pass resolution as an object to renderer
 - Enabled setting void color outside of engine (default background)
 - Add linter to template project
 - Update deps
 - Create Trello board
 - Add docs for Debug
 - Add docs for Key
 - Add docs for Physics
 - Fix broken index table
 - Use pixi zOrder instead of custom display order
 - Put sprite collision detection in lib

 #### Ideas
 
  - combine addSprite and addAnimation to one addGfx
  - global state object and selectors (investigate how to handle global state in games)
  - AddText function