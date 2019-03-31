import VueRouter from "vue-router"
import login from "./router/login.vue"
import register from "./router/register.vue"

var router = new VueRouter({
    routes:[
        {
            path:"/login",
            component:login
            // children:[
            //     {path:"",component:""},
            //     {path:"",component:""}
            // ]
        },
        {path:"/register",component:register}
    ]
});

export default router;