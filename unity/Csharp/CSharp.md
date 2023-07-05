# C#

该文件主要说一些关于C#这个语言中会用到的一些关键字等知识。

## virtual

​	virtual关键字主要用于修饰方法，作用类似于java中的abstract，但是不同的是你可以在有着virtual关键字的方法中给出基础实现，如果后续子类没有重写该方法则默认调用父类方法，其实感觉上来说就是一个多态下的父类方法。但是加上virtual之后可能更明显一些吧【即更偏向于子类需要重写该方法】。

​	个人感觉就类似于python中的方法你在前面加上`_`就是告诉调用者，这是一个私有方法，但是调用者依旧可以调用，突出一个自觉。而virtual也类似，使用了该关键字的方法，是推荐你去做子类的实现，但是你不做人家也有父类的方法可以用。

### 实例

```C#
// 这个类是所有UI的基类，所以后续所有UI都可以选择性的视线以下三个方法，如果没有实现那么就调用下面已经实现了的方法。
public class UIBase : MonoBehaviour
{
    // 显示UI
    public virtual void Show(){
        gameObject.SetActive(true);
    }
    // 隐藏UI
    public virtual void Hide(){
        gameObject.SetActive(false);
    }
    // 关闭界面【销毁】
    // 这里的virtual关键字的作用类似于java中的abstract，
    // 但是不同的是你可以在有着virtual关键字的方法中给出基础实现，
    // 如果后续子类没有重写该方法则默认调用父类方法，其实感觉上来说就是一个多态下的父类方法
    // 但是加上virtual之后可能更明显一些吧【即更偏向于子类需要重写该方法】
    public virtual void Close(){
        UIManager.Instance.CloseUI(gameObject.name);
    }
}
```



## where

​	一般多用于规范泛型的类型，有些类似于python中的->的作用。在定义泛型的时候，使用可以告诉调用者返回值，亦或是入参的类型是什么。当然如果遇见多态，切where后面接的类型是基类类型的话，那其子类所有类型都可以被涵盖在其内。

### 实例

```c#
// 这里的UIBase是所有UI的基类，所以后续所有继承该基类的类都可以作为该方法泛型的入参类型。
public UIBase ShowUI<T>(string uiName) where T : UIBase
    {
        UIBase ui = FindUIByName(uiName);
        if (ui == null)
        {
            GameObject uiObj = Instantiate(Resources.Load("UI/" + uiName), canvasTf) as GameObject;
            // 将新创建出来的游戏对象重新命名为参数的名字。
            uiObj.name = uiName;
            // 添加需要的组件
            ui = uiObj.AddComponent<T>();
            uiBaseList.Add(ui);
        }
        else
        {
            // 显示UI
            ui.Show();
        }
        return ui;
    }
```

## delegate【委托】

​	对于委派由于是java中没有的一个概念，同时我对C#的认知主要是用于写unity游戏脚本，所以认识并不是很深，这里的理解以及例子都来自于[菜鸟教程](https://www.runoob.com/csharp/csharp-delegate.html)上。

### 感性认识

​	首先说一下个人的感性认知【单委托】：委托本身类似于派出所，比如我这里声明了一个派出所A，他只接受民事案件【即：他只接受以int类型作为输入，并且返回为int类型的方法】。同时我这里有一堆不同种类的民事案件【即：都是以int类型作为输入，并返回int类型的方法，但是他们可以有不同的名字，可以出自不同的类】，如：人格权纠纷、继承纠纷。

​	而委派做的事情类似于：派出一堆民警【即：委派new出来的一堆实例】将这些案件统统接下来，如果后续想要调用这些方法就不用找到案件的当事人【即：在new委派实例时传入的各种方法】了，直接找这个派出所A的各个民警就可以了【即：可以直接通过new处理来的委派实例进行调用】。

上面便是我的一个感性认知，下面会给出具体的代码，以及相对理性的解释：

### 实例

```C#
using System;

// 声明派出所A
delegate int NumberChanger(int n);
namespace DelegateAppl
{
   class TestDelegate
   {
      static int num = 10;
      // 当事人A，但是需要注意这里使用的是静态方法，当然不是静态方法也是可以委托的
      public static int AddNum(int p)
      {
         num += p;
         return num;
      }
      // 当事人B，同理也是静态方法
      public static int MultNum(int q)
      {
         num *= q;
         return num;
      }
      public static int getNum()
      {
         return num;
      }

      static void Main(string[] args)
      {
         // 创建委托实例，各个民警同志，需要将上面的当事人A和当事人B放入交给民警
         NumberChanger nc1 = new NumberChanger(AddNum);
         NumberChanger nc2 = new NumberChanger(MultNum);
         // 使用委托对象调用方法，直接找到接受响应委托的民警，直接用民警调用就好了
         nc1(25);
         Console.WriteLine("Value of Num: {0}", getNum());
         nc2(5);
         Console.WriteLine("Value of Num: {0}", getNum());
         Console.ReadKey();
      }
   }
}
```

### 理性解释

​	这里查找到的相关解释是说委托类似于函数指针。所以按照函数指针的理解来解释上面的例子就是这种效果：

```C#
// 声明A类型的函数指针
delegate int NumberChanger(int n);
// 声明A类型的函数1
public static int AddNum(int p)
{
    num += p;
    return num;
}
// 声明A类型的函数2
public static int MultNum(int q)
{
    num *= q;
    return num;
}
// 根据声明的A类型指针创建一个引用，并将其指向A类型的函数1
NumberChanger nc1 = new NumberChanger(AddNum);
// 使用上面创建的引用直接调用函数1，可以调用到是因为该引用在创建的时候已经指向了函数1
nc1(25);
```

### 应用

*委托（Delegate）特别用于实现事件和回调方法。所有的委托（Delegate）都派生自* **System.Delegate**类。

### 公式

```C#
// 声明委托
public delegate int NumberChanger(int n);
delegate <return type> <delegate-name> <parameter list>;
// 实例化委托
NumberChanger nc1 = new NumberChanger(AddNum);
<delegate-name> <instance-name>=new <delegate-name>(<delegate-function>);
// 调用委托
nc1(25)
<instance-name>(<parameters>)
```

### 开发实例

​	之所以写这个模块主要就是在开发中遇到了下面这个使用委托写的**点击回调**函数。

```C#
// 函数库中的代码
namespace System
{
    public delegate void Action<in T1, in T2>(T1 arg1, T2 arg2);
}
// 使用上面的库实例化委托【准确来说这里还没有实例化，只是声明了一个onClick变量】
public Action<GameObject, PointerEventData> onClick;
// 利用onStartGameBtn方法实例化上面的onClick对象，这里的Register只是用来寻找对象并添加组件与委派无关。
Register("bg/startBtn").onClick = onStartGameBtn;
// 该函数在被点击时调用
private void onStartGameBtn(GameObject obj, PointerEventData pData)
{
    Debug.Log("点击了");
    // 关闭login界面，这里调用的Close方法是基类UIBase里的方法。
    // 效果是销毁login界面，并将login界面从UIList中移除。
    Close();
}
```

## 有关继承

在C#中继承是可以多继承的。

