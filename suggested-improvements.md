## New namespaces:

#### Particles

Particles.add(entity, { id: '', options })
Particles.emit(entity, { id: '', options })

#### Animation 

1. Entity can have multiple sprites and animations
2. Add all animations and sprites when entity is created
3. Animations have a way to be started and stopped.
4. Sprites have a way to be displayed and hidden.
5. Multiple animations/sprites can be shown/played at once.
6. Stopping an animation will hide it.

This would require `entity` to have a concept of x and y, perhaps even width and height, that are separate from pixis x and y.

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

#### Text

Text.add(entity, {
  text: 'hello',
  style: { fontSize: '35px' },
  zIndex: 10,
})

show / hide / remove