# Getting started

Use the template project as a starter.

## Create game

```js
import l1 from 'l1';

l1.init({
  width: 800,
  height: 400,
}).then(() => {
  // Initialize your game here
}
```

Docs: [l1.init](game/init)

---

### Assets

Assets can be sounds or .png files

Put them in `public/assets/`

---

### Entities

#### Create a sprite

```javascript
  import l1 from 'l1';

  const lizard = l1.sprite({
    id: 'lizard',
    texture: ['lizard1'],
  });
  lizard.asset.x = 200;
  lizard.asset.y = 200;

```

*Check PIXI.Sprite docs for properties on sprite object*
Docs: [PIXI.Sprite](http://pixijs.download/dev/docs/PIXI.Sprite.html)

#### Add animation

```javascript
  const lizard = l1.animation({
    textures:['lizard1', 'lizard2'],
  });
  lizard.asset.animationSpeed = 0.05;
  lizard.asset.x = 200;
  lizard.asset.y = 200;
```

*Check PIXI.AnimatedSprite docs for properties on animation object*
Docs: [PIXI.extras.AnimatedSprite](http://pixijs.download/dev/docs/PIXI.extras.AnimatedSprite.html)

---

### Behaviors

TODO
