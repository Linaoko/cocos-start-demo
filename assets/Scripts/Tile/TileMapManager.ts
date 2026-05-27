import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;
import { TileManager } from './TileManager';
import { creatUINode, randomByRange } from '../Utils';
import DataManager from '../../Runtime/DataManager';
import ResourceManager from '../../Runtime/ResourceManager';



@ccclass('TileMapManager')
export class TileMapManager extends Component {

    async init(){

      const{mapInfo} = DataManager.Instance  //从单例取出地图数据

      const spriteFrames =  await ResourceManager.Instance.loadDir("texture/tile/tile")
      console.log(spriteFrames);
      //双层循环遍历地图
      for(let i = 0; i < mapInfo.length; i++){   //mapInfo 是二维数组，mapInfo.length 表示行数。
        const column = mapInfo[i]; //mapInfo[i] 取出一整行，命名为 column（虽然变量名叫 column，但它实际上代表一行，里面包含该行的所有格子）。
        for(let j = 0; j < column.length; j++){
          const item = column[j];  //column[j] 获取该行第 j 列的格子对象，即 ITile（包含 src 和 type）。
          if(item.src === null || item.type === null ){
            continue;
          }

          let number = item.src

          if((number === 1 || number === 5 || number === 9) && i%2===0 && j%2 === 0){
            number += randomByRange(0,4)
          }

          const node = creatUINode()
          const imgSrc = `tile (${number})`

          const spriteFrame = spriteFrames.find(v=>v.name === imgSrc)  || spriteFrames[0]

          const tileManager =  node.addComponent(TileManager)
          tileManager.init(spriteFrame,i,j)

          node.setParent(this.node)


        }
      }


}


}

