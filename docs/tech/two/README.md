# HTML常见知识点
## 1.DOCTYPE 的作用
```javascript
1、定义：
    <!DOCTYPE>标签是一种标准通用标记语言的文档类型声明，它的目的是要告诉标准通用标记语言解析器，它应该使用什么样的文档类型定义（DTD）来解析文档。
    <!DOCTYPE> 声明必须是 HTML 文档的第一行，位于 <html> 标签之前。
2、作用：
    声明文档的解析类型(document.compatMode)，避免浏览器的怪异模式。
    document.compatMode：
    BackCompat：怪异模式，浏览器使用自己的怪异模式解析渲染页面。
    CSS1Compat：标准模式，浏览器使用W3C的标准解析渲染页面。
```
## 2.img标签中 alt和title的区别
    1.图片显示时（鼠标经过是显示title）
    2.图片不显示时（图片位置显示alt，经过文字区域时显示title）
## 3.HTML5为什么只写`<!DOCTYPE html>`
    HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）
    而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。
## 4.W3C盒模型和IE盒模型
    W3C：宽高是内容区的宽高  box-sizing:content-box
    IE：宽高是实际显示的宽高 box-sizing:border-box