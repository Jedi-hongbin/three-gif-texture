/*
 * @Author: hongbin
 * @Date: 2023-03-18 19:07:10
 * @LastEditors: hongbin
 * @LastEditTime: 2023-03-18 19:07:12
 * @Description: 加载gif
 */
import { FileLoader } from 'three/src/loaders/FileLoader';
import { DefaultLoadingManager } from 'three/src/loaders/LoadingManager';
import GifTexture from './gif-texture';
// import { GifReader } from 'omggif';
import { GifReader } from './omggif';

export default class GifLoader {
  constructor(manager, autoDraw) {
    this.manager = manager || DefaultLoadingManager;
    this.crossOrigin = 'anonymous';
    this.autoDraw = autoDraw;
  }

  load(url, onLoad, onProgress, onError) {
    const texture = new GifTexture();
    const loader = new FileLoader(this.manager);
    loader.setResponseType('arraybuffer');

    loader.load(url, (response) => {
      const gifData = new Uint8Array(response);
      const reader = new GifReader(gifData);
      texture.setReader(reader);

      if (onLoad) onLoad(texture);
    }, onProgress, onError);

    return texture;
  }
}