import { resources, SpriteFrame } from "cc";
import Singleton from "../Base/Singleton"

export default class ResourceManager extends Singleton{

  static get Instance(){
    return super.GetInstance<ResourceManager>()
  }


  //资源加载方法
  loadDir(path : string, type : typeof SpriteFrame = SpriteFrame){
    //返回一个 Promise，异步加载指定目录 "texture/tile/tile" 下的所有 SpriteFrame 资源。成功时 resolve 资产数组；失败时 reject 错误，由外部 await 捕获。
    return new Promise<SpriteFrame[]>((resolve,reject)=>{
      //使用 Cocos 的 resources.loadDir 批量加载，适合加载一整套瓦片图集。
      resources.loadDir(path, type, function (err, assets) {
        if(err){
          reject(err)
          return
        }

        resolve(assets)
});
    })
  }
}
