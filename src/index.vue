<template>
    <div>
        <span style="font-size: 22px;">{{msg}}</span><span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            //注意：组件中的data必须是function
            return {
                msg:"Hello PartnerLife"
            };
        },
        methods:{

        }
    }
// #### 如何在定义的组件中导出data、method等内容
// 在script标签中添加
// ```
// export default{
//     data(){
//         // 注意：组件中的data必须是function
//         return{
//             msg:"123"
//         }
//     },
//     methods:{
//         show(){
//             console.log("调用了login.vue中的show方法");
//         }
//     }
// }
// ```
// 在ES6中也通过规范的形式规定了ES6中如何导入和导出模块
// ES6中导入模块使用`import 模块名称 from '模块标识符'`或`import '表示路径'`
//
// 在ES6中，**使用export default 和 export 向外暴露成员**：
// ```
//     export deault{
//         name:'zs',
//             age:20
//     }
// ```
// export default 向外暴露的成员，可以使用任意的变量来接收
// 在一个模块中，export default只允许向外暴露一次
// 在一个模块中，可以同时使用export default 和 export 向外暴露成员
//
// ```
// export var title = "你好"
// export var content = "哈哈"
// ```
// 使用export向外暴露的成员，只能使用{ }的形式来接收，这种形式叫做【按需导出】.例如import {haha,hehe} from login
// export可以向外暴露多个成员，同时如果如果某些成员我们在import的时候不需要则可以不在{ }中定义
// export导出成员在用{}接收的时候名字要一致
// 使用export导出的成员如果 就想 换个 名称来接收，可以使用as来起别名.例如import {haha as name1,hehe} from login
//
// ps:在node中使用 var 名称 = require("模块标识符") 来导入，使用module.exports 和export 来暴露成员
</script>

<style scoped>

</style>