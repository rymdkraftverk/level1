---
name: container
---

# container

```js
l1.container(options)
```

Use this to create a container for other entities.

## Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | --
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**types** | Array | [ ] | [] | Types are used to group entities together.
**parent** | Object | [ ] | null | The parent entity. Entity's position will be relative to the parent position. If parent is destroyed, this entity will also be destroyed.
**zIndex** | Number | [ ] | 0 | The stacking order of the entity

## Returns

(object): The created entity.

#### Example

```js
// TODO
```
