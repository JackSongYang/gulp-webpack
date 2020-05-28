### environment
node.js ^v12.16.3  
gulp-cli -g ^v2.2.1  
powershell需开启权限，管理员执行 set-executionpolicy RemoteSigned  

### notice
1.dist文件夹为自动生成，无需更改  
2.入口固定main.js，在各项目src文件夹中（若需改变入口可在gulp配置中传入参数）  
3.css/less/sass/scss无需页面link，在main.js中import即可  
4.页面无需引入build.js  
5.区分dev与prod，打包注意  
6.动态插入图片必须使用require，否则打包后图片找不到  
