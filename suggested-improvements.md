
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

Separate setting and changing asset on an entity to prevent against accidentally override an asset

Should entity just be an asset????

Decide if we want anchor point to be in center or top left

Rename sprites to textures in assets.json??

Emitter should not be able to take a position option??

List emitter options in level1
