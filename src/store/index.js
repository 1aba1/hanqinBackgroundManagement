import { createStore } from "vuex";
import Cookies from "js-cookie";

export default createStore({
    state:{
        isCollapse:false,
        currentMenu:null,
        tabsList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "home",
            },
        ],
        token:''
    },
    mutations:{
        // 更新侧边栏状态
        updateIsCollapse(state,payload) {
            state.isCollapse=!state.isCollapse
        },
        // 选择页面
        selectMenu(state,val){
            if(val.name == 'home'){
                state.currentMenu==null
            }else{
                 // 更新面包屑
                state.currentMenu=val
                // 未有该tab，加入
                let result = state.tabsList.findIndex(item=>item.name === val.name)
                result == -1? state.tabsList.push(val) : ""
            }
            
        },
        //关闭tab一个标签
        closeTab(state,val){
            // 找到该标签序号
            let res = state.tabsList.findIndex(item => item.name===val.name)
            // 删除该标签
            state.tabsList.splice(res,1)
        },

        
        // 设置请求得到的token
        setToken(state,val){
            // 加入仓库
            state.token = val
            // 加入cookie
            Cookies.set('token',val)
        },
        //添加本地token
        addToken(state){
            state.token = Cookies.get('token')
        },
        // 清除token
        clearToken(state){
            state.token = ''
            Cookies.remove('token')
        },
        // 获取token
        getToken(state){
            state.token = state.token || Cookies.get('token')
        }

    }
})