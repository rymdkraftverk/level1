---
name: grid
---

# grid

```js
l1.grid(options)
```

Returns a function to get coordinates. Useful for placing objects on a grid.

## Arguments

`options` (object):

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**x** | Number | [x] | - | The x coordinate of the top left corner
**y** | Number | [x] | - | The y coordinate of the top left corner
**marginX** | Number | [x] | - | The space between each cell on the x axis
**marginY** | Number | [x] | - | The space between each cell on the y axis
**itemsPerRow** | Number | [x] | - | The amount of items on a row before a line break

## Returns

(Function): A function with the signature: (index) => { x, y }

## Example

```js
  const numbers = [1, 2, 3]

  const getCell = Util.grid({
    x: 10,
    y: 10,
    marginX: 10,
    marginY: 10,
    itemsPerRow: 2,
  })

  numbers.map(getCell)
  // [{ x: 10, y: 10}, {x: 20, y: 10}, {x: 10, y: 20}]
```
