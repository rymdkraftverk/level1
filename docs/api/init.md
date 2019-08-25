---
name: init
---

# init

```js
l1.init(app, options)
```

Gives `level1` a reference to your `PIXI.Application` object. Required to be called before any function calls that involves Pixi, such as `l1.resize`

## Arguments

`app` (object): An instance of PIXI.Application

`options` (object): Additional options

Option | Type | Required | Default | Description
-- | -- | -- | -- | -- |
**debug** | Bool | No | false | Display a basic debug information overlay
**logging** | Bool | No | false | Display logs and warnings from level1
**onError** | (error) => void | No | null | Function to run whenever an error is thrown from a behavior

## Returns

Nothing.

## Example

```js
const app = PIXI.Application({
  width: 800,
  height: 800,
})

document.body.appendChild(app.view)

l1.init(app, {
  debug: true,
  logging: true,
  onError: (error) => {
    logError(error)
  },
})
```
