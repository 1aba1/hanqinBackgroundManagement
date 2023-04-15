<template>
  <el-row :gutter="20" class="home">
    <el-col :span="24" style="margin-top: 20px;"><div class="grid-content ep-bg-purple" />
        <div class="welcome">
            <h1>欢迎登陆汗青阁后台管理系统</h1>
            <img src="../../assets/images/汗青阁.png" alt="">
        </div>   
    </el-col>
  </el-row>
 
</template>


<script>
import {defineComponent, getCurrentInstance, onMounted,ref} from 'vue';


export default defineComponent({
    setup(){
        const {proxy} =getCurrentInstance(); //获取当前实例

        let tableData= ref([]) //创建响应式对象
        // reactive方法用来创建响应式对象，它接收一个对象/数组参数，返回对象的响应式副本
        // 当该对象的属性值发生变化，会自动更新使用该对象的地方。

        // ref 的作用就是将一个原始数据类型（primitive data type）转换成一个带有响应式特性的数据类型，
        // 原始数据类型共有7个，分别是：String/ Number /BigInt /Boolean /Symbol /Null /Undefined
        
        const tableLable={
            name:"课程",
            todayBuy:"日购买",
            monthBuy:"月购买",
            totalBuy:"总购买"
        };
        const getTablelist= async ()=>  {   //获取数据
            // await axios.get('/home/getData').then((res)=>{
            //     console.log(res);
            //     tableData.value=res.data.data.tableData
            //     // if(res.code==200){
            //     //     tableData.value = res.data.data.tableData
            //     // }
            // })
            let res = await proxy.$api.getTableData();
            console.log(res)
            tableData.value = res.tableData
            
        };
        onMounted(()=>{  //挂载生命周期
            // getTablelist();
        })
        return {
            tableLable,
            tableData,
        }
    }
})
</script>


<style lang="less" scoped>
.home{
    .welcome{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #4f4242;
        font-weight: 600;
        font-size: 32px;
        img{
            width: 50%;
        }
    }
}
</style>

