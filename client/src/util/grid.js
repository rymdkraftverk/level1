
export default ({
  x, y, marginX, marginY, itemsPerRow,
}) => (index) => {
  const row = Math.floor(index / itemsPerRow);
  const column = index % itemsPerRow;
  return {
    x: x + (column * marginX),
    y: y + (row * marginY),
  };
};
