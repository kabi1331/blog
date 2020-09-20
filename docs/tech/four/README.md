# js常见知识点
## 1.1+[6]的结果是什么
    16 字符串
    正常情况对象和数组不能直接相加的
    所以[]被强转成空字符串相加，{}被转成0相加
    {}+1 和 []+1
    结果都是1 但一个是数字1，一个是字符串1
## 2.1-'3'的结果是什么
    -2 number
## 3.for...of,for...in,forEach,map的区别
    1.for...of 具有iterator接口 可以遍历属性值包括数组 Set Map 类似数组的对象 Generator函数 字符串
    2.for...in 遍历对象自身和继承的可枚举的属性 不能直接获取属性
    3.forEach  只能遍历数组 无返回值
    4.map      只能遍历数组 返回修改后的数组
## 4.什么是闭包 作用
### 1.概念
    闭包函数：声明在一个函数中的函数，叫做闭包函数。

    闭包：内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回了之后。
### 2.特点
    让外部访问函数内部变量成为可能；

    局部变量会常驻在内存中；

    可以避免使用全局变量，防止全局变量污染；

    会造成内存泄漏（有一块内存空间被长期占用，而不被释放）
### 3.例子
```javascript
function funA(){
    var a = 10;  // funA的活动对象之中;
    return function(){   //匿名函数的活动对象;
        alert(a);
        }
    }
var b = funA();
b();  //10
```
```javascript
function outerFn(){
var i = 0;
  function innnerFn(){
      i++;
      console.log(i);
  }
  return innnerFn;
}
var inner1 = outerFn();
var inner2 = outerFn();
inner1();
inner2();
inner1();
inner2();    //1 1 2 2
```
## 5.Object.create() 和 new Object()
### object.create(proto, propertiesObject)
    object.create() 是使用指定的原型proto对象及其属性propertiesObject去创建一个新的对象。
    proto 是必填参数，就是新创建出来的对象的原型 （新对象的 __proto__属性指向的对象），值得注意的是当proto为null的时候创建的新对象完全是一个空对象，没有原型（图一），也就是没有继承Object.prototype上的方法。（如hasOwnProperty() toString() 等）
    propertiesObject是可选参数，作用就是给新对象添加新属性以及描述器，具体可参考 Object.defineProperties()的第二个参数。需要注意的是新添加的属性是新对象自身具有的属性也就是通过hasOwnProperty() 方法可以获取到的属性，而不是添加在原型对象里。
    具体三个步骤就是：
    1.创建一个对象
    2.继承指定父对象
    3.为新对象扩展新属性
### new Object()
    new 运算符是创建一个自定义对象或者具有构造函数的内置对象的实例
    使用new运算符会创建一个新的对象，它继承自构造函数的prototype,也就是说它的__proto__属性会指向构造函数的prototype
    new Object() 也就是具有构造
### 总结区别
    Object.cerate() 必须接收一个对象参数，创建的新对象的原型指向接收的参数对象，new Object() 创建的新对象的原型指向的是 Object.prototype. （表述有点啰嗦，简洁点说就是前者继承指定对象， 后者继承内置对象Object）
    可以通过Object.create(null) 创建一个干净的对象，也就是没有原型，而 new Object() 创建的对象是 Object的实例，原型永远指向Object.prototype.
## 6.Virtual DOM是什么
https://www.cnblogs.com/ArianaWang/p/8944741.html
## 7.防抖和节流的原理
### 1.防抖
debounce（防抖），简单来说就是防止抖动。
当持续触发事件时，debounce 会合并事件且不会去触发事件，当一定时间内没有触发再这个事件时，才真正去触发事件
```javascript
const debounce = (func, wait, ...args) => {
  let timeout;
  return function(){
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args)
    },wait);
  }
}
```
### 2.节流
throttle（节流），当持续触发事件时，保证隔间时间触发一次事件。
持续触发事件时，throttle 会合并一定时间内的事件，并在该时间结束时真正去触发一次事件。
```javascript
const throttle = (func, wait, ...args) => {
  let pre = 0;
  return function(){
    const context = this;
    let now = Date.now();
    if (now - pre >= wait){
       func.apply(context, args);
       pre = Date.now();
    }
  }
}
```
## 8.DOM事件流
### 为什么是有事件流？
假如在一个button上注册了一个click事件，又在其它父元素div上注册了一个click事件，那么当我们点击button，是先触发父元素上的事件，还是button上的事件呢，这就需要一种约定去规范事件的执行顺序，就是事件执行的流程。
浏览器在发展的过程中出现实了两种不同的规范

    1.IE9以下的IE浏览器使用的是事件冒泡，先从具体的接收元素，然后逐步向上传播到不具体的元素。
    2.Netscapte采用的是事件捕获，先由不具体的元素接收事件，最具体的节点最后才接收到事件。
    3.而W3C制定的Web标准中，是同时采用了两种方案，事件捕获和事件冒泡都可以。
### 事件阶段
既然有了事件捕获和事件冒泡，那就应该约定是事件的流向，是先捕获还是先冒泡，所以W3C标准中规定了事件流的三个阶段的顺序：

1.事件捕获阶段
2.处于目标阶段
3.事件冒泡阶段

有了捕获和冒泡这两种模式，我们就可以很好的控制父元素和子元素的事件执行顺序了

 

所以这里需要一种方法，不让事件向下捕获或向上冒泡

所以有了 e.stopPropagation() 方法，用于阻止事件的继续传递。

执行这条语句，无论我们是使用捕获模式还是冒泡模式，事件都不会继续传递，只会响应我们点击的元素。
### e.preventDefault()与e.stopPropagation()的区别
e.stopPropagation()阻止事件冒泡

e.preventDefault()阻止事件默认行为。
## 9.箭头函数
    箭头函数相当于匿名函数，并且简化了函数定义。箭头函数有两种格式，一种只包含一个表达式，连{ ... }和return都省略掉了。还有一种可以包含多条语句，这时候就不能省略{ ... }和return
    箭头函数是匿名函数，不能作为构造函数，不能使用new
    箭头函数不绑定arguments，取而代之用rest参数...解决
    箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值
    箭头函数通过 call()  或   apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响。
    箭头函数没有原型属性
    箭头函数不能当做Generator函数,不能使用yield关键字
### 总结
    箭头函数的 this 永远指向其上下文的  this ，任何方法都改变不了其指向，如 call() ,  bind() ,  apply() 
    普通函数的this指向调用它的那个对象
## 10.apply call bind区别 以及作用
    call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：
    call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔
    apply 的所有参数都必须放在一个数组里面传进去
    bind 除了返回是函数以外，它 的参数和 call 一样
## 11.promise是同步还是异步
promise的构造函数是同步执行的，then中的方法是异步执行的
## 12.promise和setTimeout的区别
Promise是微任务，setTimeout是宏任务，同一事件中Promise.then总是先于setTimeout执行
## 13.jquery方法封装
```javascript
// 给jquery 身上设置全局方法；
// 方法一：
jQuery.myFunction = function(str){
    console.log(str);
}
//方法一调用：
$.myFunction('直接给jq身上设置全局方法');
//方法二：
// 同时添加多方法
jQuery.extend({
    myFunction:function(str){
        console.log(str);
    },
    myFunction1:function(str){
        console.log(str);
    }
})
//方法二调用：
$.myFunction('给jq身上同时添加多个全局方法');

//方法三：
jQuery.nameSpaces = {
    myFunction:function(str){
        console.log(str);
    },
    myFunction1:function(str){
        console.log(str);
    }
}
//方法三调用：
$.nameSpaces.myFunction('用命名空间的方式给jq添加多个全局方法');
```

 

