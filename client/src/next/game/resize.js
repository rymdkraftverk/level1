import { getGameWidth, getGameHeight } from './init';
import getStage from './getStage';
import getRenderer from './getRenderer';
import getAllEntities from '../entityUtil/getAllEntities';

let ratio = 1;

export default (width, height) => {
  ratio = Math.min(
    width / getGameWidth(),
    height / getGameHeight(),
  );

  getStage()
    .scale
    .set(ratio);

  getRenderer()
    .resize(
      getGameWidth() * ratio,
      getGameHeight() * ratio,
    );

  /*
    The following code is needed to counteract the scale change on the whole canvas since
    texts get distorted by PIXI when you try to change their scale.
    Texts instead change size by setting their fontSize.
  */
  getAllEntities()
    .forEach((e) => {
      if (e.originalSize) {
        e.asset.style.fontSize = e.originalSize * ratio;
        e.asset.scale.set(1 / ratio);
      }
    });
};

export const getRatio = () => ratio;
