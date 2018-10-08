---
name: destroy
---

# destroy

```js
l1.destroy(entity)
```

Removes the entity, its asset and all its children.

Will remove all behaviors from entity and children. The `onRemove` callback will be invoked on all of them.

## Arguments

`entity` (Object|String): The entity to remove. Optionally an entity id.

## Returns

Nothing.
