# level1

> Quickly get started creating 2D games in the browser with minimal setup or configuration

level1 is a utility library for [`pixi.js`](https://github.com/pixijs/pixi.js).

It helps with instance managements by extending pixi display objects with:

- id
- zIndex
- labels

It also has:

- Resizing of text objects without blurriness
- Resizing of the canvas and retain the correct proportions
- Convenience function for getting pre-loaded textures
- "Behaviors". Dynamically add and remove behaviors in the game scene.
- Function to get the global position of a display object
- Collision detection
- Overlapping area
- Utility functions to get the distance and angle between two positions.
- Ability to add sound
- Ability to add physics (Under development)

*This project is currently in beta.*

## Index

1. [Getting started](docs/getting-started.md#getting-started)
1. [Docs / API](https://rymdkraftverk.github.io/level1/)
1. [Gotchas](https://github.com/sajmoni/level1#docs/gotchas)

---

## How to use

`npm install l1`

`yarn add l1`

### Hello world

```js
l1.init()
```

--

## Develop

### Custom commands

Command | Description
------- | -----------
`yarn build` | Generate files in the `dist` folder
`yarn build:watch` | Continuously build files in the `dist` folder
`yarn clean` | Remove the `dist` folder
`yarn test` | Run the tests
`yarn test:watch` | Continuously run the tests
`yarn release` | Start the wizard to release a new version

### Workflow

To test changes, use the `template` project.

1. Build the `dist` files in the `level1` folder (`yarn build:watch`)
1. Go to the `template` folder
1. Run `yarn l1` to install `level1`
1. Run `yarn start` and `yarn watch` in separate terminal windows
1. Test your new features!
