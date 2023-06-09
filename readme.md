```bash
yarn add three-gif-texture
```

or

```
 npm i three-gif-texture
```

![请添加图片描述](https://img-blog.csdnimg.cn/cc8a452e4ddb4692a97f90f66331bbb4.gif)

以上三张图片第一张使用计时器更新 第二张在 onAfterRender 中更新 第三张逐帧更新

参考 [three-gif-loader](https://github.com/movableink/three-gif-loader)
但是我在使用 three-gif-loader 时发现第一次播放动画产生问题 并且是计时器更新
以下是修改后的代码 可以编程式更新(按需更新)
[代码仓库](https://gitee.com/honbingitee/three-template-next.js/tree/feature/worker-octree/src/ThreeHelper/utils/GIFLoader)

使用方法

```javascript
import { GIFTexture } from "three-gif-texture";

{
  const gifTexture = new GIFTexture("/textures/bomb.gif", undefined, map => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshStandardMaterial({ map })
    );

    scene.add(mesh);
    mesh.position.x += 1;
    //逐帧执行
    helper.animation(() => {
      gifTexture.draw();
    });
  });
}
{
  const gifTexture = new GIFTexture("/textures/bomb.gif", undefined, map => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshStandardMaterial({ map })
    );
    //只在出现在相机内被渲染时执行
    mesh.onAfterRender = () => {
      gifTexture.draw();
    };

    scene.add(mesh);
  });
}
{
  //自动播放 setTimeout
  new GIFTexture("/textures/bomb.gif", "autoDraw", map => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshStandardMaterial({ map })
    );
    mesh.position.x -= 1;
    helper.add(mesh);
  });
}
```
