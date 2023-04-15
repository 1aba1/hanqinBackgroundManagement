<template>
    <div class="common-layout">
        <el-container>
                <common-aside></common-aside>
            <el-container>
                <CommonHeader></CommonHeader>
                <el-main>
                    <div class="commonTab">
                        <CommonTab></CommonTab>
                    </div>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script>
import {defineComponent} from 'vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonAside from '../components/CommonAside.vue'
import CommonTab from '../components/CommonTab.vue'
export default defineComponent({
    components:{
        CommonAside,
        CommonHeader,
        CommonTab
    }
})
</script>

<style lang="less" scoped>
.el-container{
    flex-wrap: wrap;
    align-items: flex-start;
}
.common-layout{
    height: 100%;
    .commonTab{
        margin-bottom: 20px;
    }
    & > .el-container{
        height: 100%;
        & > .el-aside{
            height: 100%;
            background: #545c64;
        }
    }

}
   
</style>