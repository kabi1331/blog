module.exports = {
    title: '裘宇昕的博客',
    description: 'Hello my bolg',
    head: [
      ['link', { rel: 'icon', href: '/WechatIMG5278.png' }]
    ],
    themeConfig:{
      logo:'/WechatIMG5278.png',
      nav:[
        {text:'首页',link:'/'},
        {text:'技术文档',link:'/tech/',
          items:[
            {text:'web',link:'/tech/one/'},
            {text:'html',link:'/tech/two/'},
            {text:'css',link:'/tech/three/'},
            {text:'js',link:'/tech/four/'},
            {text:'框架',link:'/tech/five/'},
          ]
        },
        {text:'学习随笔',link:'/learn/',
        items:[
          {text:'如何理解社会内卷化',link:'/learn/one/'},
          ]
        },
        {text:'github',link:'https://github.com/kabi1331'}
      ],
      sidebar:{
        '/tech/':[
          {title:'web',collapsable:true,children:['/tech/one/']},
          {title:'html',collapsable:true,children:['/tech/two/']},
          {title:'css',collapsable:true,children:['/tech/three/']},
          {title:'js',collapsable:true,children:['/tech/four/']},
          {title:'框架',collapsable:true,children:['/tech/five/']},
        ],
        '/learn/':[
          {title:'如何理解社会内卷化',children:['/learn/one/']},
        ]
      },
      sidebarDepth:1,
    }
  }