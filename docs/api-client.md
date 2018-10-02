# API: Client

---

### Entity object properties

The following properties are specified for objects created by any Entity creator function.

Property | Type | Description
-- | -- | --
**asset** | (*) | Either null, `sprite`, `animation`, `sound`, `particles`, `graphics`, `text` or `bitmapText`
**behaviors** | Array | A list of all behaviors
**body** | Object | Physics body. Always has default body with entity as only property
**children ** | Array | A list of child entities.
**id** | String | Unique id
**parent** | Object | [ ] | null | The parent entity. Entity's position will be relative to the parent position. If parent is destroyed, this entity will also be destroyed.
**types** | Array | Type field to group entities together, also used for collisions

---

---

## Util

---

---

### Matter

Exposes the complete Matter.js API.

http://brm.io/matter-js/docs/

---

### addCollision

TODO

---

### removeCollision

TODO

---

### removeAllCollisions

TODO

---

### getPhysicsEngine

Returns the physics engine

---

## Gamepad

TODO

### Gamepad.addPreset(typeId: string, preset: L1ControllerPreset)

```javascript
addPreset('MY-POWER CO.,LTD. USB Joystick (Vendor: 0e8f Product: 310d)', new L1ControllerPreset().aliasButton(0, 'y'));
```

### Gamepad.getGamepads()

### Gamepad.isPressed(gamepadId, buttonId:number|alias:string)

---

### L1ControllerPreset - instance methods

```javascript
  const preset = new L1ControllerPreset();
```

#### preset.aliasButton(id, alias)

---

## Debug

### setShowHitboxes

```js
l1.setShowHitboxes(show)
```

#### Arguments

`show` (boolean): If true, display hitboxes

#### Returns

Nothing.

---

## Keyboard input

TODO

### addKey

```js
l1.addKey(key)
```

Enables a key to be used with `l1.isKeyDown`

#### Arguments

`key` (String): The key to enable.

#### Returns

Nothing.

---

### isKeyDown

```js
l1.isKeyDown(key)
```

Call this function each game update to get the state of a key.

#### Arguments

`key` (String): The key to check.

#### Returns

(Boolean): If the key is pressed or not

---

## Net

TODO

### Net.start()

Initialize socket.io client

### Net.on(key: string, func: func)

Run function when message with key is received.

### Net.emit(message: string, data: object)

Send data to all other clients.
