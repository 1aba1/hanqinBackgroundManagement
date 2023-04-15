import axios, { Axios } from "axios";
import config from "../config";
import { ElMessage } from "element-plus";
const NETWORK_ERROP = '网络请求异常，请重试'

// 创建axois实例对象
const service =axios.create({
    baseURL:config.baseApi,
})

// 在请求前做事情
// service.interceptors.request.use((req) => {
//     // 自定义header
//     return req
// })

// 在请求后做事情
service.interceptors.response.use((res) => {
    // console.log("请求之后",res)
     const {data,status,statusText} = res
     if(status==200){
        return data
     }else{
        console.log("请求失败")
        ElMessage.error(statusText||NETWORK_ERROP)
        return Promise.reject(statusText||NETWORK_ERROP)
     }
})

// 封装核心函数
function request(options){
    // console.log("options is ",options)
    // 处理方法 默认为get（小写）
    options.method = options.method || 'get'
    if(options.method.toLowerCase()=='get'){
        options.parems = options.dara 
    }

    // 判断是否使用mock
    let isMock = config.mock    //mock总开关
    if(typeof options.mock!=='undefined'){
        isMock = options.mock  //若传入options的mock与总开关mock不一致，则优先使用options的mock信息
    }

    // 线上环境
    if(config.env == 'prod'){
        // 不使用mock
        service.defaults.baseURL = config.baseApi
    }else{
        service.defaults.baseURL = isMock ? config.mockApi:config.baseApi
    }
    return service(options)
}

export default request