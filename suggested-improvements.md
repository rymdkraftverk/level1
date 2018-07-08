
```js

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

```


```js

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

Move eslint config to root and share it for all projects??

Move docs to their respective projects

Render hitboxes have to be based on entity bounds not sprite bounds.

Mark entity for removal and remove all "to be removed entities" next update

Fix tests

Add lizard to test animation