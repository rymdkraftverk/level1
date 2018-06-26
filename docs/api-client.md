## Docs / API: Client

### Game

#### Game.init(width, height, sprites, ?options) => Promise

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

#### Entity.create(?id: string) => object

Id is optional. It is needed for Entity.get

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
Add link to matter-js Body docs

#### Entity.removeBody(body: Matter.Body)

#### Entity.addCollision(entityType: string, otherTypes: array[string], onCollision: (bodyA, bodyB) => void, ?collisionType: string);

Default collisionType: `collisionActive`

Other options: `collisionStart` | `collisionEnd`

#### Entity.destroy(entity: object | string)

Remove entity, sprite, animation, body and particle emitters.

Can be passed either the entity object or entity id.

#### Entity.getAll()

#### Entity.get(id: string)

Get entitiy by id.

#### Entity.getByType(type: string)

Get entitiy by type.

#### Entity.addEmitter(entity, { id: string, textures: array[Textures] })

#### Entity.emitEmitters(entity, { id: string, config: object})

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

Either null, PIXI.Sprite, PIXI.AnimatedSprite or Empty sprite

---

## Timer

```javascript
import { Timer } from 'l1'
```

---

```javascript
Timer.create(duration)
```

Creates a new timer object. Timer starts at 0 and counts up to duration. (60 = Approx. 1 sec)

**Arguments**

`duration` (number): The number of times the timer will be run before returning true.

**Returns**

(Object): A new timer object.

---

## Timer object properties

The following properties are specified for objects created by Timer.create.

---

```javascript
timer.run()
```

Should be called on every game update. Increases the counter by 1. Will return true once when duration is reached.

**Arguments**

None.

**Returns**

(boolean): If the timer has reached its duration.

**Example**

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

---

```javascript
timer.reset()
```

Reset counter to 0.

**Arguments**

None.

**Returns**

Nothing.

---

```javascript
timer.counter()
```

The current value of the counter. Starts at 0 and is increased by 1 whenever *run()* is called.

**Arguments**

None.

**Returns**

(Number): The current value of the counter.

---

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
