import "./css/index.css"
//注意：webpack默认只能打包处理JS类型的文件，无法处理其他的非JS类型的文件
//如果要处理非JS类型的文件，我们需要手动安装一些合适的第三方loader加载器
//1.如果想要打包处理css文件，需要安装npm i style-loader css-loader -D
//2.打开webpack.config.js这个配置文件，在里面新增一个配置节点，叫做module，它是一个对象，在这个对象中有个rules属性，这个属性是个数组，数组中存放了所有第三方文件的匹配和处理规则

//注意：如果要通过路径的形式去引入node_modules中相关的文件，可以直接省略node_modules这层目录
import "bootstrap/dist/css/bootstrap.css"

//注意：import包会有先后顺序index.css中有对body的背景颜色，但是如果之后引入bootstrap.css那颜色就没了，调换引入顺序即可，证明后者会覆盖前者的冲突内容

/************************关于babel start************************/
//class关键字，是ES6中提供的新语法，是用来实现ES6中面向对象编程的方式
class Person {
    //使用static关键字，可以定义静态属性
    static info = {name:"lhf",age:23}
}
var p1 = new Person();
console.info("class Person的信息",Person.info);
p1.name = "实例属性";

//在webpack中，默认只能处理一部分ES6的新语法，一些更高级的ES6语法或者ES7语法，webpack是处理不了的。这时候需要借助第三方的loader，来帮助webpack处理这些高级的语法，当第三方loader把高级语法转为低级语法之后，会把结果交给webpack去打包到bundle.js中
//1.在webpack中可以运行如下两套命令安装两套包，去安装Babel相关的loader功能：
//1.1 第一套包：npm i babel-core babel-loader babel-plugin-transform-runtime -D
//1.2 第二套包：npm i babel-preset-env babel-preset-stage-0 -D
//2.打开webpack的配置文件，在module节点下的rules数组中，添加一个新的匹配规则：
//2.1 {test：/\.js$/,use:"babel-loader",exclude:"/node_modules/"}
//2,2 注意：在配置babel的loader规则的时候，必须把node_modules目录，通过exclude选项排除掉，原因有两个：
//2.2.1 如果不排除node_modules，则Babel会把node_modules中所有第三方的JS文件都会打包编译，这样会非常消耗CPU，同时打包速度会非常慢。
//2.2.2 哪怕最终Babel把所有node_modules中的JS转换完毕了，项目也无法正常运行。
//3. 在项目的根目录中，新建一个叫做.babelrc的Babel配置文件，这个配置文件属于JSON格式，所以在写.babelrc配置的时候，必须符合JSON语法规范：不能写注释，字符串必须用双引号
//3.1 在.babelrc写如下的配置：
/*
    {
        "presets":["env","stage-0"],
        "plugins":["transform-runtime"]
    }
 */
/************************关于babel end************************/


import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter);

import index from "./index.vue"
//默认webpack无法打包.vue文件，需要安装相关的loader：
//npm i vue-loader vue-template-compiler -D
//在配置文件中新增配置项{test:/\/vue$/,use:"vue-loader"}

import router from "./loginRouter.js"

var vm = new Vue({
    el:"#index",
    data:{
        msg:"123"
    },
    // render:function (createElements) { //在webpack中如果想要通过vue，把一个组件放到页面中去展示，vm实例中的render函数可以实现
    //     return createElements(login);
    // }
    render: c=>c(index),//简写方式
    router
});

// 1. 安装vue的包：npm i vue -S
// 2. 由于在webpack中，推荐使用 .vue 这个组件模板文件定义组件，所以需要安装能解析这种文件的loader：npm i vue-loader vue-template-compiler -D
// 3. 在main.js中导入vue模块import Vue from vue
// 4. 定义一个.vue结尾的组件，其中有三部分组成：template script style
// 5. 使用import login from "./index.vue"导入这个组件
// 6. 创建vm的实例var vm = new Vue({ el:'#app',render:c=>c(login) })
// 7. 在页面创建一个id为app的div元素，作为我们vm实例要控制的区域