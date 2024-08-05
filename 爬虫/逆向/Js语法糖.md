# Js常用语法

## 箭头函数

本质上就是一个JavaScript的语法糖，对于不了解的人来说也算是一种混淆，降低了代码可读性，与三目表达式类似的作用。

### 基本语法

参数 => 函数体
(参数) => {函数体}

### 实例

```javascript
// 1.当参数为多个，且函数体为多行，如果函数体只有一个语句，没有{}，此时的返回值不需要return
var f = (a,b) => {
    let result = a+b;
    return result;
}
f(6,2);  // 8
// 2.当箭头函数要返回对象的时候，为了区分于代码块，要用 () 将对象包裹起来
var f = (id,name) => ({id: id, name: name});
f(6,2);  // {id: 6, name: 2}
// 3.箭头函数可以与解构一起使用
// 3.1.变量为目标，返回值为源
let cal = (a, b) => {
   return {
       add: a+b,
       sub: a-b,
       mul: a*b,
       div: a/b
  };
}
let {add, sub, mul, div} = cal(10, 5);
// 3.2.形参为目标，实参为源
var show = ({one, two}) => {
console.log(one + "---" + two);
}
show({one: "hello", two: "你好"});
```

### 注意

1. 箭头函数中并没有this，他的this是指向他更外一层的this对象，最外面的就是window。

2. 箭头函数中也没有arguments参数。

3. 在对象中使用箭头函数，箭头函数的this是指向window

   > 我这里自己测试了一下，如果是嵌套对象的话，里面对象的箭头函数中的this依旧指向的是window，不确定是否正确

4. 如果没有参数，就直接写一个空括号即可

5. 箭头函数不能作为构造函数使用

6. 箭头函数没有prototype

## 立即执行函数的几种方法

```javascript
// 用小括号将函数包裹，并在小括号后面添加()
(function fn(){
    console.log(123)
})()

// 在函数之前添加Void
void function fn(){
    console.log(123)
}()

// 在函数前面添加一个!，并在结尾添加()，需要注意的是，自执行函数不要有入参
!function fn(){
    console.log(123)
}()

// 与上面相同
!function (){
    console.log(123)
}()

// 注意区分，这样并不可以立即执行fn，只有在!function (){}()中明确写fn()才是调用
!function (){
    function fn() {
        beier=5656555555555555555;        
    }
}()
```

## Void

### 立即执行函数

```javascript
// 函数自动调用
(function fn(){
    console.log(123)
})()

// 在函数之前添加Void，等同于上面的立即执行的效果
void function fn(){
    console.log(123)
}()
```

### 在a链接中阻止跳转

```html
<!-- void(0)==undefined -->
<a href="javascript:void(0);"></a> 
```

### 在箭头函数中

[箭头函数](##箭头函数)标准中，当函数返回值是一个不会被使用到的时候，应该使用 `void`运算符，来确保返回 `undefined`。

```javascript
const fn = () => void doSomething();
```

### 判断值是否为undefined中

```javascript
if(txt === void(0))
```

### 表达式执行并将返回值置undefined

```javascript
var test = void(beier = 1 + 1);
// 上面的表达式等同于，Void包裹的表达式会被执行，且返回一个undefined。其实与上面《在箭头函数》中的效果一致。
var test = undefined;
beier = 1 + 1;
```

