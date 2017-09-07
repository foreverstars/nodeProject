npm init

创建项目文件结构
db --------------------- 数据库存储目录
models ----------------- 数据库模型文件目录
node_modules------------ node第三方模块目录
public ----------------- 静态文件目录（css，js, image......）
routers ---------------- 路由文件目录
schemas ---------------- 数据库结构目录
views ------------------ 模板html文件目录
app.js ----------------- 项目入口文件
package.json ----------- 项目配置文件

安装项目所需插件
npm install express --save
npm install swig --save (html模板引擎)
npm install mongoose --save (mongodb数据库处理插件)
npm install markdown --save
npm install cookies --save (处理cookies)
npm install body-parser --save (处理请求对象中的参数)

启动数据库操作
1.找到mongo安装路径的bin文件夹，执行cmd
2.执行命令：
     mongod --dbpath=项目数据库文件保存路径 --port 端口号（默认：27017）


