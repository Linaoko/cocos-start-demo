//单例事件管理器

import Singleton from "../Base/Singleton"

interface lItem{
  func : Function
  ctx : unknown
}


export default class EventManager extends Singleton{

  static get Instance(){
    return super.GetInstance<EventManager>()
  }

 private evendic : Map<string,Array<lItem>> = new Map()

 //eventName: string：事件名称，比如 "NEXT_LEVEL"，用来标识一个事件。
 //func: Function：要监听的回调函数，当事件触发时会调用它。
 //ctx?: unknown：可选参数，表示回调函数执行时的上下文（即 this 指向）。如果不传，ctx 为 undefined，触发时会直接调用 func(...params)。如果传了（比如组件的 this），触发时会用 func.apply(ctx, params) 保持正确的上下文。
 on(eventName:string,func:Function,ctx?:unknown){
  //this.evendic 是一个 Map<string, Array<...>> 数据结构，键是事件名，值是存储回调对象的数组。.has(eventName) 检查这个事件是否已经有监听者。
  if(this.evendic.has(eventName)){
    //取出对应的数组，把新回调对象 { func, ctx } 压入数组。这样同一个事件名可以绑定多个不同的回调函数。
    this.evendic.get(eventName).push({func,ctx})
  }else{
    //创建一个新数组，包含一个元素 { func, ctx }，并存入 Map。确保之后触发事件时能遍历这个数组。
    this.evendic.set(eventName,[{func,ctx}])
  }
 }

 off(eventName:string,func:Function){
  if(this.evendic.has(eventName)){
    const index = this.evendic.get(eventName).findIndex((i => i.func === func))
    index > -1 && this.evendic.get(eventName).splice(index , 1)
  }
}

 emit(eventName:string,...params:unknown[]){
  if(this.evendic.has(eventName)){
    this.evendic.get(eventName).forEach(({func,ctx} )=> {
      ctx?func.apply(ctx,params):func(...params)
    })
  }
 }

 clear(){
  this.evendic.clear()
 }
}
