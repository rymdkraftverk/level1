export default () => ({
  run: (_, entity) => {
    entity.x = entity.body.position.x;
    entity.y = entity.body.position.y;
  },
});
