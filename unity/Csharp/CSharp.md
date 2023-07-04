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



## 有关继承

在C#中继承是可以多继承的。

