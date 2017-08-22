## Develop

`npm run build:watch`

## Use

### Sprites

- Put sprites in `public/assets/`
- Add sprite file name to `src/sprites.json`

### Entities

##### Create

Entity.create(id: string)

```javascript
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

##### Add behaviour

```javascript
  lizard.behaviours['moveLeft'] = moveLeft();
```

### Behaviours

Behaviours are objects with two properties: 

 - `run` which is called 60 times per second. (mandatory)

 - `init` which is only called once when the entity is first added. (optional)

```javascript
  const moveLeft = () => ({
    init: (behaviour, entity) => {

    },
    run: (behaviour, entity) => {
      entity.sprite.x -= 1;
    },
  })
```
