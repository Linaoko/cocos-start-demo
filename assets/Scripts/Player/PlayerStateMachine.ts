import { _decorator, AnimationClip, Component, Node } from 'cc';
import { FSM_PARAMS_TYPE_ENUM, PARAME_NAME_ENUM } from '../../Enums';
import State from '../../Base/State';
const { ccclass, property } = _decorator;

type ParamsValueType = boolean | number
animationComponent:Animation

export interface IParamsValue{
  type:FSM_PARAMS_TYPE_ENUM
  value:ParamsValueType
}

export const getInitParamsTrigger =()=>{
  return {type:FSM_PARAMS_TYPE_ENUM.TIRGGER,value:false}
}

@ccclass('PlayerStateMachine')
export class PlayerStateMachine extends Component {
  private _currenState : State = null

  params:Map<string,IParamsValue> = new Map()
  stateMachines:Map<string,State> = new Map()

  getParams(paramsName:string){
    if(this.params.has(paramsName)){
      return this.params.get(paramsName).value
    }
  }

  setParams(paramsName:string,value:ParamsValueType){
    if(this.params.has(paramsName)){
      return this.params.get(paramsName).value = value
      this.run()
    }
  }

  get currenState(){
    return this._currenState
  }

  set currenState(newState){
    this._currenState = newState
    this._currenState.run()
  }


  init(){
    this.initParams()
    this.initStateMachines()

    this animationComponent = this.addComponent(Animation)
  }

  initParams(){
    this.params.set(PARAME_NAME_ENUM.IDLE,getInitParamsTrigger())
    this.params.set(PARAME_NAME_ENUM.TURNLEFT,getInitParamsTrigger())
  }

  initStateMachines(){
    this.stateMachines.set(PARAME_NAME_ENUM.IDLE,new State(this,"texture/player/idle/top",AnimationClip.WrapMode.Loop))
    this.stateMachines.set(PARAME_NAME_ENUM.TURNLEFT,new State(this,"texture/player/idle/top"))
  }

  run(){
    switch(this.currenState){
      case this.stateMachines.get(PARAME_NAME_ENUM.TURNLEFT) :
      case this.stateMachines.get(PARAME_NAME_ENUM.IDLE) :
      if(this.params.get(PARAME_NAME_ENUM.TURNLEFT)){
        this.currenState = this.stateMachines.get(PARAME_NAME_ENUM.TURNLEFT)
      }else if(this.params.get(PARAME_NAME_ENUM.IDLE)){
        this.currenState = this.stateMachines.get(PARAME_NAME_ENUM.IDLE)
      }
      break;
      default:
        this.currenState = this.stateMachines.get(PARAME_NAME_ENUM.IDLE)
    }
  }
}
