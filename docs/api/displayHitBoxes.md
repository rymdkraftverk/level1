---
name: displayHitBoxes
---

# angle

```js
l1.displayHitBoxes(displayObject, graphics)
```

Returns a behavior that will display the hitBox for a display object.

If the `displayObject` has a defined hitArea, that will be displayed.
Otherwise the width and height of the `displayObject` will be used.

## Arguments

`displayObject` (PIXI.DisplayObject)

`graphics` (PIXI.Graphics): Used to draw the hitBox

## Returns

(Object) A behavior

## Example

```js
l1.displayHitBoxes(displayObject, new PIXI.Graphics())
```
