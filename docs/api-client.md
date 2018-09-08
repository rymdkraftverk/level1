# API: Client

```js
import l1 from 'l1'
```

## Table of contents

### Game

- [getRenderer](#getrenderer)
- [getStage](#getstage)
- [init](#init)
- [resize](#resize)
- [start](#start)
- [stop](#stop)

### Entity creators

- [animation](#animation)
- [bitmapText](#bitmaptext)
- [entity](#entity)
- [graphics](#graphics)
- [particles](#particles)
- [sound](#sound)
- [sprite](#sprite)
- [text](#text)

### Entity utils

- [destroy](#destroy)
- [get](#get)
- [getAllEntities](#getallentities)
- [getById](#getbydd)
- [getByType](#getbytype)
- [getOverlappingArea](#getoverlappingarea)
- [getX](#getx)
- [getY](#gety)
- [hide](#hide)
- [isColliding](#iscolliding)
- [show](#show)

### Entity modifiers

- [addBehavior](#addbehavior)
- [addBody](#addbody)
- [addCollision](#addcollision)
- [addFilter](#addfilter)
- [addType](#addyype)
- [clearFilters](#clearfilters)
- [Filter](#filter)
- [getBehavior](#getbehavior)
- [removeAllCollisions](#removeallcollisions)
- [removeBehavior](#removebehavior)
- [removeBody](#removebody)
- [removeCollision](#removecollision)
- [removeFilter](#removefilter)
- [removeType](#removetype)
- [resetBehavior](#resetbehavior)
- [scaleText](#scaletext)

### Utils

- [angle](#angle)
- [distance](#distance)
- [getRandomInRange](#getrandominrange)
- [grid](#grid)
- [toRadians](#torandians)

### Keyboard input

- [addKey](#addkey)
- [isKeyDown](#iskeydown)

### Physics

- [getPhysicsEngine](#getphysicsengine)

---

## Game

### getRenderer

```js
l1.getRenderer()
```

#### Arguments

None.

#### Returns

(PIXI.WebGLRenderer)

---

### getStage

```js
l1.getStage()
```

#### Arguments

None.

#### Returns

(PIXI.Container): The root PIXI container

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
**assets** | Object | [ ] | - | An object that defines assets for the game. This is only needed if level1 can't read the contents of the assets folder.
**debug** | Boolean | [ ] | false | Display the debug tools underneath game window
**element** | HTMLElement | [ ] | `document.body` | Where to inject the game
**height** | Number | [ ] | 600 | The height of the game
**physics** | Boolean | [ ] | false | Enable physics provided by matter-js
**pixi** | Object | [ ] | - | Object with pixi options
**width** | Number | [ ] | 800 | The width of the game

```js
  pixi: {
    options: {
      // Options to the WebGLRenderer goes here
      // http://pixijs.download/dev/docs/PIXI.WebGLRenderer.html#WebGLRenderer
    },
    settings: {
      // Pixi settings goes here
      // http://pixijs.download/dev/docs/PIXI.settings.html
    }
  }
```

#### Returns

(Promise): A promise that will resolve once all the assets are loaded.

#### Example

```js
l1.init({
  width: 800,
  height: 600,
  pixi: {
    options: {
        antialias: true,
    }
    settings: {
        SCALE_MODE: PIXI.SCALE_MODES.NEAREST,
    }
  }
}).then(() => {
  // Game is started
})

```

---

### resize

```js
l1.resize(width, height)
```

Resize the renderer and stage. Use this when setting the width and height based on the window size.

#### Arguments

`width` (object): The new width of the renderer.

`height` (object): The new height of the renderer.

#### Returns

Nothing.

#### Example

```js
const resizeGame = () => {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  l1.resize(screenWidth, screenHeight)
}

window.addEventListener('resize', resizeGame)
```

---

### start

```js
l1.start()
```

Start the game loop. Game is automatically started when using `l1.init`.

#### Arguments

None.

#### Returns

Nothing.

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

## Entity creators

### animation

```js
l1.animation(options)
```

#### Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | --
**height** | Number | [ ] | 0 | The height of the entity. Used for non-physics based collision detection.
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**parent** | Object | [ ] | null | The parent entity. Entity's position will be relative to the parent position. If parent is destroyed, this entity will also be destroyed.
**speed** | Number | [ ] | 0.05 | The speed of toggling between textures. Higher number equals faster speed.
**textures** | Array | [x] | - | A list of texture id's
**types** | Array | [ ] | [] | Types are used to group entities together.
**width** | Number | [ ] | 0 | The width of the entity. Used for non-physics based collision detection.
**x** | Number | [ ] | 0 | The x position of the entity, relative to the parent.
**y** | Number | [ ] | 0 | The y position of the entity, relative to the parent.
**zIndex** | Number | [ ] | 0 | The stacking order of the entity
**loop(not implemented)** | Boolean | [ ] | true | If the animation should loop from the first texture when complete.

#### Returns

(Object): The animation entity

#### Example

```js
const walkAnimation = {
    textures: ['walk1', 'walk2'],
    speed: 0.5,
    zIndex: 10,
}

const entity = l1.animation({
    ...walkAnimation,
    speed: 1,
})
entity.asset.scale.set(2)
```

---

### bitmapText

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

### entity

```js
l1.entity(options)
```

Use this to create a generic entity with no visuals. One example use case is a container for other entities.

#### Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | --
**height** | Number | [ ] | 0 | The height of the entity. Used for non-physics based collision detection.
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**types** | Array | [ ] | [] | Types are used to group entities together.
**parent** | Object | [ ] | null | The parent entity. Entity's position will be relative to the parent position. If parent is destroyed, this entity will also be destroyed.
**width** | Number | [ ] | 0 | The width of the entity. Used for non-physics based collision detection.
**x** | Number | [ ] | 0 | The x position of the entity, relative to the parent.
**y** | Number | [ ] | 0 | The y position of the entity, relative to the parent.

#### Returns

(object): The created entity.

#### Example

```js
// TODO
```

---

### graphics

```js
l1.graphics(options)
```

A graphics object is used to draw lines and shapes.

#### Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**height** | Number | [ ] | 0 | The height of the entity. Used for non-physics based collision detection.
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**parent** | Object | [ ] | null | The parent entity. Entity's position will be relative to the parent position. If parent is destroyed, this entity will also be destroyed.
**types** | Array | [ ] | [] | Types are used to group entities together.
**width** | Number | [ ] | 0 | The width of the entity. Used for non-physics based collision detection.
**x** | Number | [ ] | 0 | The x position of the entity, relative to the parent.
**y** | Number | [ ] | 0 | The y position of the entity, relative to the parent.
**zIndex** | Number | [ ] | 0 | The stacking order of the entity

#### Returns

(Object): A graphics entity

#### Example

```js
// TODO
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
**config** | Object | [x] | - | The emitter config to use
**height** | Number | [ ] | 0 | The height of the entity. Used for non-physics based collision detection.
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**parent** | Object | [ ] | null | The parent entity. Entity's position will be relative to the parent position. If parent is destroyed, this entity will also be destroyed.
**textures** | Array | [x] | - | The sprites to use for the emitter
**types** | Array | [ ] | [] | Types are used to group entities together.
**width** | Number | [ ] | 0 | The width of the entity. Used for non-physics based collision detection.
**x** | Number | [ ] | 0 | The x position of the entity, relative to the parent.
**y** | Number | [ ] | 0 | The y position of the entity, relative to the parent.
**zIndex** | Number | [ ] | 0 | The stacking order of the entity

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

```js
l1.sound(options)
```

#### Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**loop** | Boolean | [ ] | false | If the sound should be played continuously.
**src** | String | [x] | - | The sound to play.
**volume** | Number | [ ] | 0.5 | The volume

#### Returns

(object): The sound entity

#### Example

```js
l1.sound({
  src: 'explosion',
  volume: 0.1,
  loop: false,
})
```

---

### sprite

```js
l1.sprite(options)
```

Create a new sprite entity

#### Arguments

`options` (Object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | --
**height** | Number | [ ] | 0 | The height of the entity. Used for non-physics based collision detection.
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**parent** | Object | [ ] | null | The parent entity. Entity's position will be relative to the parent position. If parent is destroyed, this entity will also be destroyed.
**texture** | String | [x] | - | A texture filename from the `assets` folder.
**types** | Array | [ ] | [] | Types are used to group entities together.
**width** | Number | [ ] | 0 | The width of the entity. Used for non-physics based collision detection.
**x** | Number | [ ] | 0 | The x position of the entity, relative to the parent.
**y** | Number | [ ] | 0 | The y position of the entity, relative to the parent.
**zIndex** | Number | [ ] | 0 | The stacking order of the entity
**flipX (not implemented)** | Boolean | [ ] | false | TBD
**flipY (not implemented** | Boolean | [ ] | false | TBD

#### Returns

(Object): The sprite entity

#### Example

```js
const entity = l1.sprite({
    texture: 'walk1',
    zIndex: 10,
})

entity.asset.scale.set(2)
```

---

### text

```js
l1.text(options)
```

#### Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | --
**height** | Number | [ ] | 0 | The height of the entity. Used for non-physics based collision detection.
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**parent** | Object | [ ] | null | The parent entity. Entity's position will be relative to the parent position. If parent is destroyed, this entity will also be destroyed.
**style** | Object | [x] | - | A PIXI [TextStyle](http://pixijs.download/dev/docs/PIXI.TextStyle.html) object
**text** | String | [x] | - | The text to display
**types** | Array | [ ] | [] | Types are used to group entities together.
**width** | Number | [ ] | 0 | The width of the entity. Used for non-physics based collision detection.
**x** | Number | [ ] | 0 | The x position of the entity, relative to the parent.
**y** | Number | [ ] | 0 | The y position of the entity, relative to the parent.
**zIndex** | Number | [ ] | 0 | The stacking order of the entity

#### Returns

(Object): The text entity

#### Example

```js
l1.text({
    text: 'hello',
    style: { fontSize: 35 },
    zIndex: 10,
})
```

---

### Entity object properties

The following properties are specified for objects created by any Entity creator function.

Property | Type | Description
-- | -- | --
**asset** | (*) | Either null, `sprite`, `animation`, `sound`, `particles`, `graphics`, `text` or `bitmapText`
**behaviors** | Array | A list of all behaviors
**body** | Object | Physics body. Always has default body with entity as only property
**children ** | Array | A list of child entities.
**id** | String | Unique id
**parent** | Object | [ ] | null | The parent entity. Entity's position will be relative to the parent position. If parent is destroyed, this entity will also be destroyed.
**types** | Array | Type field to group entities together, also used for collisions

---

## Entity utils

### destroy

```js
l1.destroy(entity)
```

Removes the entity, its asset and all its children.

#### Arguments

`entity` (Object|String): The entity to remove. Optionally an entity id.

#### Returns

Nothing.

---

### get

```js
l1.get(id)
```

Get entity by id.

`getById` is an alias for `get`

#### Arguments

`id` (String): The entity id.

#### Returns

(*): Returns the found entity, else undefined.

---

### getAllEntities

```js
l1.getAllEntities()
```

#### Arguments

None.

#### Returns

(Array): All entities.

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

### getOverlappingArea

```js
l1.getOverlappingArea(otherEntity, entity)
```

#### Arguments

`otherEntity` (Object) The second entity to use for overlap detection.

`entity` (Object): The first entity to use for overlap detection.

#### Returns

(Number): The area that is overlapping.

---

### getX

```js
l1.getX(entity)
```

Gets the absolute x coordinate of an entity

#### Arguments

`entity` (Object)

#### Returns

(Number): The absolute x coordinate

---

### getY

```js
l1.getY(entity)
```

Gets the absolute y coordinate of an entity

#### Arguments

`entity` (Object)

#### Returns

(Number): The absolute y coordinate

---

### hide

Not implemented yet

---

### isColliding

```js
l1.isColliding(otherEntity, entity)
```

#### Arguments

`otherEntity` (Object) The second entity to use for collision detection.

`entity` (Object): The first entity to use for collision detection.

#### Returns

(Boolean): Returns true if entities are colliding.

---

### hide

```js
l1.hide(entity)
```

#### Arguments

`entity` (Object): The entity to hide.

#### Returns

(Object): The hidden entity

---

### show

```js
l1.show(entity)
```

Not implemented

#### Arguments

`entity` (Object): The hidden entity to show.

#### Returns

(Object): The entity

---

## Entity modifiers

Entity modifier functions are auto-curried and easily composable. The entity is always the last argument.

### addBody

```js
l1.addBody(body, entity)
```

A physics body from Matter.js

#### Arguments

`body` (Matter.body): A Matter body.

`entity` (object): The entity to apply body to.

#### Returns

(Object): The created body.

#### Example

```js
// TODO
```

---

### addFilter

```js
l1.addFilter(filter, entity)
```

Filters can be any built in filter in Pixi or any filter from `pixi-filters`

http://pixijs.download/dev/docs/PIXI.filters.html

https://github.com/pixijs/pixi-filters

#### Arguments

`filter` (Filter): The filter instance

`entity` (object): The entity to apply the filter to. Has to be `sprite` or `animation`

#### Returns

(Filter): The filter instance

#### Example

```js
l1.addFilter(new l1.Filter.GlowFilter(), entity)
```

---

### clearFilters

```js
l1.clearFilters(entity)
```

Removes all filters from entity

#### Arguments

`entity` (Object): The entity with the filters to remove

#### Returns

Nothing.

---

### Filter

```js
l1.Filter
```

Object that contains all filters

#### Example

```js
Filter.add(new l1.Filter.GlowFilter(), entity)
```

#### removeFilter

```js
l1.removeFilter(filterId, entity)
```

NOT IMPLEMENTED

---

### addBehavior

```js
l1.addBehavior(options, entity)
```

Behaviors are triggered every update. (Default: 60 times per second)

#### Arguments

`options` (Object): The behavior instance

`entity` (Object): The entity to apply the the behavior to

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**id** | String | [ ] | uuid | Used to find the behavior when it's removed
**endTime** | Number | [ ] | 0 | How many updates until the behavior is complete
**loop** | Boolean | [ ] | false | If true, the behaviors counter will be automatically reset upon completion
**removeOnComplete** | Boolean | [ ] | true | If true, the behavior will automatically be removed upon completion
**onInit** | Function | [ ] | - | A callback that is executed the first time the behavior is run
**onUpdate** | Function | [ ] | - | A callback that is executed on every update (Default: 60 times per second)
**onComplete** | Function | [ ] | - | A callback that is executed when the behavior reaches completion
**onRemove** | Function | [ ] | - | A callback that is executed when the behavior is removed
**enabled** | Function | [ ] | true | Can be set to false to prevent the behaviors timer from being updated
**data** | Object | [ ] | - | An object that can hold arbitrary data.

Note: If loop is `true`, the value of `removeOnComplete` is ignored

onInit({ entity, data })

onUpdate({ entity, data, counter })

The counter can be used with animations

onComplete({ entity, data })

onRemove({ entity, data })

#### Returns

(Object): The behavior instance

#### Example

```js
// Behavior config should be returned from functions, to make sure a unique copy is created every time.
const move = () => ({
  id: 'move',
})

l1.addBehavior(move(), entity)
```

---

```js
l1.removeBehavior(id, entity)
```

TODO

---

## Util

### angle

```js
l1.angle(options)
```

Get the angle between two points, in radians.

#### Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**x1** | Number | [x] | - | The x coordinate of the start position
**y1** | Number | [x] | - | The y coordinate of the start position
**x2** | Number | [x] | - | The x coordinate of the end position
**y2** | Number | [x] | - | The y coordinate of the start position

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
**x** | Number | [x] | - | The x coordinate of the top left corner 
**y** | Number | [x] | - | The y coordinate of the top left corner
**marginX** | Number | [x] | - | The space between each cell on the x axis
**marginY** | Number | [x] | - | The space between each cell on the y axis
**itemsPerRow** | Number | [x] | - | The amount of items on a row before a line break

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

### toRadians

```js
l1.toRadians(degrees)
```

Converts degrees to radians.

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

### addCollision

TODO

---

### removeCollision

TODO

---

### removeAllCollisions

TODO

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

### setShowHitboxes

```js
l1.setShowHitboxes(show)
```

#### Arguments

`show` (boolean): If true, display hitboxes

#### Returns

Nothing.

---

## Keyboard input

TODO

### addKey

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
