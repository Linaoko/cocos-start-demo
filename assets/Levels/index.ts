
import { TILE_TYPE_ENUM } from "../Enums";
import level1 from "./level1";
import level2 from "./level2";
;
//这个模块作为数据层入口，统一管理所有关卡数据，并向外提供标准化接口。游戏逻辑通过字符串键名即可切换关卡，实现了数据驱动和灵活扩展。

//src：数字（图片索引）或 null。对应图集里某张图片的编号（如 16 表示墙左上角）。null 表示该格无图像。
//type：瓦片类型枚举或 null。用于游戏逻辑（碰撞、地形识别等）。null 表示空地。
export interface ITile{
  src: number | null,
  type: TILE_TYPE_ENUM | null,
}


//一个关卡就是二维数组 mapInfo，外层数组每项是一行，内层数组每项是该行的格子。
//访问方式：level.mapInfo[行][列] 得到 ITile。
export interface ILevel{
  mapInfo:Array<Array<ITile>>
}

//使用 Record<string, ILevel> 类型约束：键是字符串，值是 ILevel。
//假设同一目录下存在 level1.ts 和 level2.ts，且它们都默认导出一个 ILevel 对象，这里通过变量简写将它们聚合成一个对象：
//{ level1: level1的关卡数据, level2: level2的关卡数据 }。
const levels :Record<string,ILevel> = {
  level1,
  level2,
}

export default levels;
