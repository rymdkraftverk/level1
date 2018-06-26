## New namespaces:

#### Particles

Particles.add(entity, { id: '', options })
Particles.emit(entity, { id: '', options })

#### Animation 

```javascript
Animation.add(entity, {
	id: ‘walking’,
	textures: [‘walk1’, ‘walk2’],
	animationSpeed: 0.5,
	zIndex: 10,
})

Animation.play(entity, {
	id: ‘walking’,
	loop: true,
	startTexture: ‘walk1’,
	duration: 30,
})

Animation.stop(entity, ‘walking’)

Animation.stopAll(entity)

Animation.remove
```

#### Sprite

Sprite.add(entity, { 
  id: 'standing',
  texture: 'standing',
  zIndex: 10,
})

Sprite.show(entity, 'standing')

Sprite.hide(entity, 'standing')

Sprite.hideAll(entity)

Sprite.remove(entity, 'standing')

#### Physics

Physics.add(entity, { options })

