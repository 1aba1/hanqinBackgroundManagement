/**
 * 整个项目的管理
 */

import Cookies from "js-cookie";
import request from "./request";
export default{
    // 根据不同用户名返回不同的菜单列表
    login(params){
        // console.log("logining ")
        return request({
            url:`/backend/login/${params.username}/${params.password}`,
            method:'POST'
        })
    },
    // 获取未审核的创作
    getCreateData(params){
        return request({
            url:`/backend/unAudited?page=${params.page}&pageSize=${params.pageSize}`,
            method:'GET',
            headers: { 
                'token':Cookies.get('token')
            }
            
        })
    },
    // 获取未审核用户信息
    getUnAudited(params){
        console.log("getUnAudited ")
        return request({
            url:`/backend/UnExamineUserMessage?page=${params.page}&pageSize=${params.pageSize}`,
            method:'GET',
            headers: { 
                'token':Cookies.get('token')
            }
        })
    },
    // 请求图片
    getPicture(name){
        return request({
            url:`/picture/download?name=${name}`,
            method:'GET',
            responseType: 'blob',
            headers: { 
                'token':Cookies.get('token')
            }
        })
        
    },
    //审核创作
    examineLiterary(litId,type){
        return request({
            url:`/backend/examine/literary?litId=${litId}&type=${type}`,
            method:'PUT',
            headers: { 
                'token':Cookies.get('token')
            }
        })
    },
    //审核用户
    examineUser(openid,type){
        return request({
            url:`/backend/examine/userMessage?openid=${openid}&type=${type}`,
            method:'PUT',
            headers: { 
                'token':Cookies.get('token')
            }
        })
    },
    // 提交导入
    uploadArticle(params,type){
        return request({
            url:`/backend/uploadArticle`,
            method:'POST',
            data:{
                "appreciation":params.appreciate||"",
                "author":params.author|| "",
                "content": params.content||"",
                "title": params.title||"",
                "type": type
            },
            headers: { 
                'token':Cookies.get('token')
            }
        })
    }

}