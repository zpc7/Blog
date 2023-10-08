export default [
  {
    text: 'Guide',
    link: '/interview/index'
  },
  {
    text: 'HTML+CSS',
    collapsed: true,
    items: [
      {
        text: '基础',
        link: '/interview/html+css/basic'
      }
    ]
  },
  {
    text: 'JavaScript',
    collapsed: false,
    items: [
      {
        text: '基础',
        link: '/interview/javascript/basic'
      },
      {
        text: '基础 ⭐️⭐️⭐️',
        link: '/interview/javascript/basic-hard'
      },
      {
        text: 'JS 代码输出(一)',
        link: '/interview/javascript/questions-1'
      },
      {
        text: 'JS 代码输出(二)',
        link: '/interview/javascript/questions-2'
      },
      {
        text: 'this',
        link: '/interview/javascript/this'
      },
      {
        text: 'new 操作符',
        link: '/interview/javascript/new'
      },
      {
        text: 'call apply 和 bind',
        link: '/interview/javascript/call-apply-bind'
      },
      {
        text: 'bind 模拟实现 ⭐️',
        link: '/interview/javascript/bind-implement'
      },
      {
        text: 'ES6 Class 转 ES5',
        link: '/interview/javascript/class-to-es5'
      }
    ]
  },
  {
    text: 'TypeScript',
    collapsed: false,
    link: '/interview/typescript/index',
    items: [
      {
        text: '实现 Pick',
        link: '/interview/typescript/pick'
      }
    ]
  },
  {
    text: '手写题',
    collapsed: false,
    link: '/interview/typescript/index',
    items: [
      {
        text: '实现链式调用和延迟执行',
        link: '/interview/handwriting/chain-call-and-delay-execution'
      },
      {
        text: '手写100以内的质数',
        link: '/interview/handwriting/prime-number'
      },
      {
        text: '扁平数组转树形结构',
        link: '/interview/handwriting/array-to-tree'
      },
      {
        text: '树形结构转扁平结构',
        link: '/interview/handwriting/tree-to-array'
      },
      {
        text: '实现useUpdateEffect',
        link: '/interview/handwriting/useUpdateEffect'
      },
      {
        text: '实现深克隆',
        link: '/interview/handwriting/to'
      },
      {
        text: '排序',
        link: '/interview/handwriting/to'
      }
    ]
  },
  {
    text: '手写Promise',
    collapsed: false,
    items: [
      {
        text: '什么是 Promise',
        link: '/interview/promise/guide'
      },
      {
        text: 'promise 基本构造器',
        link: '/interview/promise/constructor'
      },
      {
        text: 'promise-then 的回调执行时机',
        link: '/interview/promise/then-1'
      },
      {
        text: 'promise-then 的返回值',
        link: '/interview/promise/then-2'
      },
      {
        text: 'promise 微队列和 promise like',
        link: '/interview/promise/micro-queue'
      },
      {
        text: 'resolve reject catch finally',
        link: '/interview/promise/resolve-reject-catch-finally'
      },
      {
        text: '手写 promise 完整代码',
        link: '/interview/promise/promise-full-code'
      }
    ]
  },
  {
    text: '浏览器/网络',
    collapsed: false,
    items: [
      {
        text: 'JS 执行机制 / Event Loop',
        link: '/interview/browser-network/event-loop'
      },
      {
        text: '同源策略+跨域处理',
        link: '/interview/browser-network/cross-domain'
      },
      {
        text: '文件下载',
        link: '/interview/browser-network/file-download'
      },
      {
        text: 'cookie/session/storage',
        link: '/interview/browser-network/storage'
      },
      {
        text: 'requestIdleCallback / requestAnimationFrame',
        link: '/interview/browser-network/requestIdleCallback-requestAnimationFrame'
      },
      {
        text: '缓存',
        link: '/interview/browser-network/cache'
      },
      {
        text: 'HTTP',
        link: '/interview/browser-network/http'
      },
      {
        text: 'webworker',
        link: '/interview/browser-network/webworker'
      },
      {
        text: 'WebGL',
        link: '/interview/browser-network/WebGL'
      },
      {
        text: '观察器 API',
        link: '/interview/browser-network/observer-api'
      }
    ]
  },
  {
    text: '框架和库',
    collapsed: false,
    items: [
      {
        text: 'React',
        items: [
          {
            text: 'React 及相关 API',
            link: '/interview/framework/react/index'
          },
          {
            text: 'React Refs 相关的 API',
            link: '/interview/framework/react/refs'
          },
          {
            text: 'React 18',
            link: '/interview/framework/react/react18'
          }
        ]
      },
      {
        text: 'Vue',
        link: '/interview/framework/vue/index'
      },
      {
        text: 'Angular',
        link: '/interview/framework/ng'
      },
      {
        text: 'MVC/MVVM',
        link: '/interview/framework/ng'
      }
    ]
  },
  {
    text: '前端工程化',
    collapsed: false,
    link: '/interview/engineering/index',
    items: [
      {
        text: '模块化',
        link: '/interview/engineering/module',
        items: [
          {
            text: 'CommonJS 输出题和 require 伪代码',
            link: '/interview/engineering/commonjs-output'
          }
        ]
      },
      {
        text: '包管理器',
        link: '/interview/engineering/package-manage'
      },
      {
        text: '构建工具 Vite/Webpack/Rollup',
        link: '/interview/engineering/build-tool'
      },
      {
        text: '微前端',
        link: '/interview/engineering/micro-fe'
      },
      {
        text: 'Nginx',
        link: '/interview/engineering/nginx'
      },
      {
        text: 'Docker',
        link: '/interview/engineering/docker'
      },
      {
        text: '服务/偏后端',
        link: '/interview/engineering/other'
      }
    ]
  },
  {
    text: '性能优化和安全',
    collapsed: true,
    items: [
      {
        text: '性能优化',
        link: '/interview/opt-secure/opt'
      },
      {
        text: '安全',
        link: '/interview/opt-secure/secure'
      }
    ]
  },
  {
    text: '设计模式',
    collapsed: true,
    items: [
      {
        text: '单例',
        link: '/interview/promise/01'
      },
      {
        text: '发布订阅模式',
        link: '/interview/promise/02'
      },
      {
        text: '发布订阅模式',
        link: '/interview/promise/02'
      }
    ]
  }
];
