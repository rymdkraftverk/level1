---
name: init
---

# init

```js
l1.init(app)
```

Initializes level1. Needs to be called before any other `l1` function calls.

## Arguments

`app` (object): An instance of PIXI.Application

## Returns

Nothing.

## Example

```js
const app = PIXI.Application({
  width: 800,
  height: 800,
})

document.body.appendChild(app.view)

l1.init(app)
```
