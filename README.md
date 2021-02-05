### webpack5新手向
写自己配置webpack的经历 

参考资料：  
[webpack 中文文档 指南栏](https://www.webpackjs.com/guides/)   
[webpack 英文文档 指南栏](https://webpack.js.org/guides/)  
ps: 感觉 英文 Configuration 栏 看着舒服 知道 是哪个配置项

#### 初始化webpack

安装 webpack & webpack-cli
```
npm init -y
npm install webpack webpack-cli --save-dev
```

添加webpack配置文件 webpack.config.js
```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

package.json 的 scripts 中添加 build 命令

```
"build": "webpack --mode production",
```
这样 我们就可以 *npm run build* 打包我们的代码了

根据上面的配置:  
入口文件： *src/index.js*  
打包后的目录： *dist*  
```
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- bundle.js
  |- /src
    |- index.js
```

#### 添加html模版
我们打包生成的js文件需要配合html文件，可以生成web入口。  
我们可以通过 webpack的plugins配置项，添加 html-webpack-plugin，生成一个html入口模版

安装html-webpack-plugin依赖
```
npm i html-webpack-plugin@next -D
```
修改webpack.config.js 
```
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  ...
  plugins: [
    new HtmlwebpackPlugin({
      title: 'title 参数 生成的html模板的title。但指定了 template 后 该参数无效！！！'
      filename: 'xxxx.html',   // build后html文件名
      template: './template/index.html'  // 入口html文件模板，不指定的话，会默认生成 一个html模版
    })
  ]
}
```
*基本模版内容仅供参考*
需放到上面配置的template对应目录
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React App</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

打包后的文件结构
```
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
  + |- xxx.html
  |- /src
    |- index.js
```
#### 可以开始开发React了 
webpack-dev-server登场
```
npm i webpack-dev-server --save-dev
```
安装React & React-Dom
```
npm i @types/react @types/react-dom -S-D
npm i react react-dom -S
```
package.json 的 scripts 中添加 start 命令
```
"start": "webpack server --mode development --open --hot",
```
webpack.config.js 
```
module.exports = {
  ...,
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, './dist'),
    open: false,
    hot: true,
    quiet: true,
    port: 8080,
  },
  ...
}
```

在src下 添加以下文件看看效果吧
*src/index.js*
```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

ReactDOM.render(<App />, document.getElementById('app'))
```
*src/components/app.js*
```
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        test 
      </div>
    )
  }
}
```

#### 添加 babel

安装依赖 *@babel/core @babel/preset-env @babel/preset-react @bable/preset-typescript*
```
npm install -dev @babel/core @babel/preset-env @bable/preset-react @bable/preset-typescript
```

添加 .babelrc 配置文件

```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

### 添加 babel-loader

```
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  ...
}
```

npm start  打开 localhost:8080/xxxx.html (和 HtmlwebpackPlugin 的配置相关, 不设置 filename 就是默认 localhost:8080)

这样 我们就可以 *npm start* 本地开发我们的项目了

### class 用 async 要装 

```
@babel/plugin-proposal-class-properties
@babel/plugin-transform-runtime
```

.babelrc
```
{
  ...,
  "plugins": [
    [
      "@babel/plugin-proposal-class-properties", 
      { 
        "loose": true 
      }
    ],[
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ],
  ...
}
```
