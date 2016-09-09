
## 基于D3的开源数据可视化库

造轮子，不多说……

### Install

首先确认已安装好node.js

然后打开工作空间，打开一个控制台，输入如下控制台命令：
```
git clone https://github.com/zgljl2012/zgCharts.git

npm install

gulp

```

项目使用[rollup](http://rollupjs.org/guide/#creating-your-first-bundle)作为打包工具，[gulp](http://www.gulpjs.com.cn/)作为构建工具。

**当src中的文件修改时，gulp会自动build，进行更新，在开发状态下无需关闭控制台。**

### Test
打包后的zgCharts.js文件会在build和test文件夹下各放一份。在test文件夹下有html文件引入d3.v4.js以及zgCharts.js进行测试。

start.bat的作用是打开一个Python Http服务器，然后可通过：http://localhost:8000 访问index.html

