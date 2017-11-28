export default () => ({
  run: (_, { sprite, body }) => {
    sprite.x = body.position.x;
    sprite.y = body.position.y;
  },
});
