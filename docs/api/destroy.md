---
name: destroy
---

# destroy

```js
l1.destroy(displayObject, options)
```

Will call `removeChild` on the parent. Will call `destroy` on the `displayObject` itself. Will remove any reference to the object in level1.

## Arguments

`displayObject` (Object|String): The display object to remove. Optionally a display object id.

`options` (Object): Options to the `displayObject` `destroy` function.

## Returns

Nothing.
