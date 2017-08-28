Libraries used:

 - Rendering: Pixi.js (https://github.com/pixijs/pixi.js)
 - Physics: Matter.js (https://github.com/liabru/matter-js)
 - Sound: Howler.js (https://github.com/goldfire/howler.js)
 - Multiplayer: Socket.io (https://github.com/socketio/socket.io)

## Develop

In `client` and `server`

`npm install` = Install dependencies

`npm run build:watch` = Continously build dist files

## Use - Client

### Sprites

- Put sprites in `public/assets/`
- Add sprite file name to `src/sprites.json`

*Sprites have to be .png*

Example:

`public/assets/mySprite.png`

```json
// src/sprites.json
[
  "mySprite"
]

```

---

### Entities

##### Create

Entity.create(id: string)

```javascript
  import { Entity } from 'l1-lite';

  const lizard = Entity.create('lizard');
```

##### Add sprite and position it

Entity.addSprite(entity: object, filename: string)

```javascript
  const lizardSprite = Entity.addSprite(lizard, 'lizard1');
  lizardSprite.x = 200;
  lizardSprite.y = 200;
```

Check PIXI.Sprite docs for properties on sprite object


##### Add animation

Entity.addAnimation(entity: object, filenames: array[string], animationSpeed: number)


```javascript
  const lizardAnim = Entity.addAnimation(lizard, ['lizard1', 'lizard2'], 0.1);
  lizardAnim.x = 200;
  lizardAnim.y = 200;
```

Check PIXI.AnimatedSprite docs for properties on animation object

##### Add behaviour

```javascript
  lizard.behaviours['moveLeft'] = moveLeft();
```

---

### Behaviours

Behaviours are objects with two properties: 

 - `run(behaviour, entity)` which is called 60 times per second. (mandatory)

 - `init(behaviour, entity)` which is only called once when the entity is first added. (optional)

 Both are passed the current behaviour as first argument and the entity that the
 behaviour belongs to as the second argument.

```javascript
  const moveLeft = () => ({
    init: (behaviour, entity) => {

    },
    run: (behaviour, entity) => {
      entity.sprite.x -= 1;
    },
  })
```

---

## API - Client

### Entity

##### create(id: string) => EntityObject

##### addSprite(entity: object, filename: string, ?options: object) => PIXI.Sprite

```javascript
options: {
  zIndex: number
}
```

##### addAnimation(entity: object, filenames: array[string], animationSpeed: number)

##### addBody(entity: object, body: Matter.Body)

*Add Physics body*

##### removeBody(body: Matter.Body)

##### destroy(entity: object)

*Remove entity, sprite, animation and body.*

---

### EntityObject

##### entity.id

*Unique id*

##### entity.type

*Type field to group entities together (Should perhaps be an array...)*

##### entity.behaviours (object)

*Map with all behaviours*

##### entity.body

*Physics body. Always has default body with entity as only property.*

##### ?entity.sprite

*Only available after Entity.addSprite or Entity.addAnimation has been used*

---

### Net

##### on(key: string, func: func)

*Run function when message with key is received*

##### emit(message: string, data: object)

*Send data to all other clients*

---

### Timer

*Timer starts at 0 and counts up to duration.*

##### create(duration: number) => TimerObject

---

### TimerObject

##### run()

*Call on every game update. Will return true when duration is reached.*

Example usage:

```javascript
  timerBehaviour = () => ({
    timer: Timer.create(100),
    run: (b, e) => {
      if (b.timer && b.timer.run()) {
        // Run code when timer duration is reached
      }
    } 
  })
```

##### reset()

*Reset counter to 0.*

##### counter()

*The current value of the counter.*

##### duration()

*Get duration.*

---

### Sound

##### getSound(filePath: string, ?options: object)

*Options are Howler options other than src.*

https://github.com/goldfire/howler.js#options

---

### Core

##### createCore()

*Initialize game main loop*

##### createPhysics()

*Initialize Matter.Engine*

##### getEntities()

*Get all entities*

##### get(id: string)

*Get entitiy by id*

---

### Render

##### add(child: object)

*Child is a PIXI object (Sprite, AnimatedSprite or Text)*

##### remove(child: object)

*Child is a PIXI object (Sprite, AnimatedSprite or Text)*

*Note: Only remove what's being rendered. Entity will still exist.*

##### getText(text: string, ?options: object(PIXI.TextStyle))

*Options are a PIXI.TextStyle object.*

http://pixijs.download/release/docs/PIXI.TextStyle.html

---

### Util

##### getRandomInRange(from: number, to: number)

Get a random number in range (from - to)

---

## API - Server

### Server

##### start(?options: object)

options: {
  network: bool
}

---

### Net

##### on(key: string, func: func)

##### emit(key: string, data: object)

##### broadcast(key: string, data: object)

---

##### TODO


