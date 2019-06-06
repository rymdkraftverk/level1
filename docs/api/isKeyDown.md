---
name: isKeyDown
---

# isKeyDown

```js
l1.isKeyDown(key)
```

Call this function each game update to get the state of a key.

## Arguments

`key` (String): The key to check.

## Returns

(Boolean): If the key is pressed or not.

## Example

```js
const key = 'a'
l1.addKey(key)

l1.addBehavior({
  onUpdate: () => {
    if (l1.isKeyDown(key)) {
      console.log('pressing a')
    }
  },
})
```
