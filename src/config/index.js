/**
 * 环境配置文件
 * 开发环境 测试环境 上线环境
 * 
 */

// 当前的环境
// const env = import.meta.env.MODE || 'prod'
const env = 'prod'

const EnvConfig ={
    development:{
        baseApi:'/api',
        mockApi:'',
    },
    test:{
        baseApi:'/api',
        mockApi:'',
        
    },
    // 线上环境
    prod:{
        baseApi:'https://historyhangqin.com:8083',
        mockApi:'',
    }
}

export default{
    env,
    mock:false,
    ...EnvConfig[env]
}