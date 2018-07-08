## Docs / API: Client

## Game

```js
import { Game } from 'l1'
```

---

```js
Game.init(options)
```

Initializes level1 and starts the game loop.

**Arguments**

`options` (object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- |
**width** | Number | - [ ] | 800 | The width of the game |
**height** | Number | - [ ] | 600 | The height of the game |
**assets** | Object | - [ ] | - | An object that defines assets for the game. (See: TBD) |
**element** | HTMLElement | - [ ] | `document.body` | Where to inject the game |
**physics** | Boolean | - [ ] | false | Enable physics provided by matter-js |
**debug** | Boolean | - [ ] | false | Display the debug tools underneath game window |

**Returns**

(Promise): A promise that will resolve once all the assets are loaded.

**Example**

```js
Game.init({
  width: 800,
  height: 600,
}).then(() => {
  // Game is started
})

```

---

```js
Game.stop()
```

Stop the game loop.

**Arguments**

None.

**Returns**

Nothing.

---

```js
Game.start()
```

Start the game loop.

**Arguments**

None.

**Returns**

Nothing.

---

```js
Game.getRenderer()
```

**Arguments**

None.

**Returns**

(PIXI.WebGLRenderer)

---

```js
Game.getStage()
```

**Arguments**

None.

**Returns**

(PIXI.Container): The root PIXI container

---

### Entity

```js
import { Entity } from 'l1'
```

---

```js
Entity.addChild(parent, options)
```

**Arguments**

`parent` (object): The entity to add the child to.

`options` (object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- 
**id** | String | - [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**x** | Number | - [ ] | 0 | The x position of the entity, relative to the parent.
**y** | Number | - [ ] | 0 | The y position of the entity, relative to the parent.
**width** | Number | - [ ] | 0 | The width of the entity. Used for non-physics based collision detection.
**height** | Number | - [ ] | 0 | The height of the entity. Used for non-physics based collision detection.

**Returns**

(object): The child entity.

**Example**

```js
 // TODO
```

---

```js
Entity.destroy(entity)
```

Removes the entity, its asset and all its children.

**Arguments**

`entity` (Object|String): The entity to remove. Optionally an entity id.

**Returns**

Nothing.

---

```js
Entity.getAll()
```

**Arguments**

None.

**Returns**

(Array): All entities.

---

```js
Entity.get(id)
```

Get entitiy by id.

**Arguments**

`id` (String): The entity id.

**Returns**

(*): Returns the found entity, else undefined. 

---

```js
Entity.getByType(type)
```

Get entities by type.

**Arguments**

`type` (String): The entity type.

**Returns**

(*): Returns a list of found entities, else undefined. 

---

```js
Foo.bar(baz)
```

**Arguments**

**Returns**

**Example**

---

```js
Entity.isColliding(entity, otherEntity)
```

**Arguments**

`entity` (Object)

`otherEntity` (Object)

**Returns**

(Boolean): Returns true if entities are colliding.

---


```js
Entity.overlappingRectangleArea(entity, otherEntity)
```

**Arguments**

`entity` (Object)

`otherEntity` (Object)

**Returns**

(Number): The area that is overlapping.

---

### Entity object properties

The following properties are specified for objects created by Entity.create.

Property | Type | Description
 -- | -- | --
**id** | String | Unique id
**types** | Array | Type field to group entities together, also used for collisions
**behaviors** | Object | Map with all behaviors
**body** | Object | Physics body. Always has default body with entity as only property
**asset** | (*) | Either null, Sprite, Animation, Sound, Particles, Graphics, Text or BitmapText
**parent** | Object | -
**children** | Array | -

**Example**

```js
// TODO
```

---

## Timer

```javascript
import { Timer } from 'l1'
```

---

```js
Timer.create(options)
```

Creates a new timer object. Timer starts at 0 and counts up to duration. (60 = Approx. 1 sec)

**Arguments**

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- 
**duration** | Number | -[x] | - | The number of times the timer will be run before returning true
**autoReset** | Boolean | -[ ] | false | If true, the timer will reset once the duration is reached

**Returns**

(Object): A new timer object.

---

```js
Timer.reset(timer)
```

Resets the timer

**Arguments**

`timer` (object): The timer object to reset

**Returns**

Nothing.

---

```js
Timer.run(timer)
```

Increase timer `counter` by 1. Returns true if `duration` is reached.

**Arguments**

`timer` (object): The timer object to run

**Returns**

(Boolean): Returns `true` if the timer `duration` is reached.

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

```js
timer.reset()
```

Reset counter to 0.

**Arguments**

None.

**Returns**

Nothing.

---

```js
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

### Sprite

```js
import { Sprite } from 'l1'
```

---

```js
Sprite.show(entity, options)
```

**Arguments**

**Returns**

**Example**

---

```js
Sprite.hide(entity)
```

**Arguments**

**Returns**

**Example**
---

```js
Sprite.flip(entity)
```

---

### Animation

```js
import { Animation } from 'l1'
```

---

```js
Animation.play(entity, options)
```

**Arguments**

`entity` (object): The entity to apply the animation to.

`options` (object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- 
**textures** | Array | - [x] | - | A list of texture id's
**speed** | Number | - [ ] | 0.05 | The speed of toggling between textures. Higher number equals faster speed.
**zIndex** | Number | - [ ] | 0 | TODO
**loop(not implemented)** | Boolean | - [ ] | true | If the animation should loop from the first texture when complete.

**Returns**

(PIXI.AnimatedSprite): The PIXI animation object.

**Example**

```js
const walkAnimation = {
	textures: ['walk1', 'walk2'], 
	speed: 0.5, 
	zIndex: 10,
}

Animation.play(entity, {
	...walkAnimation,
	speed: 1,
})
```

---

```js
Animation.stop(entity)
```

**Arguments**

`entity` (object): The entity with the animation to stop.

**Returns**

Nothing.

---

### Text

Text.show()
Text.hide()

---

### BitmapText

BitmapText.show()
BitmapText.hide()

---

### Particles

```js
import { Particles } from 'l1'
```

---

```js
Particles.emit(entity, options)
```

**Arguments**

`entity`

`options` (Object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- |
**textures** | Array | - [x] | - | The sprites to use for the emitter, as defined in `assets.json`
**config** | Object | - [x] | - | The emitter config to use

**Returns**

(Object): The created particle emitter.

**Example**

```js
Particles.emit(entity, {
  textures: ['yo'],
	config: particleConfig,
})
```

---

```js
Particles.stop(entity)
```

**Arguments**

`entity`

**Returns**

Nothing.

---

### Graphics

```js
import { Graphics } from 'l1'
```

---

```js
Graphics.create()
```

A graphics object is used to draw lines and shapes.

**Arguments**

None.

**Returns**

(Object): A PIXI.Graphics object

---

Graphics.destroy()

---

### Behavior

Behavior.add()
Behavior.remove()

---

### Sound

```js
import { Sound } from 'l1'
```

---

```js
Sound.play(entity, options)
```

**Arguments**

`entity` (object):

`options` (object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- |
**src** | String | [x] | - | The sound to play. Has to be defined in `assets.json`
**volume** | Number | [ ] | 0.5 | The volume
**loop** | Boolean | [ ] | false | If the sound should be played continously

**Returns**

(object): The sound object

**Example**

```js
Sound.play(entity, {
	src: 'explosion',
	volume: 0.1,
	loop: true,
})
```

---

```js
Sound.stop(entity)
```

TODO

---

### Util

---

```javascript
Util.getRandomInRange(from, to)
```

Get a random number in range (from (inclusive) - to (exclusive))

**Arguments**

`from` (number): Inclusive
`to` (number): Exclusive

**Returns**

(Number): The randomly generated number

**Example**

```js
 // TODO
```

---

```js
Util.grid(options)
```

Returns a function to get coordinates. Useful for placing objects on a grid.

**Arguments**

`options` (object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- |
**x** | Number | - [x] | - | The x coordinate of the top left corner 
**y** | Number | - [x] | - | The y coordinate of the top left corner
**marginX** | Number | - [x] | - | The space between each cell on the x axis
**marginY** | Number | - [x] | - | The space between each cell on the y axis
**itemsPerRow** | Number | - [x] | - | The amount of items on a row before a line break

**Returns**

(Function): A function with the signature: (index) => { x, y }

**Example**

```js
  const numbers = [1, 2, 3]

  const getCell = Util.grid({
    x: 10,
    y: 10,
    marginX: 10,
    marginY: 10,
    itemsPerRow: 2,
  })

  numbers.map(getCell)
  // [{ x: 10, y: 10}, {x: 20, y: 10}, {x: 10, y: 20}]
```

---

```js
Util.angle(options)
```

Get the angle between two points, in radians.

**Arguments**

`options` (object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- |
**x1** | Number | - [x] | - | The x coordinate of the start position
**y1** | Number | - [x] | - | The y coordinate of the start position
**x2** | Number | - [x] | - | The x coordinate of the end position
**y2** | Number | - [x] | - | The y coordinate of the start position

**Returns**

(Number): The angle in radians. 

**Example**

```js
 // TODO
```

---

```javascript
Util.distance(options)
```

Get the distance between two points.

**Arguments**

`options` (object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- |
**x1** | Number | - [x] | - | The x coordinate of the start position
**y1** | Number | - [x] | - | The y coordinate of the start position
**x2** | Number | - [x] | - | The x coordinate of the end position
**y2** | Number | - [x] | - | The y coordinate of the start position

**Returns**

(Number): The distance.

**Example**

```js
 // TODO
```

---

```js
 Util.toRadians(degrees)
```

Convert degrees to radians.

**Arguments**

`degrees` (Number)

**Returns**

(Number): Radians.

**Example**

```js
 // TODO
```

---

### Matter

Exposes the complete Matter.js API.

http://brm.io/matter-js/docs/

---

### Physics

```js
import { Physics } from 'l1'
```

---

```js
Physics.addBody(entity, body)
```

**Arguments**

`entity` (object): The entity to apply body to.

`body` (Matter.body): A Matter body.

**Returns**

(Object): The created body.

**Example**

```js
// TODO
```

---

Physics.addCollision
Physics.removeCollision
Physics.removeAllCollisions
Physics.getEngine()

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

```js
import { Debug } from 'l1'
```

---

```js
Debug.toggleHitBoxes()
```

**Arguments**

None.

**Returns**

Nothing.

___


### Key

```js
import { Key } from 'l1'
```

---

```js
Key.add(key)
```

Enables a key to be used with Key.isDown

**Arguments**

`key` (String): The key to enable.

**Returns**

Nothing.

---

```js
Key.isDown(key)
```

Call this function each game update to get the state of a key.

**Arguments**

`key` (String): The key to check.

**Returns**

(Boolean): If the key is pressed or not

---

### Net

#### Net.start()

Initialize socket.io client

#### Net.on(key: string, func: func)

Run function when message with key is received.

#### Net.emit(message: string, data: object)

Send data to all other clients.

```js
Foo.bar(baz)
```

**Arguments**

**Returns**

**Example**

---




------------------------------------------------------------------------------------------------------------------------------------------------------




#### Util.flipSprite(sprite: PIXI.Sprite|PIXI.AnimatedSprite|PIXI.Text)

Flip sprite horizontally


DEPRECATED:
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

#### Entity.addEmitter(entity, { id: string, textures: array[Textures] })

#### Entity.emitEmitters(entity, { id: string, config: object})



DEPRECATED:
#### Game.getGraphics() => PIXI.Graphics

*Note: Graphics need to be redrawn each update*

#### Game.getPhysicsEngine() => Matter-js Engine
---


DEPRECATED
#### Sound.getSound(filePath: string, ?options: object)

Options are Howler options other than src:
https://github.com/goldfire/howler.js#options

*Note: Call .play() on the sound object to play it.*

```javascript
  const sound = Sound.getSound('sounds/hit.wav', { volume: 0.8 });
  sound.play();
```
