# CSS常见知识点
## 1.CSS选择器
    1.元素选择器
        * class id 
    2.关系选择器
        包含 div p
        相邻 E+F
        兄弟 E～F
        子   E>F
    3.属性选择器
        1.E[att="val"]{ sRules }
        说明：选择具有att属性且属性值等于val的E元素。
        2.a[target]{color: greenyellow;}
        说明：属性名为[]中写的 应用指定的样式
        3. E[att~="val"]{ sRules }
        说明：选择具有att属性且属性值为一用空格分隔的字词列表，其中一个等于val的E元素（包含只有一个值且该值等于val的情况）
        4.h2[class^="tes"]{color: lightcoral;}
        说明：属性以什么开头
        5.h2[class$="p"]{color:purple;}
        说明：属性以什么结尾
        6.h2[class*="e"]{color: red;}
        说明：属性包含什么
    4.伪类选择器
        a{color: #000;}
        鼠标放上去的样式
        a:hover{color: red;}
        激活时候的状态
        a:active{color: yellow;}
        访问后的样式
## 2.link和@import的区别
    1.link属于XHTML标签，除了加载css外还能定义RSS，rel连接属性等作用而@import只为css提供
    2.link会先加载，@import会等页面加载完后加载
    3.@import是css2.1提出，link无兼容问题
## 3.伪类和伪元素的区别
    伪元素的操作对象是新生成的dom元素，而不是原来dom结构里就存在的；而伪类恰好相反，伪类的操作对象是原来的dom结构里就存在的元素。

    伪元素与伪类的根本区别在于：操作的对象元素是否存在于原来的dom结构里。
## 4.px em rem vm的区别
    px：绝对单位，页面按bai精确像素展示。

    em：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。

    rem：相对单位，可理解为”root em”, 相对根节点html的字体大小来计算，CSS3新加属性，chrome/firefox/IE9+支持。

    vm：1vm为视图宽度的1%
## 5.清楚浮动的方式
    1.给父级也加浮动
    2.给父级加display:inline-block
    3.在浮动元素下加
    <div class="clear"></div>
    .clear{ height:0px;font-size:0;clear:both;}`
    4.在浮动元素下加`<br clear="all"/>
    5. 给浮动元素的父级加{zoom:1;}
    :after{content:""; display:block;clear:both;}
## 6.BFC的定义 作用 如何生产BFC？
BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

### 1.BFC的布局规则
    内部的Box会在垂直方向，一个接一个地放置。

    Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。

    每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

    BFC的区域不会与float box重叠。

    BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

    计算BFC的高度时，浮动元素也参与计算。

### 2.如何创建BFC
    1、float的值不是none。
    2、position的值不是static或者relative。
    3、display的值是inline-block、table-cell、flex、table-caption或者inline-flex
    4、overflow的值不是visible
### 3.BFC的作用
    1.利用BFC避免margin重叠
    2.自适应两栏布局
    3.清除浮动。
## 7.垂直上下居中的办法
```javascript
// 1.table自带功能
<table class = "content">
    <tr>
        <td>
            这是一串文字
        </td>
    </tr>
</table>
// 2.使用translate
<div id = "content">
<div id = "cell">
    这是一串文字
</div>
</div>
#content{position:relative}
#cell{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}
// 3.使用display:flex
<div id = "content">
<div id = "cell">
    这是一串文字
</div>
</div>

#content{
display:flex;
justify-content:center;
align-items:center;
}
// 4.把div的显示设置设为表格
<div id = "wrapper">
<div id = "cell">
<div class = "content">
    content goes here
</div>
</div>
</div>

#wrapper {display:table}
#cell {display:table-cell; vertical-align:middle;}
// 5.使用绝对定位的div，前提css中的高度固定，把它的top设置为50%，top-margin设置为负的content高度，因为有固定的高度，给content指定overflow:auto，这样如果content太多的话，就会出现滚动条，以免content溢出。
#content{
    position:aosolute;
    top:50%;
    height:240px;
    margin-top:-120px;
}
// 6.使用一个position:absolute,有固定宽度和高度的div，这个div被设置为top:0,bottom:0,因为有固定高度，并不能和上下的间距都为0，因此margin:auto,会使它居中。
#content {
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    height:240px;
    width:200px;
}
// 7.只能将单行文本居中，只需建，简单的将line-height设置为那个对象的height值就可以了
#content{
    height:100px;
    line-height:100px;
}
```