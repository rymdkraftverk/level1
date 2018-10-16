---
name: add
---

# add

```js
l1.add(displayObject, options)
```

A replacement for PIXI's `addChild`. It will call `addChild` and add it to level1's display object handler, meaning:

- It can be accessed by `l1.get` and `l1.getByLabel`.
- It can have a custom z-index order.
- Text objects are prepared for rescaling.

## Arguments

`displayObject` (PIXI.DisplayObject): Any object that inherits from PIXI.DisplayObject, such as PIXI.Sprite

`options` (Object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | --
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**parent** | Object | [ ] | null | The parent displayObject. If no parent is passed, the stage will be used.
**labels** | Array | [ ] | [] | Labels are used to group entities together.
**zIndex** | Number | [ ] | null | The stacking order of the entity. Null will be treated as 0.

## Returns

Nothing.

## Example

```js
const entity = l1.sprite({
    texture: 'walk1',
    zIndex: 10,
})

entity.asset.scale.set(2)
```