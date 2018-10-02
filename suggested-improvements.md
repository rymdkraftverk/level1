
Suggestions for readme:

Level1 attempts to make it as easy as possible to create 2D games using javascript.

It takes pixi and adds a game loop with the concept of entities and behaviours. That’s it.

level1 uses Pixi webGLRenderer only.

The purpose is to add sound and physics to pixis renderer, and also other useful utils to aid with game development.

Text style
https://pixijs.io/pixi-text-style/#

Particles
<Insert particle editor>

Sound
<Insert sound generator>


Pixi utils lib instead, exposing pixi stuff to the user

Pixi game tools
Loop
Entity -> Behaviour concept
Preload textures to use
 Get started quickly developing games using PIXI

Changes to be more pixi utils:

entity => container (use pixi container)
Which means that x,y,width,height is not passed to entity creator anymore

Absolute position == world transform
“Don’t include anything that is already in pixi)

Use pixi container in level1 and use that for moving multiple entities at once
Z-index needs to be handled per container


Gotchas:

Text cannot be resized by using the asset.scale property and keep the same visual quality, due to current limitations in pixi. Instead you need to use `l1.scaleText`.