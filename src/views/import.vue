<template>
    <el-form :inline="true"  >
      <el-form-item  label="导入类型">
        <el-select v-model="value" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>

      <el-form v-show="value=='Option1'" :model="extract"  class="demo-form-inline">
        <el-form-item  label="作者">
          <el-input type="input" v-model="extract.author" placeholder="请输入作者" clearable />
        </el-form-item>
        <el-form-item label="内容">
          <el-input
           :autosize="{ minRows: 5, maxRows: 8 }"
            type="textarea"
            placeholder="请输入内容"
            v-model="extract.content"
            clearable
          />
        </el-form-item>
        <el-form-item class="button">
          <el-button  @click="handleClear(1)">清空</el-button>
          <el-button type="primary" @click="handleSubmit(1)">提交</el-button>
        </el-form-item>
      </el-form>

      <el-form v-show="value=='Option2'" :model="article"  class="demo-form-inline">
        <el-form-item  label="作者">
          <el-input type="input" v-model="article.author" placeholder="请输入作者" clearable />
        </el-form-item>
        <el-form-item label="标题">
          <el-input type="input"  v-model="article.title" placeholder="请输入标题" clearable />
        </el-form-item>
        <el-form-item label="内容">
          <el-input
           :autosize="{ minRows: 5, maxRows: 8 }"
            type="textarea"
            placeholder="请输入内容"
            v-model="article.content"
            clearable
          />
        </el-form-item>
        <el-form-item class="button">
          <el-button  @click="handleClear(2)">清空</el-button>
          <el-button type="primary" @click="handleSubmit(2)">提交</el-button>
        </el-form-item>
      </el-form>

      <el-form v-show="value=='Option3'" :model="poetry"  class="demo-form-inline">
        <el-form-item  label="作者">
          <el-input type="input" v-model="poetry.author" placeholder="请输入作者" clearable />
        </el-form-item>
        <el-form-item label="标题">
          <el-input type="input"  v-model="poetry.title" placeholder="请输入标题" clearable />
        </el-form-item>
        <el-form-item label="内容">
          <el-input
           :autosize="{ minRows: 5, maxRows: 8 }"
            type="textarea"
            placeholder="请输入内容"
            v-model="poetry.content"
            clearable
          />
        </el-form-item>
        <el-form-item label="赏析">
          <el-input
           :autosize="{ minRows: 5, maxRows: 8 }"
            type="textarea"
            placeholder="请输入赏析"
            v-model="poetry.appreciate"
            clearable
          />
        </el-form-item>
        <el-form-item class="button">
          <el-button  @click="handleClear(3)">清空</el-button>
          <el-button type="primary" @click="handleSubmit(3)">提交</el-button>
        </el-form-item>
      </el-form>
    </el-form>
</template>

<script>
import { getCurrentInstance, reactive,ref } from 'vue'
import { useStore } from 'vuex'
   export default{
     setup(){
      const value = ref('Option1')
      const {proxy} = getCurrentInstance()
      const options = [
        {
          value: 'Option1',
          label: '摘录',
        },
        {
          value: 'Option2',
          label: '文章',
        },
        {
          value: 'Option3',
          label: '诗词',
        },
      ]
      const poetry=reactive({
        author:'',
        title:'',
        content:'',
        appreciate:'',
      })
      const article=reactive({
        author:'',
        title:'',
        content:'',
      })
      const extract=reactive({
        author:'',
        content:'',
      })
      // 清除内容
      const handleClear =(option)=>{
        if(option==1){
          Object.keys(extract).forEach(key => {
            extract[key] = ''
          })
        }else if(option==2){
          Object.keys(article).forEach(key => {
            article[key] = ''
          })
        }else if(option==3){
          Object.keys(poetry).forEach(key => {
            poetry[key] = ''
          })
        } 
      }
      // 提交导入
      const handleSubmit = async(type)=>{
        if(type==1){
          let res= await proxy.$api.uploadArticle(extract,3);
            console.log("提交摘录",res)
            handleClear(1)
        }
        if(type==2){
          let res= await proxy.$api.uploadArticle(article,2);
            console.log("提交文章",res)
            handleClear(2)
        }
        if(type==3){
          let res= await proxy.$api.uploadArticle(poetry,1);
            console.log("提交诗词",res)
            handleClear(3)
        }
      } 
      return {
        options,
        value,
        poetry,
        article,
        extract,
        handleClear,
        handleSubmit
      }
     }
   }
</script>

<style lang="less" scoped>
  .demo-form-inline{
    display: flex;
    align-content: center;
    flex-direction: column;
    .button{
      :deep(.el-form-item__content){
        justify-content: end;
      }
    }
  }
</style>