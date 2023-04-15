
<template>
  <el-header>
    <div class="l-content">
        <el-button size="small" plain @click="handleCollapse">
            <el-icon >
                <Menu />
            </el-icon>
        </el-button>
        <el-breadcrumb separator="/" class="bread">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown>
            <span class="el-dropdown-link">
                <!-- 动态引入图片 -->
                <img class="user" src="../assets/images/avator.png"   />
                <!-- <img class="user" :src="getImgSrc('user')"   /> -->
            </span>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="handleExit" >退出</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</el-header>
</template>


<script>
import { defineComponent,computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default defineComponent({
    setup() {
        let store =useStore()
        let router = useRouter()
        // 获取图片路径
        const getImgSrc=(user)=>{
            // console.log("当前路径",import.meta.url)
            return new URL(`../assets/images/${user}.png`,import.meta.url).href
        };
        // 收缩侧边栏
        let handleCollapse=()=>{
            // 调用vuex中的mutations
            store.commit('updateIsCollapse')
        }
        // 计算属性
        let current = computed(()=>{
            return store.state.currentMenu;
        })
        // 退出登录
        let handleExit = ()=>{
            store.commit('clearToken')
            router.push({
                name:'login'
            })
        }
        return {
            getImgSrc,
            handleCollapse,
            current,
            handleExit
        }


    },
})
</script>

<style lang="less" scoped> 
    .el-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background: #333;
    }
    .r-content{
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    .l-content{ 
        display: flex;
        align-items: center;
        .el-button{
            margin-right: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        h3{
            color:#fff
        }
    }
    // 穿透
    .bread :deep(span){
        color: #fff !important;
        cursor: pointer !important;
        font-weight: 400 !important;
    }
</style>