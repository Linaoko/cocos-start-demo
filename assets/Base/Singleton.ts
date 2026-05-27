
//默认导出,其他模块可以用 import Singleton from '...' 导入并继承它。
  export default class Singleton{
    //一个私有的静态属性，属于类本身，不属于实例。存储唯一的实例对象。
    private static _instance : any = null


    //static：静态方法，直接通过类调用（如 Singleton.GetInstance()），不需要 new。
    //<T>()：泛型方法，调用时可以指定返回类型 T，让 TypeScript 知道返回的具体类型。例如 EventManager.GetInstance<EventManager>() 会返回 EventManager 类型。
    static GetInstance<T>() : T{

      //在静态方法中，this 指向当前调用的类构造函数。
      //如果你用 Singleton.GetInstance() 调用，this 就是 Singleton。
      //如果用 class MyClass extends Singleton 然后 MyClass.GetInstance() 调用，this 就是 MyClass（子类）。
      //这样设计是为了让子类能够复用这个静态方法，并创建自己的实例。
      if(this._instance === null ){
        //new this()：使用 this 作为构造函数创建一个新实例。
        //如果 this 是子类，就创建子类的实例；如果是基类，就创建基类的实例。
        //将创建好的实例赋给 _instance，之后再次调用就不会再创建，保证单例。
        this._instance = new this()
      }

      return this._instance
    }
  }
