---
name: once
---

# once

```js
l1.once(callback, [delay = 1])
```

Will execute a callback once after a `delay` amount of game updates. Think of it as a `setTimeout` that is controlled by updates from a game loop.

## Arguments

`callback` (Function): Executed when a `delay` amount of game updates has passed.

`delay` (Integer, optional): Game updates before executing the callback. 

## Returns

(Object): The behavior instance. Has two properties that can be set:

Option | Type | Description
-- | -- | -- |
**id** | String | Used with `get` and `remove`
**labels** | Array (String) | Used to group behaviors together

## Misc

The behavior object will be removed on the next game update, once its callback is executed.

## Example

```js
const delay = 60

export default () => new Promise((res) => {
  l1.once(() => {
    // Promise resolves after 60 game updates
    res()
  }, delay)
})
```
