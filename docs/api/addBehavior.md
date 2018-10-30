---
name: addBehavior
---

# addBehavior

```js
l1.addBehavior(options)
```

Use behaviors when you want to affect the properties of a display object. For example: position, scale or rotation.

## Arguments

`options` (Object): The behavior instance

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**data** | Object | No | - | An object that can hold arbitrary data. Is passed as an argument to all callback functions.
**duration** | Number | No | 0 | How many updates until the behavior is complete. If no duration is passed, the behavior will run until removed. If not integer, will be rounded down to the nearest integer
**enabled** | Function | No | true | Can be set to false to prevent the behaviors timer from being updated
**id** | String | No | uuid | Used with `getBehavior`, `resetBehavior` and `removeBehavior`
**labels** | Array | No | [] | Used to group behaviors together
**loop** | Boolean | No | false | If true, the behavior's counter will be automatically reset upon completion
**removeOnComplete** | Boolean | No | true | If true, the behavior will automatically be removed upon completion
**onComplete** | Function | No | - | A callback that is executed when the behavior reaches completion. Is called with an object that has `data` as its only property
**onInit** | Function | No | - | A callback that is executed the first time the behavior is run. Is called with an object that has `data` as its only property
**onRemove** | Function | No | - | A callback that is executed when the behavior is removed. Is called with an object that has `data` as its only property
**onUpdate** | Function | No | - | A callback that is executed on every update (Default: 60 times per second). Is called with an object that has a `data` and a `counter` property

Note: If loop is `true`, the value of `removeOnComplete` is ignored.

## Returns

(Object): The behavior instance

## Example

```js
const move = (sprite) => ({
  id: 'move',
  onUpdate: ({ counter }) => {
    sprite.x += counter
  },
})

const sprite = new PIXI.Sprite()

l1.addBehavior(
  move(sprite),
)
```
