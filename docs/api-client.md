# API: Client

```js
import l1 from 'l1'
```

## Game loop

- [init](#init)
- [stop](#stop)
- [start](#start)
- [getStage](#getstage)
- [getRenderer](#getrenderer)

---

### init

```js
l1.init(options)
```

Initializes level1 and starts the game loop.

#### Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**width** | Number | [ ] | 800 | The width of the game
**height** | Number | [ ] | 600 | The height of the game
**assets** | Object | [ ] | - | An object that defines assets for the game. This is only needed if level1 can't read the contents of the assets folder.
**element** | HTMLElement | [ ] | `document.body` | Where to inject the game
**physics** | Boolean | [ ] | false | Enable physics provided by matter-js
**debug** | Boolean | [ ] | false | Display the debug tools underneath game window
**pixi** | Object | [ ] | - | Options object that will be passed to WebGLRenderer

Pixi options reference:

http://pixijs.download/dev/docs/PIXI.WebGLRenderer.html#WebGLRenderer

#### Returns

(Promise): A promise that will resolve once all the assets are loaded.

#### Example

```js
l1.init({
  width: 800,
  height: 600,
}).then(() => {
  // Game is started
})

```

---

### stop

```js
l1.stop()
```

Stop the game loop.

#### Arguments

None.

#### Returns

Nothing.

---

#### start

```js
l1.start()
```

Start the game loop. Game is automatically started when using `l1.init`.

**Arguments**

None.

**Returns**

Nothing.

---

#### getRenderer

```js
l1.getRenderer()
```

**Arguments**

None.

**Returns**

(PIXI.WebGLRenderer)

---

#### getStage

```js
l1.getStage()
```

**Arguments**

None.

**Returns**

(PIXI.Container): The root PIXI container

---

## Entity

- [entity]()
- [sprite]()
- [flip]() ?
- [destroy]()
- [getAllEntities]()
- [get]()
- [getByType]()
- [isColliding]()
- [getOverlappingArea]()
- [addType]()
- [removeType]()
- [getX]()
- [setX]()
- [getY]()
- [setY]()

---

### entity

```js
l1.entity(options)
```

Use this to create a generic entity with no visuals. One example use case is a container for other entities.

#### Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- 
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**types** | Array | [ ] | [] | Types are used to group entities together.
**x** | Number | [ ] | 0 | The x position of the entity, relative to the parent.
**y** | Number | [ ] | 0 | The y position of the entity, relative to the parent.
**width** | Number | [ ] | 0 | The width of the entity. Used for non-physics based collision detection.
**height** | Number | [ ] | 0 | The height of the entity. Used for non-physics based collision detection.
**parent** | Object | [ ] | null | The parent entity. Will make this entities position relative to the parent position.

#### Returns

(object): The created entity.

#### Example

```js
// TODO
```

---

### destroy

```js
l1.destroy(entity)
```

Removes the entity, its asset and all its children.

**Arguments**

`entity` (Object|String): The entity to remove. Optionally an entity id.

**Returns**

Nothing.

---

### getAllEntities

```js
l1.getAllEntities()
```

**Arguments**

None.

**Returns**

(Array): All entities.

---

### get

```js
l1.get(id)
```

Get entitiy by id.

**Arguments**

`id` (String): The entity id.

**Returns**

(*): Returns the found entity, else undefined.

---

#### getByType

```js
l1.getByType(type)
```

Get entities by type.

#### Arguments

`type` (String): The entity type.

#### Returns

(*): Returns a list of found entities, else undefined.

---

### isColliding

```js
l1.isColliding(entity, otherEntity)
```

#### Arguments

`entity` (Object): The first entity to use for collision detection.

`otherEntity` (Object) The second entity to use for collision detection.

#### Returns

(Boolean): Returns true if entities are colliding.

---

### getOverlappingArea

```js
l1.getOverlappingArea(entity, otherEntity)
```

#### Arguments

`entity` (Object): The first entity to use for overlap detection.

`otherEntity` (Object) The second entity to use for overlap detection.

#### Returns

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

```js
l1.sprite(options)
```

Create a new sprite entity

#### Arguments

`options` (Object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | --
**texture** | String | [x] | - | A texture filename from the `assets` folder.
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**types** | Array | [ ] | [] | Types are used to group entities together.
**flipX** | Boolean | [ ] | false | TBD
**flipY** | Boolean | [ ] | false | TBD
**parent** | Object | [ ] | false | TBD
**zIndex** | Number | [ ] | 0 | The stacking order of the sprite entity
**x** | Number | [ ] | 0 | The x position of the entity, relative to the parent.
**y** | Number | [ ] | 0 | The y position of the entity, relative to the parent.
**width** | Number | [ ] | 0 | The width of the entity. Used for non-physics based collision detection.
**height** | Number | [ ] | 0 | The height of the entity. Used for non-physics based collision detection.

#### Returns

(Object): The sprite entity

#### Example

```js
l1.sprite({
    texture: 'walk1',
    zIndex: 10,
    flipX: true,
    flipY: true,
})
```

---

```js
l1.flip(entity)
```

TBD

---

```js
Animation.play(entity, options)
l1.animation(options)
```

**Arguments**

`entity` (object): The entity to apply the animation to.

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | --
**textures** | Array | - [x] | - | A list of texture id's
**speed** | Number | - [ ] | 0.05 | The speed of toggling between textures. Higher number equals faster speed.
**zIndex** | Number | - [ ] | 0 | TODO
**parent** | Object | - [ ] | 0 | TODO
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**types** | Array | [ ] | [] | Types are used to group entities together.
**x** | Number | [ ] | 0 | The x position of the entity, relative to the parent.
**y** | Number | [ ] | 0 | The y position of the entity, relative to the parent.
**width** | Number | [ ] | 0 | The width of the entity. Used for non-physics based collision detection.
**height** | Number | [ ] | 0 | The height of the entity. Used for non-physics based collision detection.
**loop(not implemented)** | Boolean | - [ ] | true | If the animation should loop from the first texture when complete.

#### Returns

(PIXI.AnimatedSprite): The PIXI animation object.

#### Example

```js
const walkAnimation = {
    textures: ['walk1', 'walk2'],
    speed: 0.5,
    zIndex: 10,
}

Animation.play({
    ...walkAnimation,
    speed: 1,
})
```

---

```js
l1.text(options)
```

#### Arguments

TODO

#### Returns

TODO

#### Example

```js
l1.text({
    text: 'hello',
    style: { fontSize: '35px' },
    zIndex: 10,
})
```

---

- [bitmapText]()

```js
l1.bitmapText(options)
```

#### Arguments

TODO

#### Returns

TODO

#### Example

```js
l1.bitmapText({
    text: 'hello',
    style: { fontSize: '35px' },
    zIndex: 10,
})
```

---

```js
l1.particles(options)
```

https://pixijs.io/pixi-particles-editor/

#### Arguments

`options` (Object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**textures** | Array | [x] | - | The sprites to use for the emitter
**config** | Object | [x] | - | The emitter config to use
**zIndex** | Number | [ ] | 0 | TBD

#### Emitter config options

TODO

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

#### Returns

(Object): The created particle entity.

#### Example

```js
l1.particles({
    textures: ['pixel'],
    config: particleConfig,
})
```

---

### graphics

```js
l1.graphics(options)
```

A graphics object is used to draw lines and shapes.

#### Arguments

`options` (object): The entity to apply the graphics object to.

#### Returns

(Object): A graphics entity

---

## Entity modifiers

- [addFilter](#addFilter)
- [clearFilters](#clearFilters)
- [removeFilter](#removeFilter)
- [Filter](#Filter)
- [addBehavior](#addBehavior)
- [removeBehavior](#removeBehavior)
- [addBody](docs/api-client.md#addbody)
- [removeBody](docs/api-client.md#removebody)
- [addCollision](docs/api-client.md#addcollision)
- [removeCollision](docs/api-client.md#removecollision)
- [removeAllCollisions](docs/api-client.md#removeallcollisions)

---

### addFilter

```js
l1.addFilter(entity, options)
```

Filters can be any built in filter in Pixi or any filter from `pixi-filters`

http://pixijs.download/dev/docs/PIXI.filters.html

https://github.com/pixijs/pixi-filters


#### Arguments

`entity` (object): The entity to apply the filter to. Has to be `sprite` or `animation`

`filter` (Filter): The filter instance

#### Returns

(Filter): The filter instance

#### Example

```js
l1.addFilter(entity, Filter.Filter.GlowFilter())
```

---

### clearFilters

```js
Filter.clear(entity)
l1.clearFilters()
```

Removes all filters from entity

#### Arguments

`entity` (Object): The entity with the filters to remove

#### Returns

Nothing.

---

### Filter

```js
Filter.Filter
```

Object that contains all filters


#### Example

```js
Filter.add(entity, Filter.Filter.GlowFilter)
```

#### removeFilter

```js
l1.removeFilter(entity, filterId)
```

NOT IMPLEMENTED

---

### addBehavior

```js
l1.addBehavior(entity, options)
```

Behaviors are run every update

#### Arguments

`entity` (Object): The entity to apply the the behavior to

`options` (Object): The behavior instance

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**id** | String | [ ] | uuid | Used to find the behavior when it's removed
**timer** | Number | [ ] | 0 | -
**loop** | Boolean | [ ] | false | If true, the behaviors timer will be automatically restarted upon completion
**removeOnComplete** | Boolean | [ ] | true | If true, the behavior will automatically be removed upon completion
**onInit** | Function | [ ] | - | A callback that is executed the first time the behavior is run
**onUpdate** | Function | [ ] | - | A callback that is executed on every update
**onTimerEnd** | Function | [ ] | - | A callback that is executed when the timer reaches completion
**onRemove** | Function | [ ] | - | A callback that is executed when the behavior is removed
**enabled** | Function | [ ] | true | Can be set to false to prevent the behaviors timer from being updated
**data** | Object | [ ] | - | An object that can hold arbitrary data.

onInit({ entity, data })

onUpdate({ entity, data, counter })

The timer counter can be used with animations

onTimerEnd({ entity, data })

onRemove({ entity, data })

#### Returns

(Object): The behavior instance

#### Example

```js
l1.addBehavior(entity, {
  id: 'move',
})
```

---

l1.removeBehavior()

---

```js
l1.sound(options)
```

#### Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**src** | String | [x] | - | The sound to play.
**volume** | Number | [ ] | 0.5 | The volume
**loop** | Boolean | [ ] | false | If the sound should be played continuously.

#### Returns

(object): The sound entity

#### Example

```js
l1.sound({
  src: 'explosion',
  volume: 0.1,
  loop: true,
})
```

---

## Utils

- [getRandomInRange](docs/api-client.md#getrandominrange)
- [distance](docs/api-client.md#distance)
- [grid](docs/api-client.md#grid)
- [angle](docs/api-client.md#angle)
- [toRadians](docs/api-client.md#torandians)

---

### getRandomInRange

```javascript
l1.getRandomInRange(from, to)
```

Get a random number in range (from (inclusive) - to (exclusive))

#### Arguments

`from` (number): Inclusive
`to` (number): Exclusive

#### Returns

(Number): The randomly generated number

---

### grid

```js
l1.grid(options)
```

Returns a function to get coordinates. Useful for placing objects on a grid.

#### Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**x** | Number | - [x] | - | The x coordinate of the top left corner 
**y** | Number | - [x] | - | The y coordinate of the top left corner
**marginX** | Number | - [x] | - | The space between each cell on the x axis
**marginY** | Number | - [x] | - | The space between each cell on the y axis
**itemsPerRow** | Number | - [x] | - | The amount of items on a row before a line break

#### Returns

(Function): A function with the signature: (index) => { x, y }

#### Example

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

### angle

```js
l1.angle(options)
```

Get the angle between two points, in radians.

#### Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**x1** | Number | - [x] | - | The x coordinate of the start position
**y1** | Number | - [x] | - | The y coordinate of the start position
**x2** | Number | - [x] | - | The x coordinate of the end position
**y2** | Number | - [x] | - | The y coordinate of the start position

#### Returns

(Number): The angle in radians. 

#### Example

```js
// TODO
```

---

#### distance

```javascript
Util.distance(options)
l1.distance()
```

Get the distance between two points.

#### Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**x1** | Number | [x] | - | The x coordinate of the start position
**y1** | Number | [x] | - | The y coordinate of the start position
**x2** | Number | [x] | - | The x coordinate of the end position
**y2** | Number | [x] | - | The y coordinate of the start position

#### Returns

(Number): The distance.

#### Example

```js
// TODO
```

---

### toRadians

```js
l1.toRadians(degrees)
```

Convert degrees to radians.

#### Arguments

`degrees` (Number)

#### Returns

(Number): Radians.

#### Example

```js
// TODO
```

---

### Matter

Exposes the complete Matter.js API.

http://brm.io/matter-js/docs/

---

- [getPhysicsEngine](docs/api-client.md#getphysicsengine)

---

### addBody

```js
l1.addBody(entity, body)
```

A physics body from Matter.js

#### Arguments

`entity` (object): The entity to apply body to.

`body` (Matter.body): A Matter body.

#### Returns

(Object): The created body.

#### Example

```js
// TODO
```

---

### addCollision

---

### removeCollision

---

### removeAllCollisions

---

### getPhysicsEngine

Returns the physics engine

---

## Gamepad

TODO

### Gamepad.addPreset(typeId: string, preset: L1ControllerPreset)

```javascript
addPreset('MY-POWER CO.,LTD. USB Joystick (Vendor: 0e8f Product: 310d)', new L1ControllerPreset().aliasButton(0, 'y'));
```

### Gamepad.getGamepads()

### Gamepad.isPressed(gamepadId, buttonId:number|alias:string)

---

### L1ControllerPreset - instance methods

```javascript
  const preset = new L1ControllerPreset();
```

#### preset.aliasButton(id, alias)

---

## Debug

### toggleHitBoxes

```js
l1.toggleHitBoxes()
```

#### Arguments

None.

#### Returns

Nothing.

---

## Keyboard input

- [addKey](docs/api-client.md#addKey)
- [isKeyDown](docs/api-client.md#isKeyDown)

---

### add

```js
l1.addKey(key)
```

Enables a key to be used with `l1.isKeyDown`

#### Arguments

`key` (String): The key to enable.

#### Returns

Nothing.

---

### isKeyDown

```js
l1.isKeyDown(key)
```

Call this function each game update to get the state of a key.

#### Arguments

`key` (String): The key to check.

#### Returns

(Boolean): If the key is pressed or not

---

## Net

TODO

### Net.start()

Initialize socket.io client

### Net.on(key: string, func: func)

Run function when message with key is received.

### Net.emit(message: string, data: object)

Send data to all other clients.
