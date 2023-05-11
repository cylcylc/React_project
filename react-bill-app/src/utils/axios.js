import axios from "axios";
import {Toast} from "zarm";

axios.defaults.baseURL="http://47.99.134.126:7009/api"
axios.defaults.withCredentials=true;
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers["token"]=localStorage.getItem("token")||"";
axios.interceptors.request.use(res=>{
    if(localStorage.getItem("token")){
        res.headers.Authorization= localStorage.getItem('token') || "";
    }
       return res
},error=>{
    return Promise.reject(error)
})
axios.interceptors.response.use(res=>{
    if(typeof res.data!="object"){
        Toast.show({
            content:"服务器异常",
          });
        return Promise.reject(res);
     }
    if(res.data.code!=200&&res.data.code!==1){
        if(res.data.message) {
            Toast.show({
                content:res.data.message,
            });
        }
        if(res.data.code==401){//未登录
            Toast.show({
                content:"未登录",
            });
           window.location="/login"
        }
        return Promise.reject(res);
    }
     return res.data
},error=>{
    return Promise.reject(error)
})
export default axios;