import Mock from "mockjs"
import homeApi from './mockData/home'
import permissionApi from './mockData/permission'
// 拦截请求
// Mock.mock('/home/getData',homeApi.getHomeData)
// Mock.mock('/permission/getMenu',permissionApi.getMenu)
// Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)