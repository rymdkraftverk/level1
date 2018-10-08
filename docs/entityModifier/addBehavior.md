---
name: addBehavior
---

# addBehavior

```js
l1.addBehavior(entity, behavior)
```

TODO: Add explanation for behaviors

Is auto-curried.

## Arguments

`entity` (Object): The entity to apply the the behavior to

`behavior` (Object): The behavior instance

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**id** | String | [ ] | uuid | Used to find the behavior when it's removed
**duration** | Number | [ ] | 0 | How many updates until the behavior is complete
**loop** | Boolean | [ ] | false | If true, the behaviors counter will be automatically reset upon completion
**removeOnComplete** | Boolean | [ ] | true | If true, the behavior will automatically be removed upon completion
**onInit** | Function | [ ] | - | A callback that is executed the first time the behavior is run
**onUpdate** | Function | [ ] | - | A callback that is executed on every update (Default: 60 times per second)
**onComplete** | Function | [ ] | - | A callback that is executed when the behavior reaches completion
**onRemove** | Function | [ ] | - | A callback that is executed when the behavior is removed
**enabled** | Function | [ ] | true | Can be set to false to prevent the behaviors timer from being updated
**data** | Object | [ ] | - | An object that can hold arbitrary data.

Note: If loop is `true`, the value of `removeOnComplete` is ignored.

Callback signatures:

onInit: ({ entity, data })

onUpdate: ({ entity, data, counter })

The counter can be used with animations.

onComplete: ({ entity, data })

onRemove: ({ entity, data })

## Returns

(Object): The behavior instance

## Example

```js
// Behavior config should be returned from functions, to make sure a unique copy is created every time.
const move = () => ({
  id: 'move',
})

l1.addBehavior(
  entity,
  move(),
)
```
