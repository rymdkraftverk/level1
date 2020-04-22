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
const delayBeforeTransition = 60

l1.delay(delayBeforeTransition)
  .then(() => transitionToNextScreen())
```

## Source code

```js
export const delay = (delay) => new Promise((res) => {
  once(() => { res() }, delay)
})
```