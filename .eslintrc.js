module.exports = {
  root: true, // 作用的目录是根目录
  extends: [
    "standard",
    "plugin:flowtype/recommended",
    "eslint:recommended",
    "plugin:vue/essential"
  ], // 继承标准规则
  plugins: [
    "html", // 使用eslint-plugin-html
    "vue",
    "flowtype"
  ],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true // 只检查 声明 flow语法的文件
    }
  },
  parserOptions: {
    // 此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    parser: "babel-eslint",
    sourceType: "module", // 按照模块的方式解析
    // ecmaVersion: 6, // ES的版本，默认为5
    ecmaFeatures: {
      experimentalObjectRestSpread: true, // 启用对对象的扩展
      jsx: true, // 启用jsx语法
      globalReturn: true, // 允许return在全局使用
      impliedStrict: true // 启用严格校验模式
    }
  },
  // 脚本将要运行在什么环境中
  env: {
    browser: true, // 开发环境配置表示可以使用浏览器的方法
    node: true,
    commonjs: true,
    es6: true,
    amd: true
  },
  rules: { // 重新覆盖 extends: "standard"的规则
    // 自定义的规则
    "linebreak-style": [0, "error", "windows"], // 换行风格
    indent: ["error", 2, { SwitchCase: 1 }], // error类型，缩进4个空格
    "space-before-function-paren": 1, // 在函数左括号的前面是否有空格
    "eol-last": ["error", "always"], // 不检测新文件末尾是否有空行
    semi: ["error", "always"], // 必须在语句后面加分号
    quotes: 0, // ["error", "double"],// 字符串没有使用双引号
    "no-console": ["error", { allow: ["log", "warn"] }], // 允许使用console.log()
    "arrow-parens": 0, // 箭头函数用小括号括起来
    // "no-undef":0,// 关闭全局变量检测
    "no-new": 0 // 允许使用 new 关键字
  },
  globals: { // 允许全局变量,将$设置为true，表示允许使用全局变量$
    document: true,
    localStorage: true,
    window: true,
    jQuery: true,
    $: true
  }
};
