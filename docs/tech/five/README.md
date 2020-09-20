# 框架常见知识点
## 1.什么是JSX
React 使用 JSX 来替代常规的 JavaScript。

JSX 是一个看起来很像 XML 的 JavaScript 语法扩展。

我们不需要一定使用 JSX，但它有以下优点：

1.JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化。

2.它是类型安全的，在编译过程中就能发现错误。

3.使用 JSX 编写模板更加简单快速。
## 2.MVVM和MVC的区别
### M、V、C
Model（模型）：是应用程序中用于处理应用程序数据逻辑的部分。
通常模型对象负责在数据库中存取数据。

    比如我们人类有一双手，一双眼睛，一个脑袋，没有尾巴，这就是模型，Model定义了这个模块的数据模型。
    在代码中体现为数据管理者，Model负责对数据进行获取及存放。
    数据不可能凭空生成的，要么是从服务器上面获取到的数据，要么是本地数据库中的数据，
    也有可能是用户在UI上填写的表单即将上传到服务器上面存放，所以需要有数据来源。
    既然Model是数据管理者，则自然由它来负责获取数据。
    Controller不需要关心Model是如何拿到数据的，只管调用就行了。
    数据存放的地方是在Model，而使用数据的地方是在Controller，
    所以Model应该提供接口供controller访问其存放的数据（通常通过.h里面的只读属性）

View（视图）：是应用程序中处理数据显示的部分。
通常视图是依据模型数据创建的。
    View，视图，简单来说，就是我们在界面上看见的一切。
    它们有一部分是我们UI定死的，也就是不会根据数据来更新显示的，
    比如一些Logo图片啊，这里有个按钮啊，那里有个输入框啊，一些显示特定内容的label啊等等；
    有一部分是会根据数据来显示内容的，比如tableView来显示好友列表啊，
    这个tableView的显示内容肯定是根据数据来显示的。
    我们使用MVC解决问题的时候，通常是解决这些根据数据来显示内容的视图。

Controller（控制器）：是应用程序中处理用户交互的部分。
通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。
    Controller是MVC中的数据和视图的协调者，也就是在Controller里面把Model的数据赋值给View来显示
    （或者是View接收用户输入的数据然后由Controller把这些数据传给Model来保存到本地或者上传到
    服务器）。
### MVVM
#### 如何实现MVVM
搞清楚了MVVM为什么会出现，将对于你理解如何实现MVVM有极大的帮助。在我们开始着手实现MVVM之前，我先简单提一下之前遗留的一个问题：为什么MVVM这个名字里面，没有Controller的出现（为什么不叫MVCVM，C去哪了）。本来这个问题应该在实现后再来解释，但是我们这里是教学，为了让大家更好的明白我们接下来的思想，所以这里要提前解释一下这个结论：Controller的存在感被完全的降低了。我们在待会实现MVVM的时候你就能体会到了，这里请先把这个结论印在脑海当中：Controller的存在感被完全的降低了、Controller的存在感被完全的降低了、Controller的存在感被完全的降低了。

好的，我们终于要开始着手实现MVVM了。如果你已经搞懂了MVC，那么用MVVM实现一个相同的功能将会变得非常简单。你只需要记住两点：1、Controller的存在感被完全的降低了；2、VM的出现就是Controller存在感降低的原因。
#### Controller存在感降低的原因
在MVVM中，Controller不再像MVC那样直接持有Model了。想象Controller是一个Boss，数据是一堆文件（Model），如果现在是MVC，那么数据解析（比如整理文件）需要由Boss亲自完成，然而实际上Boss需要的仅仅是整理好的文件而不是那一堆乱七八糟的整理前的文件。所以Boss招聘了一个秘书，现在Boss就不再需要管理原始数据（整理之前的文件）了，他只需要去找秘书：你帮我把文件整理好后给我。那么这个秘书就首先去拿到文件（原始数据），然后进行整理（数据解析），接下来把整理的结果给Boss。所以秘书就是VM了，并且Controller（Boss）现在只需要直接持有VM而不需要再持有M了。如果再进一步理解C、VM、M之间的关系：因为Controller只需要数据解析的结果而不关心过程，所以就相当于VM把“如何解析Model”给封装起来了，C甚至根本就不需要知道M的存在就能把工作做好，前提它需要持有一个VM。那么我们MVVM中的持有关系就是：C持有VM，VM持有M。这里有一个比较争议的地方：C该不该持有M。我的答案是不该。为什么呢，因为C持有M没有任何意义。就算C直接拿到了M的数据，它还是要去让VM进行数据解析，而数据解析就需要M，那么直接让VM持有M而C直接持有VM就足够了。最后再分享一个我在实现MVVM中的一个技巧，也谈不上是技巧吧，算是一种必要的思想：一旦在实现Controller的过程中遇到任何跟Model（或者数据）相关的问题，就找VM要答案。这个思想待会我们会在实现代码的时候用到。
## 3.Vue props用法详解
组件接受的选项之一 props 是 Vue 中非常重要的一个选项。父子组件的关系可以总结为：

