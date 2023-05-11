import axios from "../utils/axios.js"

export const getUser=()=>{
    return axios({
        url:"/user/get_userinfo",
        method:"get"
    })
}
export const upload=(data)=>{
    return axios({
        url:"http://api.chennick.wang/api/upload",
        method:"post",
        data
    })
}
export const edit_userinfo=(data)=>{
    return axios({
        url:"http://47.99.134.126:7009/api/user/edit_userinfo",
        method:"post",
        data
    })
}
export const modifyPass=(data)=>{
    return axios({
        url:"http://47.99.134.126:7009/api/user/modify_pass",
        method:"post",
        data
    })
}