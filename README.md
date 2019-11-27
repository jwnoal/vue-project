# vue-pwa

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 优化
1. vue vue-router 使用cdn（取消）
2. 开启gzip
3. 关闭生产source map
4. 图片压缩 image-webpack-loader
5. 路由按需加载 （需要骨架屏页面不使用按需加载）
6. 状态管理使用 vue2.6.10 observable (取消，使用vuex)
7. 新增多环境配置
8. vscode 安装 prettier插件
9. 消除冗余的css代码 purgecss-webpack-plugin
// 10. echarts 按需引入
11. 骨架屏
12. 单独打包第三方插件 splitChunks
13. 新增打包分析工具
14. 新增pwa 离线缓存
15. 新增sentry 前端异常监控