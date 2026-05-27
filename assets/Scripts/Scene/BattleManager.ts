import { _decorator, Component, Node } from 'cc';
import { TileMapManager } from '../Tile/TileMapManager';
import { creatUINode } from '../Utils';

import levels, { ILevel } from '../../Levels';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
import DataManager from '../../Runtime/DataManager';
import EventManager from '../../Runtime/EventManager';
import { EVENT_ENUM } from '../../Enums';
import { PlayerManager } from '../Player/PlayerManager';

const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {

    level:ILevel
    stage:Node

    onLoad(){
      EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL,this.nextLevel,this)
    }

    onDestroy(){
      EventManager.Instance.off(EVENT_ENUM.NEXT_LEVEL,this.nextLevel)
    }

    start() {
      this.generateStage()
      this.initLevel()
    }


    initLevel(){
      const level = levels[`level${DataManager.Instance.levelIndex}`]

      if(level){

        this.clearLevel()
        this.level = level

        DataManager.Instance.mapInfo = this.level.mapInfo
        DataManager.Instance.mapRowCount = this.level.mapInfo.length || 0
        DataManager.Instance.mapColumnCount =   this.level.mapInfo[0].length || 0

        this.generateTileMap()
        this.generatePlayer()
      }
    }

    nextLevel(){
      DataManager.Instance.levelIndex++
      this.initLevel()
    }

    clearLevel(){
      this.stage.destroyAllChildren(),
      DataManager.Instance.reset()
    }

     generateStage(){
      this.stage = creatUINode()
      this.stage.setParent(this.node)
     }



    generateTileMap(){
      const tileMap = creatUINode()
      tileMap.setParent(this.stage)
      const tileMapManager =  tileMap.addComponent(TileMapManager)
      tileMapManager.init()

      this.adaptPost()
    }


    generatePlayer(){

      const player = creatUINode()
      player.setParent(this.stage)
      const playerManager =  player.addComponent(PlayerManager)
      playerManager.init()


    }

    adaptPost(){

      const{mapRowCount,mapColumnCount} = DataManager.Instance
      const disX = (TILE_WIDTH * mapRowCount) / 2
      const disY = (TILE_HEIGHT *  mapColumnCount) / 2 +120


      this.stage.setPosition(-disX,disY)
    }

}


