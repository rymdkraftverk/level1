import { Howl } from 'howler';

/* 
 Check Howler docs for available options
*/
export const getSound = (filePath, options) => new Howl({
  src: [filePath],
  ...options,
});
