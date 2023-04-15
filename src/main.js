

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// import './style.css'
// 新版的引入路径
import 'element-plus/dist/index.css'
// 旧版的引入路径
// import 'element-plus/lib/theme-chalk/index.css';
import './assets/less/index.less'
import router from './router';
import App from './App.vue'
import store from './store';
import './api/mock.js'
import api from './api/api'
const app = createApp(App)

// 引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// // 在mian中调用store的add方法持久化token

// 路由前置守卫
router.beforeEach((to,from,next)=>{
  store.commit('getToken') //载入本地token
  const token = store.state.token
  // 没有token，跳转到登录页面
  if(!token && to.name!=='login'){
    next({name:'login'})
  }else{
    next()
  }
})

app.config.globalProperties.$api= api   //挂载全局api
app.use(router).use(store)
app.use(ElementPlus)
app.mount('#app')
