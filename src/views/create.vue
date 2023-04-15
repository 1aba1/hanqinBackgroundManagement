<template>
    <h1>hello</h1>
    <div>
        <el-table :data="tableData.list" style="width: 100%" max-height="700">
            <el-table-column type="index" width="50" ></el-table-column>
            <el-table-column prop="title" label="标题" width="150" ></el-table-column>
            <el-table-column prop="content" label="内容" width="180" ></el-table-column>
            <!-- <el-table-column  label="图片" width="280" >
                <template #default="scope">
                    <el-image
                        v-if="scope.row.pictureUrl"
                        style="width: 100px; height: 100px"
                        :src="scope.row.pictureUrl"
                        :zoom-rate="1.2"
                        :preview-src-list="[scope.row.pictureUrl]"
                        fit="cover"
                        :z-index="999"
                    ></el-image>
                </template>
            </el-table-column> -->
            <el-table-column prop="nickName" label="昵称" width="180" ></el-table-column>
            <!--<el-table-column label="操作" width="300" align="center">
                <template  #default="scope">
                    <el-button 
                        size="small"
                        @click="handleExamine( scope.row,1)">
                        通过
                    </el-button>
                    <el-button text
                        size="small"
                        type="danger"
                        @click="handleExamine(scope.row,2)" >
                        删除
                    </el-button>
                </template>
            </el-table-column> -->

        </el-table>
    </div>
    
    <div class="pagination">
        <!-- <el-pagination
            background
            layout="prev, pager, next"
            :page-size="params.pageSize"
            :total="tableData.total"    
            class="mt-4"
            @current-change="changePage"
        /> -->
    </div>
</template>
  
<script>
import { getCurrentInstance, onMounted,defineComponent,ref, reactive } from 'vue'

export default {
    setup() {
        // 请求创作数据的参数
        const params = reactive({
            page:1,
            pageSize:5
        })
        // // 表格数据对象
        const tableData = reactive({
            list:[],
            total:4
        })
        const {proxy} = getCurrentInstance()
        // // 获取创作数据

        // const getCreateData = (params)=>{
        //   console.log("11")
        // }

        // const getCreateData = async(params)=>{ 
        //    let {data : res} = await proxy.$api.getCreateData(params);
        //    console.log("创作数据res：",res)
        //    tableData.list=res.list
        //    tableData.total=res.total
        //    console.log("tabledata ",tableData)
        //     tableData.list.forEach( async(item, index) => {
        //         if(tableData.list[index].pictureUrl){
        //             // res = await proxy.$api.getPicture(tableData.list[index].pictureUrl);
        //             // 拿到blob对象
        //             console.log("picture is  ",res)
        //             // if(res){
        //             //     const myBlob = new window.Blob([res], {type: 'image/jpeg'})
        //             //     let qrUrl = window.URL.createObjectURL(myBlob)
        //             //     //拿到本地地址
        //             //     tableData.list[index].pictureUrl = qrUrl
        //             //     console.log("pictureUrl is",tableData.list[index].pictureUrl)
        //             // }
        //         }
        //    });
        //    await console.log("new tabledata is",tableData)
        // }
        // 翻页
        // const changePage = (page)=>{
        //     params.page=page
        //     getCreateData(params)
        // }
        // // 审核
        // const handleExamine =async(row,type)=>{
        //     let res = await proxy.$api.examineLiterary(row.litId,type);
        //     console.log("审核操作:",res)
        //     getCreateData(params);
        // }
        // onMounted( async()=>{
        //     await getCreateData(params);
        // })
        return{
            // params,
            tableData,
            // changePage,
            // handleExamine
            // qrUrl,
            // handleDelete,
            // handleEdit
        }
    },
}
</script>

<style>
.pagination{
    margin-top: 20px;
}
</style>