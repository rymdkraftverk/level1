import { Howl } from 'howler';

/* 
 Check Howler docs for available options
*/
export const getSound = (filePath, options) => {
  return new Howl({
    src: [filePath],
    ...options,
  });
}
