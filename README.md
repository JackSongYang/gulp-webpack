### directions

本项目以 webpack 打包为主，gulp 只提供任务流

### init

node.js ^v12.16.3

gulp -g ^v4.0.0 （全局升级可能会失败，用 --force 覆盖即可）

gulp-cli -g ^v2.2.1

powershell 需开启权限，管理员执行 set-executionpolicy RemoteSigned ,然后 y 确认

若 npm 安装失败请使用 cnpm

### gulp tasks

gulpfile.js 文件夹

- index.js 请勿修改
- 每个项目类型文件夹（如 project）对应一组 gulp tasks
- 每组 gulp tasks 命名应与对应项目类文件夹一致

gulpfile.json 文件夹

- 每组 gulp tasks 对应一个 json 文件
- json 命名应与对应项目类文件夹一致
- 添加新任务方法
  
  1. key 为任务名中的 *文件名*
  
     如 *"project"*
  
  2. value 为数组，对应索引分别为
  
     *[入口 js 相对路径， 输出文件夹， 入口 js 文件名， html 模板文件名]*
  
     如 *["./project/pj1/", "dist", "main", "index.html"]*
  
     若无特殊要求可省略除 *入口js相对路径* 外其他，如上面可写为 *["./project/pj1/"]* 
  
  3. 请**严格按照**说明书写，否则创建 gulp 任务会**失败**
