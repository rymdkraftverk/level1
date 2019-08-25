---
name: fromHex
---

# angle

```js
l1.fromHex(hexCode)
```

Convert a string containing a hexadecimal string to a hexadecimal literal (a number).

`“#******” => 0x******`

The hexadecimal literal is for example required by PIXI.Graphics.

## Arguments

`hexCode` (String):

## Returns

(String)

## Example

```js
l1.fromHex('#ffffff')
//0xffffff
```
