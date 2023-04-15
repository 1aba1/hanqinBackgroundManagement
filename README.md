#用户登录 管理token
1. login页面获取token
2. 调用store的set add方法添加上token：
    本地存储+store中的数据
3. 在mian中调用add方法，每次刷新页面添加上token

#路由守卫
（防止直接通过地址进入其他页面）
1. 在mian中进行前置守卫

#用户退出登录
1. 清除token
    本地存储+store中的数据