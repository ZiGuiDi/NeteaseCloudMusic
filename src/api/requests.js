import axios from "axios"
//引入进度条
import nprogress from "nprogress"
import "nprogress/nprogress.css"
const requests = axios.create({
    //配置对象
    // baseURL: "/api",
    //代表请求时间超时为5s
    timeout: 5000
})
// 添加请求拦截器
requests.interceptors.request.use(function (config) {
    //发送请求前你可以写逻辑
    nprogress.start()//进度条开始
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 2xx范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    nprogress.done()//进度条结束
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default requests;