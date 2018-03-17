## Getting started

Use the template project as a starter.

### Create game

```javascript
import { Game } from 'l1';
import sprites from './sprites.json';

Game.init(800, 400, sprites).then(() => {
  // Initialize your game here
}
```

Add link to Game.init

---

### Sprites

- Put sprites in `public/assets/`
- Add sprite file name to `src/client/sprites.json`

Example:

`public/assets/mySprite.png`

```json
// src/client/sprites.json
[
  "mySprite"
]

```

*Sprites have to be .png*

---

### Entities

#### Create and add Sprite

```javascript
  import { Entity } from 'l1';

  const lizard = Entity.create('lizard');
  // Add sprite and position it
  const sprite = Entity.addSprite(lizard, 'lizard1');
  sprite.x = 200;
  sprite.y = 200;

```

*Check PIXI.Sprite docs for properties on sprite object*
Add link to PIXI.Sprite

#### Add animation

```javascript
  const sprite = Entity.addAnimation(lizard, ['lizard1', 'lizard2'], 0.1);
  sprite.x = 200;
  sprite.y = 200;
```

*Check PIXI.AnimatedSprite docs for properties on animation object*
Add link to PIXI.AnimatedSprite

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

#### Add behavior to an entity

```javascript
  lizard.behaviors.moveLeft = moveLeft();
```
