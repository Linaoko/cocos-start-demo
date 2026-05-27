import { _decorator, animation, Animation, AnimationClip, Component, sp, Sprite, SpriteFrame, UITransform, Vec3, } from 'cc';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
import ResourceManager from '../../Runtime/ResourceManager';
import { CONTROLLER_ENUM, EVENT_ENUM, PARAME_NAME_ENUM } from '../../Enums';
import EventManager from '../../Runtime/EventManager';
import { PlayerStateMachine } from './PlayerStateMachine';
const { ccclass, property } = _decorator;

const ANIMATION_SPEED = 1/8

@ccclass('PlayerManager')
export class PlayerManager extends Component {

  x:number = 0
  y:number = 0
  tagergetX:number = 0
  tagergetY:number = 0
  fsm: PlayerStateMachine

  private readonly speed = 1/10



 async init(){
    const sprite = this.addComponent(Sprite)
    sprite.sizeMode = Sprite.SizeMode.CUSTOM

    const transform = this.getComponent(UITransform)
    transform.setContentSize(TILE_WIDTH * 4, TILE_HEIGHT * 4)


    this.fsm =  this.addComponent(PlayerStateMachine)
    await this.fsm.init()
    this.fsm.setParams(PARAME_NAME_ENUM.IDLE,true)

    EventManager.Instance.on(EVENT_ENUM.PLAYER_CRTL,this.move,this)
  }

  update(){
    this.updateXY()
    this.node.setPosition(this.x * TILE_WIDTH - TILE_WIDTH * 1.5,-this.y * TILE_HEIGHT + TILE_HEIGHT * 1.5)
  }

  updateXY(){
    if(this.tagergetX < this.x){
      this.x -= this.speed
    }else if(this.tagergetX > this.x){
      this.x += this.speed
    }

    if(this.tagergetY < this.y){
      this.y -= this.speed
    }else if(this.tagergetY > this.y){
      this.y += this.speed
    }

    if(Math.abs(this.tagergetX-this.x) <= 0.1 && Math.abs(this.tagergetY-this.y) <= 0.1){
      this.tagergetX = this.x
      this.tagergetY = this.y
    }
  }

  move(inputDirection:CONTROLLER_ENUM){
    if(inputDirection === CONTROLLER_ENUM.TOP){
      this.tagergetY -= 1
    }else if(inputDirection === CONTROLLER_ENUM.BOTTOM){
      this.tagergetY += 1
    }else if(inputDirection === CONTROLLER_ENUM.LEFT){
      this.tagergetX -= 1
    }else if(inputDirection === CONTROLLER_ENUM.RIGHT){
      this.tagergetX += 1
    }else if(inputDirection === CONTROLLER_ENUM.TURNLEFT){
      this.fsm.setParams(PARAME_NAME_ENUM.TURNLEFT,true)
    }
  }

}
