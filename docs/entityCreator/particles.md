---
name: particles
---

```js
l1.particles(options)
```

https://pixijs.io/pixi-particles-editor/

#### Arguments

`options` (Object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**config** | Object | [x] | - | The emitter config to use
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**parent** | Object | [ ] | null | The parent entity. Entity's position will be relative to the parent position. If parent is destroyed, this entity will also be destroyed.
**textures** | Array | [x] | - | The sprites to use for the emitter
**types** | Array | [ ] | [] | Types are used to group entities together.
**zIndex** | Number | [ ] | 0 | The stacking order of the entity

#### Emitter config options

TODO

```js
{
  pos: {
    x: Number,
    y: Number,
  },
  color: {

  }
}
```

#### Returns

(Object): The created particle entity.

#### Example

```js
l1.particles({
    textures: ['pixel'],
    config: particleConfig,
})
```
