```js
l1.sequence(callback, interval, list)
```

Apply a callback to an item in a list every `interval` updates. Returns a promise that will resolve once the callback has been called for each item in the list. 

## Arguments

`callback` (Function): The callback will be called once for every item in the list

`interval` (Number): The time between calling each callback

`list` (Array): A list of items. The item will be passed as the only argument to the callback.

## Returns

(Promise): A promise that will resolve once the callback has been called for each item in the list.

## Example - Notifications

Display a notification every 60 game updates

```js
const list = ['Level up!', 'You got 10 gold!']

const interval = 60

const callback = (notification) => {
  displayNotification(notification)
}

l1.sequence(callback, interval, list)
  .then(renderNextScreen}
```
