---
name: graphics
---

# graphics

```js
l1.graphics(options)
```

A graphics object is used to draw lines and shapes.

## Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**parent** | Object | [ ] | null | The parent entity. Entity's position will be relative to the parent position. If parent is destroyed, this entity will also be destroyed.
**types** | Array | [ ] | [] | Types are used to group entities together.
**zIndex** | Number | [ ] | 0 | The stacking order of the entity

## Returns

(Object): A graphics entity

## Example

```js
// TODO
```
