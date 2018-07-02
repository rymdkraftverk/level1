## New namespaces:

#### Particles

Particles.emit(entity, { 
	id: '', 
	textures: ['yo'],
	config: particleConfig,
})

Particles.stop(entity)

#### Physics

Physics.add(entity, Physics.body)

-----

```js
const walkAnimation = Object.freeze({
	textures: ['walk1', 'walk2'], // throw Error if textures are not set
	animationSpeed: 0.5, // Default = 0.05
	zIndex: 10, // Default = 0
	loop: true, // Default = teuw
	startTexture: ‘walk1’, // Default textures[0]
})

Animation.play(player1, {
	...walkAnimation,
	animationSpeed: 1,
})
Animation.stop(player1)

Sprite.show(player1, {
	texture: 'walk1', // throw Error if texture is not set
	zIndex: 10 // Default = 0
	flipX: true // Default = false
	flipY: true // Default = false
})

Sprite.hide(player1)

Text.show(player1, {
  text: 'hello',
  style: { fontSize: '35px' },
  zIndex: 10,
})
Text.hide(player1)
BitmapText.show()
BitmapText.hide()
Sound.play(player1, {
	src: 'explosion',
	volume: 0.1,
	loop: true,
})
Sound.stop(player1)

// Suggestion
Behavior.add(player1, {
	id: 'running',
	behavior: running,
	memoize: true,
})
// add() enables us to check for duplicate id's when adding

Behavior.get()
Behavior.remove()
```

Entities:

 - Entities have a list of children (other entities)
 - Entities need to have 1 parent
 - Children will be removed when entity is.
 - An entity can have 0 or 1 asset (Sprite, Animation, Text, BitmapText, Particles, Sound)
 - An entity can have 0 or 1 physics body.
 - An entity has an x and y position
 - An entity's position is relative to its parent 
 - Optional: An entity has width and height. Depends on how collision detection is refactored.

```js
const root = Entity.getRoot()

const player1 = Entity.addChild(root, {
	id: 'player1', 
	x: 10, 
	y: 10,
})

Entity.setX(player1, 100)

const player1Again = Entity.get('player1')

Entity.destroy(player1)

Also
Emtity
 .getAll
 .getByType
 .getX / y 

player1
	.parent
	.children
```

Properties on entity need to be treated as immutable:

__internal: {
	__sprite: Object
}

Use getters and setters to throw error if properties are set directly

Entity.debug() for pretty print

entity.data or entity.state ??
