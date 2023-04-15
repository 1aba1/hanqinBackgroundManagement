
<!-- 面包屑组件 -->

<template>
  <div class="tags">
    <el-tag
    :key="tag.name"
    v-for="(tag,index) in tags"
    :closable="tag.name!=='home'"
    :disable-transitions="false"
    :effect="$route.name === tag.name ? 'dark':'plain'"
    @click="changeMenu(tag)"
    @close="handleClose(tag,index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>
  
  
<script>
// 导入路由
import { useRouter,useRoute } from 'vue-router';
// 导入仓库
import {useStore} from 'vuex'
export default {
    setup(){
      const route = useRoute();
      // 获取路由
      const router = useRouter();
      // 取得仓库中tab数组
      const store = useStore()
      const tags = store.state.tabsList
      // 点击tab，路由跳转
      const changeMenu=(item)=>{
        router.push({name:item.name})
      }
      // 关闭标签
      const handleClose=(tag,index)=>{
        let length = tags.length-1 ;
        // 处理vuex中的tabslist
        store.commit('closeTab',tag)
        // 判断路由跳转
        if(tag.name !== route.name){
          // 1.关闭tab非当前页面，直接删除
          return ;
        }
        if(index === length){
          // 2.tab为当前页面，且位于最后，则跳转到tabs最后一个tab
          router.push({
            name:tags[index-1].name
          })
        }else{
          // 3.否则，跳转到tabs原理的tab位置
          router.push({
            name:tags[index].name
          })
        }
      }
      return {
        tags,
        changeMenu,
        handleClose,
      };
    }
};
</script>

<style lang="less" scoped >
  .tags{
    margin: 20rpx;
    .el-tag{
      margin-right: 15px;
      cursor: pointer;
    }
  }

</style>