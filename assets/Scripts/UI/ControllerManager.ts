import { _decorator, Component, Node } from 'cc';
import EventManager from '../../Runtime/EventManager';
import { CONTROLLER_ENUM, EVENT_ENUM } from '../../Enums';
const { ccclass, property } = _decorator;

@ccclass('ControllerManager')
export class ControllerManager extends Component {
  handCtrl(evt:Event,type:string){
    EventManager.Instance.emit(EVENT_ENUM.PLAYER_CRTL,type as CONTROLLER_ENUM)
  }
}


