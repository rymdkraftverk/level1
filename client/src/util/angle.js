
export default ({
  x1, y1, x2, y2,
}) => {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;
  let angle = Math.atan(yDistance / xDistance);
  if (x1 - x2 < 0) {
    angle += Math.PI;
  }
  return angle;
};
