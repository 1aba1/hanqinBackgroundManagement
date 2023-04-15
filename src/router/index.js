import { createRouter,createWebHashHistory } from "vue-router";

// 路由配置对象
const routes=[
    {
        path:'/',
        component:()=>import('../views/Main.vue'), //导入主页面
        redirect:'/home',
        children:[
            // 子路由导入子页面
            {
                path:'/home',
                name:'home',
                component:()=>import('../views/home/Home.vue')
            },
            {
                path:'/import',
                name:'import',
                component:()=>import('../views/import.vue')
            },
            {
                path:'/reviewUser',
                name:'reviewUser',
                component:()=>import('../views/reviewUser.vue')
            },
            // {
            //     path:'/create',
            //     name:'create',
            //     component:()=>import('../views/create.vue')
            // },
            {
                path:'/reviewCreate',
                name:'reviewCreate',
                component:()=>import('../views/reviewCreate.vue')
            }
        ]
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/Login.vue')

    }
]

// 创建路由对象
const router = createRouter({
    history:createWebHashHistory(),
    routes
})

// 导出路由
export default router