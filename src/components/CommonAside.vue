
<template>
<el-aside :width="!$store.state.isCollapse?'180px':'64rpx'">
  <el-menu class="el-menu-vertical-demo" background-color="#545c64" 
    text-color="#fff"
   :collapse="$store.state.isCollapse"
   :collapse-transition="true"
    with="180px"
   >  
   <h3 v-show="!$store.state.isCollapse">汗青阁后台管理系统</h3>
   <h3 v-show="$store.state.isCollapse">汗青阁</h3>
    <el-menu-item @click="clickMenu(item)" with="180px"
     :index="item.path"  v-for="item in noChildren()" :key="item.path">
        <component :is="item.icon" class="icons"></component>
        <span>{{ item.label }}</span>
    </el-menu-item>
    <el-sub-menu :index="item.label"  v-for="item in hasChildren()" :key="item.label">
      <template #title>
        <component :is="item.icon" class="icons"></component>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group >
        <el-menu-item  @click="clickMenu(subItem)"
        :index="subItem.path" v-for="(subItem,subIndex) in item.children " :key="subIndex" >
            <component :is="subItem.icon" class="icons"></component>
            <span>{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</el-aside>
</template>
  
  
<script>
import { useRouter } from 'vue-router';
import {useStore} from 'vuex'
export default {
    // Vue3 中的 setup()是Vue3 新增的组件配置项，用于替代 Vue2 中的 data 0、methods0computed0等配置项。
    //  setup0提供了更简洁的编写方式，且能够更好地利用Vue3 提供的 Composition API。 setup 0函数接受两参数，
    //  分别是 props和context.
  setup() {
    const store = useStore();
    const list = [
      {
        path: "/import",
        name: "import",
        label: "导入",
        icon: "MessageBox",
        url: "review/import",
      },
      {
        label: "审核",
        icon: "Checked",
        path: "/review",
        children: [
          {
            path: "/reviewUser",
            name: "reviewUser",
            label: "审核用户",
            icon: "user",
            url: "review/reviewUser",
          },
          // {
          //   path: "/create",
          //   name: "create",
          //   label: "审核创作旧",
          //   icon: "Edit",
          //   url: "review/create",
          // },
          {
            path: "/reviewCreate",
            name: "reviewCreate",
            label: "审核创作",
            icon: "Edit",
            url: "review/reviewCreate",
          },
        ],
      },
    ];
    // 创建router对象
    const router=useRouter();
    const noChildren = () => {
      return list.filter((item) => !item.children);
    };
    const hasChildren = () => {
      return list.filter((item) => item.children);
    };
    const clickMenu = (item) =>{
      // console.log("item.name",item.name)
        // 跳转路由
        router.push({
            name:item.name
        })
        // vuex来管理传递路由跳转信息
        store.commit('selectMenu',item)
    }
    return {
      hasChildren,
      noChildren,
      clickMenu
    };
  },
};
</script>

<style lang="less" scoped>
.el-aside{
    .el-menu{
    border-right:none !important;
      h3{
          line-height: 48px;
          color: aliceblue;
          text-align: center;
      }
      :deep(svg){
        margin-right: 10px;
      }
  }
}

.icons{
    width: 16px;
    height: 16px;
}

</style>