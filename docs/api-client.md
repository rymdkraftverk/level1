# API: Client

### Game

```js
import { Game } from 'l1'
```
 - [init](#init)
 - [stop](api-client.md#stop)
 - [start](docs/api-client.md#start)
 - [getStage](docs/api-client.md#getstage)
 - [getRenderer](docs/api-client.md#getrenderer)
 - [getPIXI](docs/api-client.md#getpixi)

---

#### init

```js
Game.init(options)
```

Initializes level1 and starts the game loop.

**Arguments**

`options` (object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- |
**width** | Number | [ ] | 800 | The width of the game |
**height** | Number | [ ] | 600 | The height of the game |
**assets** | Object | [ ] | - | An object that defines assets for the game. (See: TBD) |
**element** | HTMLElement | [ ] | `document.body` | Where to inject the game |
**physics** | Boolean | [ ] | false | Enable physics provided by matter-js |
**debug** | Boolean | [ ] | false | Display the debug tools underneath game window |

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

#### stop

```js
Game.stop()
```

Stop the game loop.

**Arguments**

None.

**Returns**

Nothing.

---

#### start

```js
Game.start()
```

Start the game loop.

**Arguments**

None.

**Returns**

Nothing.

---

#### getRenderer

```js
Game.getRenderer()
```

**Arguments**

None.

**Returns**

(PIXI.WebGLRenderer)

---

#### getStage

```js
Game.getStage()
```

**Arguments**

None.

**Returns**

(PIXI.Container): The root PIXI container

---

#### getPIXI

```js
Game.getPIXI()
```

---

### Entity

```js
import { Entity } from 'l1'
```

 - [addChild]()
 - [destroy]()
 - [getAll]()
 - [get]()
 - [getByType]()
 - [getRoot]()
 - [isColliding]()
 - [getOverlappingArea]()
 - [addType]()
 - [removeType]()
 - [getX]()
 - [setX]()
 - [getY]()
 - [setY]()

---

#### addChild

```js
Entity.addChild(parent, options)
```

**Arguments**

`parent` (object): The entity to add the child to.

`options` (object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- 
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**x** | Number | [ ] | 0 | The x position of the entity, relative to the parent.
**y** | Number | [ ] | 0 | The y position of the entity, relative to the parent.
**width** | Number | [ ] | 0 | The width of the entity. Used for non-physics based collision detection.
**height** | Number | [ ] | 0 | The height of the entity. Used for non-physics based collision detection.

**Returns**

(object): The child entity.

**Example**

```js
 // TODO
```

---

#### destroy

```js
Entity.destroy(entity)
```

Removes the entity, its asset and all its children.

**Arguments**

`entity` (Object|String): The entity to remove. Optionally an entity id.

**Returns**

Nothing.

---

#### getAll

```js
Entity.getAll()
```

**Arguments**

None.

**Returns**

(Array): All entities.

---

#### get

```js
Entity.get(id)
```

Get entitiy by id.

**Arguments**

`id` (String): The entity id.

**Returns**

(*): Returns the found entity, else undefined. 

---

#### getByType

```js
Entity.getByType(type)
```

Get entities by type.

**Arguments**

`type` (String): The entity type.

**Returns**

(*): Returns a list of found entities, else undefined. 

---

#### getRoot

```js
Entity.getRoot()
```

Get the root entity. This is the top node in the entity hierarchy.

**Arguments**

Nothing

**Returns**

(Object): The root entity

**Example**

---

#### isColliding

```js
Entity.isColliding(entity, otherEntity)
```

**Arguments**

`entity` (Object): The first entity to use for collision detection.

`otherEntity` (Object) The second entity to use for collision detection.

**Returns**

(Boolean): Returns true if entities are colliding.

---

#### getOverlappingArea

```js
Entity.getOverlappingArea(entity, otherEntity)
```

**Arguments**

`entity` (Object): The first entity to use for overlap detection.

`otherEntity` (Object) The second entity to use for overlap detection.

**Returns**

(Number): The area that is overlapping.

---

#### addType

---

#### removeType

---

#### setX

---

#### getX

---

#### setY

---

#### getY

---


### Entity object properties

The following properties are specified for objects created by Entity.addChild.

Property | Type | Description
 -- | -- | --
**id** | String | Unique id
**types** | Array | Type field to group entities together, also used for collisions
**behaviors** | Object | Map with all behaviors
**body** | Object | Physics body. Always has default body with entity as only property
**asset** | (*) | Either null, Sprite, Animation, Sound, Particles, Graphics, Text or BitmapText
**parent** | Object | The parent entity.
**children** | Array | A list of child entities.

---

### Timer

```javascript
import { Timer } from 'l1'
```

 - [create]()
 - [run]()
 - [reset]()

---

#### create

```js
Timer.create(options)
```

Creates a new timer object. Timer starts at 0 and counts up to duration. (60 = Approx. 1 sec)

**Arguments**

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- 
**duration** | Number | [x] | - | The number of times the timer will be run before returning true
**autoReset** | Boolean | [ ] | false | If true, the timer will reset once the duration is reached

**Returns**

(Object): A new timer object.

---

#### reset

```js
Timer.reset(timer)
```

Resets the counter to 0.

**Arguments**

`timer` (object): The timer object to reset

**Returns**

Nothing.

---

#### run

```js
Timer.run(timer)
```

Increase timer `counter` by 1. Should be called on every game update. Returns true if `duration` is reached. 

**Arguments**

`timer` (object): The timer object to run

**Returns**

(Boolean): Returns `true` if the timer `duration` is reached.

**Example**

```javascript
  timerBehavior = () => ({
    timer: Timer.create({ duration: 100 }),
    run: (b) => {
      if (Timer.run(b.timer)) {
        // Run code when timer duration is reached

        Timer.reset(b.timer);
      }
    } 
  })
```

---

### Timer object properties

The following properties are specified for objects created by Timer.create.

Property | Type | Description
 -- | -- | --
**duration** | Number | How many times the `timer` has to be run before it returns `true`. Set by Timer.create.
**finished** | Boolean | Returns `true` when the `counter` has reached the `duration`.
**counter** | Number | A number that increases by 1 every time the `timer` is run.

---

### Sprite

```js
import { Sprite } from 'l1'
```

- [show]()
- [hide]()
- [flip]() ?

---

```js
Sprite.show(entity, options)
```

**Arguments**

`entity` (Object): The entity to apply the sprite to.

`options` (Object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- 
**texture** | String | [x] | - | A texture id as specified in `assets.json`.
**flipX** | Boolean | [ ] | false | TBD
**flipY** | Boolean | [ ] | false | TBD
**zIndex** | Number | [ ] | 0 | TBD

**Returns**

(PIXI.Sprite): The PIXI sprite object.

**Example**

```js
Sprite.show(player1, {
	texture: 'walk1',
	zIndex: 10
	flipX: true
	flipY: true
})
```

---

```js
Sprite.hide(entity)
```

**Arguments**

`entity` (object): The entity with the sprite to hide.

**Returns**

Nothing.

---

```js
Sprite.flip(entity)
```

TBD

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


```js
import { Text } from 'l1'
```

show
hide

---

```js
Text.show(entity, options)
```

**Arguments**

TODO

**Returns**

TODO

**Example**

```js
Text.show(player1, {
  text: 'hello',
  style: { fontSize: '35px' },
  zIndex: 10,
})
```

---

#### hide

---

### BitmapText

```js
import { BitmapText } from 'l1'
```

- [show]()
- [hide]()

#### show 

TODO

---

#### hide 

TODO

---

### Particles

```js
import { Particles } from 'l1'
```

emit

stop

---

```js
Particles.emit(entity, options)
```

https://pixijs.io/pixi-particles-editor/

**Arguments**

`entity` (Object): The entity to apply the particles to.

`options` (Object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- |
**textures** | Array | [x] | - | The sprites to use for the emitter, as defined in `assets.json`
**config** | Object | [x] | - | The emitter config to use
**zIndex** | Number | [ ] | 0 | TBD

**Emitter config options**

```js
{
  pos: {
    x: Number,
    y: Number,
  },
  color: {

  }
}
```

**Returns**

(Object): The created particle emitter.

**Example**

```js
Particles.emit(entity, {
  textures: ['pixel'],
	config: particleConfig,
})
```

---

```js
Particles.stop(entity)
```

**Arguments**

`entity` (Object): The entity with the particles to stop.

**Returns**

Nothing.

---

### Graphics

```js
import { Graphics } from 'l1'
```

create

destroy

---

#### create

```js
Graphics.create(entity)
```

A graphics object is used to draw lines and shapes.

**Arguments**

`entity` (object): The entity to apply the graphics object to.

**Returns**

(Object): A PIXI.Graphics object

---

#### destroy

```js
Graphics.destroy(entity)
```

**Arguments**

`entity` (Object): The entity with the graphics to destroy.

**Returns**

Nothing.

---

### Behavior

TBD

Behavior.add()
Behavior.remove()

---

### Sound

```js
import { Sound } from 'l1'
```

play

stop

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

```js
import { Util } from 'l1'
```

 - [getRandomInRange](docs/api-client.md#getrandominrange)
 - [distance](docs/api-client.md#distance)
 - [grid](docs/api-client.md#grid)
 - [angle](docs/api-client.md#angle)
 - [toRadians](docs/api-client.md#torandians)

---

#### getRandomInRange

```javascript
Util.getRandomInRange(from, to)
```

Get a random number in range (from (inclusive) - to (exclusive))

**Arguments**

`from` (number): Inclusive
`to` (number): Exclusive

**Returns**

(Number): The randomly generated number

---

#### grid

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

#### angle

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

#### distance

```javascript
Util.distance(options)
```

Get the distance between two points.

**Arguments**

`options` (object):

Option | Type | Required | Default | Description
 -- | -- | -- | -- | -- |
**x1** | Number | [x] | - | The x coordinate of the start position
**y1** | Number | [x] | - | The y coordinate of the start position
**x2** | Number | [x] | - | The x coordinate of the end position
**y2** | Number | [x] | - | The y coordinate of the start position

**Returns**

(Number): The distance.

**Example**

```js
 // TODO
```

---

#### toRadians

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

- [addBody](docs/api-client.md#addbody)
- [removeBody](docs/api-client.md#removebody)
- [addCollision](docs/api-client.md#addcollision)
- [removeCollision](docs/api-client.md#removecollision)
- [removeAllCollisions](docs/api-client.md#removeallcollisions)
- [getEngine](docs/api-client.md#getengine)

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

#### addCollision

---

#### removeCollision

---

#### removeAllCollisions

---

#### getEngine

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

- [add](docs/api-client.md#add)
- [isDown](docs/api-client.md#isdown)

---

#### add

```js
Key.add(key)
```

Enables a key to be used with Key.isDown

**Arguments**

`key` (String): The key to enable.

**Returns**

Nothing.

---

#### isDown

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
