---
name: sound
---

# sound

```js
l1.sound(options)
```

## Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**id** | String | [ ] | uuid | An id that can be used for lookup. If no id is passed, a uuid will be generated.
**loop** | Boolean | [ ] | false | If the sound should be played continuously.
**parent** | Object | [ ] | null | The parent entity. If parent is destroyed, this entity will also be destroyed.
**src** | String | [x] | - | The sound to play.
**volume** | Number | [ ] | 0.5 | The volume

## Returns

(object): The sound entity

## Example

```js
l1.sound({
  src: 'explosion',
  volume: 0.1,
  loop: false,
})
```
