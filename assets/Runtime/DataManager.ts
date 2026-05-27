import Singleton from "../Base/Singleton"
import { ITile } from "../Levels"

//数据管理器  用来集中存储和访问游戏关卡数据，并保证全局唯一。
//由于 DataManager 是单例，所有脚本访问到的都是同一份数据，保证了关卡信息的一致性。
export default class DataManager extends Singleton{

  static get Instance(){
    //内部调用 super.GetInstance<DataManager>()，即从父类 Singleton 继承的静态方法，并用泛型指定返回类型为 DataManager。
    //静态只读访问器，返回 DataManager 的唯一实例
    return super.GetInstance<DataManager>()
  }

  //记录地图初始化。在加载关卡时会被更新（例如 DataManagerInstance.mapRowCount = this.level.mapInfo.length）。

  mapInfo:Array<Array<ITile>>
  mapRowCount:number = 0
  mapColumnCount:number = 0

  levelIndex:number = 1

  //通常在切换关卡或重新开始时调用，确保旧数据不会干扰新关卡。
  //重置地图数据到空状态。
  reset(){
     this.mapInfo = []
     this.mapRowCount = 0
     this.mapColumnCount = 0

  }

}
