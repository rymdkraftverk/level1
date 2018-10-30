---
name: init
---

# init

```js
l1.init(app, options)
```

Initializes level1. Needs to be called before any other `l1` function calls.

## Arguments

`app` (object): An instance of PIXI.Application

`options` (object): Additional options

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**debug** | Bool | No | false | Display a basic debug information overlay
**logging** | Bool | No | false | Display logs and warnings from level1

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
