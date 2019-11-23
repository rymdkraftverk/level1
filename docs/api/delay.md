---
name: delay
---

# delay

```js
l1.delay(delay)
```

An alternative to `l1.once`. Will resolve a promise after a `delay` amount of game updates.

## Arguments

`delay` (Number): Game updates before resolving the promise.

## Returns

(Promise): A promise.

## Example

```js
const delay = 60

l1.delay(delay)
  .then(() => {
    // Do stuff here
  })
```

## Source code

```js
export const delay = (delay) => new Promise((res) => {
  once(() => { res() }, delay)
})
```