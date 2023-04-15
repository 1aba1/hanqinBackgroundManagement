<template>
    <div>
        <el-table :data="tableData.list" style="width: 100%" max-height="700">
            <el-table-column type="index" width="50" ></el-table-column>
            <el-table-column prop="title" label="标题" width="150" ></el-table-column>
            <el-table-column  label="图片" width="180" >
                <template #default="scope">
                    <el-image
                        v-if="scope.row.pictureUrl"  
                        style="width: 100px; height: 100px"
                        :src="scope.row.pictureUrl"
                        :preview-src-list="[scope.row.pictureUrl]"
                        alt="" 
                        fit="cover" 
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" width="180" ></el-table-column>
            <el-table-column  label="操作" width="180" >
                <template  #default="scope">
                    <el-button 
                        @click="handleExamine( scope.row,1)">
                        通过
                    </el-button>
                    <el-button text
                        type="danger"
                        @click="handleExamine(scope.row,2)" >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="pagination">
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="params.pageSize"
            :total="tableData.total"    
            class="mt-4"
            @current-change="changePage"
        />
    </div>
</template>

<script>
import { defineComponent, getCurrentInstance,onMounted ,reactive} from 'vue'
export default defineComponent({
    setup() {
        // 请求创作数据的参数
        const params = reactive({
            page:1,
            pageSize:5
        })
        // 表格数据对象
        const tableData = reactive({
            list:[],
            total:5
        })
        const {proxy} = getCurrentInstance()
        // 请求创作数据
        const getCreateData = async(params)=>{
            let {data:res}= await proxy.$api.getUnAudited(params);
            console.log("未审核用户数据:",res)
            tableData.list=res.userReviewVos
            tableData.total=res.total
            // 用数据库地址获得二进制图片
            tableData.list.forEach( async(item,index)=>{
                if(item.avatar){
                    console.log("item.avatar:",item.avatar)
                    res =  await proxy.$api.getPicture(item.avatar)
                    console.log("blob图片:",res)
                    let blob = new Blob([res], { type: 'image/png' })
                    tableData.list[index].pictureUrl = URL.createObjectURL(blob)
                    console.log("图片地址:",tableData.list[index].pictureUrl)
                }
            })
        }
        // 审核
        const handleExamine =async(row,type)=>{
            let res = await proxy.$api.examineUser(row.openid,type);
            console.log("审核操作:",res)
            getCreateData(params);
        }
        //  翻页
        const changePage = (page)=>{
            params.page=page
            getCreateData(params)
        }
        onMounted(()=>{
            getCreateData(params);
        })
        return{
            params,
            tableData,
            handleExamine,
            changePage,
        }
    },
})
</script>

<style>
.pagination{
    margin-top: 20px;
}
</style>