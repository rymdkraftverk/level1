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
```

FINAL API:

Entities:

 - Entities have a list of children (other entities)
 - Entities need to have 1 parent
 - Children will be removed when entity is.
 - An entity can have 0 or 1 asset (Sprite, Animation, Text, BitmapText, Particles, Sound)
 - An entity can have 0 or 1 physics body.
 - An entity has an x and y position
 - An entity's position is relative to its parent 
 - Optional: An entity has width and height. Depends on how collision detection is implemented.

Entity
 .getRoot
 .addChild
 .destroy
 .get
 .getAll
 .getByType
 .setX / Y
 .getX / y 

Dependencies should be locked