---
name: repeat
---

# repeat

```js
l1.repeat(callback, [interval = 1])
```

Will execute a callback repeatedly every `interval` amount of game updates. Think of it as a `setInterval` that is controlled by updates from a game loop.

## Arguments

`callback` (Function): Executed every `interval` amount of game updates. Is called with one argument: `counter`, which is the amount of game updates since the behavior was created.

`interval` (Integer, optional): Game updates before executing the callback. 

## Returns

(Object): The behavior instance. Has two properties that can be set:

Option | Type | Description
-- | -- | -- |
**id** | String | Used with `get` and `remove`
**labels** | Array (String) | Used to group behaviors together

## Misc

The behavior object will not be removed until you call `l1.remove`.

## Example 

```js
const sprite = new PIXI.Sprite()

l1.repeat((counter) => {
  sprite.x = counter
})
```