props down, events up

父组件通过 props 向下传递数据给子组件；子组件通过 events 给父组件发送消息。
### 父子级组件
```javascript
var childNode = {
  template: `
        <div>childNode</div>
        `
};
var parentNode = {
  template: `
        <div>
          <child></child>
          <child></child>
        </div>
        `,
  components: {
    child: childNode
  }
};
new Vue({
  el: "#example",
  components: {
    parent: parentNode
  }
});
```
```javascript
<div id="example">
  <parent></parent>
</div>
```
https://www.jianshu.com/p/89bd18e44e73
## 4.vue生命周期
https://segmentfault.com/a/1190000011381906
## 5.method watch computed的区别
### 一、computed 和 methods
computed是计算属性，methods是方法，都可以实现对 data 中的数据加工后再输出。
不同的是 computed 计算属性是基于它们的依赖进行缓存的。计算属性 computed 只有在它的相关依赖发生改变时才会重新求值。这就意味着只要data 中的数据 message 还没有发生改变，多次访问 reversedMessage（对message 进行加工的处理函数） 计算属性会立即返回之前的计算结果，而不必再次执行函数。而对于method ，只要发生重新渲染，method 调用总会执行该函数。
当有一个性能开销比较大的的计算属性 A ，它需要遍历一个极大的数组和做大量的计算。然后我们可能有其他的计算属性依赖于 A ，这时候，我们就需要缓存。也就是使用 computed 而不是 methods。但对于每次都需要进行重新计算的属性比如下面这个函数的返回值 function () { return Date.now() } ，我们最好使用 methods。
总之：数据量大，需要缓存的时候用 computed ；每次确实需要重新加载，不需要缓存时用 methods 。
### 二、computed 和 watch
计算属性顾名思义就是通过其他变量计算得来的另一个属性， fullName 在它所依赖 firstName ， lastName 这两个变量变化时重新计算自己的值。
另外，计算属性具有缓存。计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 lastName 和 firstName都没有发生改变，多次访问 fullName 计算属性会立即返回之前的计算结果，而不必再次执行函数。
而侦听器 watch 是侦听一个特定的值，当该值变化时执行特定的函数。例如分页组件中，我们可以监听当前页码，当页码变化时执行对应的获取数据的函数。
也就是说，computed 对于其中变量的依赖是多个的，它的函数中使用了多个 this.xxx ,只要其中一个发生了变化，都会触发这个函数。而 watch 的依赖则是单个的，它每次只可以对一个变量进行监控。 （此处为本人个人理解，可能有错误，后续将改进）
## 6.为什么v-for需要key
https://www.jianshu.com/p/4bd5e745ce95
## 7.vue中组件的data为什么是一个函数
组件中的data写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的data，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份data，就会造成一个变了全都会变的结果。
## 8.vue $router和$route的区别
一、

router为VueRouter的实例，相当于一个全局的路由器对象，里面含有很多属性和子对象，例如history对象。。。经常用的跳转链接就可以用this.$router.push，和router-link跳转一样。。。

this.$router.push会往history栈中添加一个新的记录。。详细见vue官方文档https://router.vuejs.org/zh/guide/essentials/navigation.html

route相当于当前正在跳转的路由对象。。可以从里面获取name,path,params,query等。。

打印this.$route和this.$router。
路由传参的方式

1.可以手写完整的path：

`this.$router.push({path:`/user/${userId}`})`

这样传递参数的话，配置路由的时候需要在path上加参数path：user/：userId。

这种接收参数的方式是this.$route.params.userId。

2.也可以用params传递

3.也可以用query传递

query传参是针对path的，params传参是针对name的。。接收参数的方式都差不多。。this.$route.query.和this.$route.params.

注意这只是跳转url，跳转到这个url显示什么组件，得配置路由。router跳转和`<router-link>`标签跳转，规则差不多。

二、

有时候配置路由时path有时候会加 '/' 有时候不加,例如path:'name'和path:'/name'。区别其实官方文档说了，我当时没仔细看，导致这个问题还困扰了我很久。

意思就是以 / 开头的会被当做路径，就不会一直嵌套之前的路径



