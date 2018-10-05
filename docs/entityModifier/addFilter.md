---
name: addFilter
---

# addFilter

```js
l1.addFilter(entity, filter, id)
```

Add a filter to an entity. Is auto-curried.

Filters can be any built in filter in Pixi or any filter from `pixi-filters`

http://pixijs.download/dev/docs/PIXI.filters.html

https://github.com/pixijs/pixi-filters

## Arguments

`entity` (object): The entity to apply the filter to. Has to be `sprite` or `animation`

`filter` (Filter): The filter instance

`id` (String): Filter id to use when removing (Optional)

## Returns

(Entity): The entity that had the filter applied to it.

#### Example

```js
l1.addFilter(
  entity, 
  new l1.Filter.GlowFilter(),
  'glow',
)
```
