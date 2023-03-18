/*
 * @Author: hongbin
 * @Date: 2023-03-17 22:17:04
 * @LastEditors: hongbin
 * @LastEditTime: 2023-03-18 19:08:44
 * @Description:导出使用
 */
import {
  NearestFilter,
  LinearMipMapLinearFilter,
  sRGBEncoding,
  EquirectangularReflectionMapping,
} from "three";

import GifLoader from "./gif-loader";

export class GIFTexture extends GifLoader {
  image;

  constructor(
    path,
    /**
     * 自动播放gif 定时器循环执行
     */
    autoDraw,
    onLoad
  ) {
    super();

    let image = this.load(path, onLoad);
    autoDraw && image.autoDraw();

    // options
    image.mapping = EquirectangularReflectionMapping;
    image.encoding = sRGBEncoding;
    image.magFilter = NearestFilter;
    image.minFilter = LinearMipMapLinearFilter;
    this.image = image;
  }

  draw() {
    this.image.draw();
  }
}
