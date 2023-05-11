import axios  from "../utils/axios";
export const getTypes=()=>{
    return axios({
        url:"/type/list",
        method:"get"
    })
}
export const getList=(params)=>{
    return axios({
        url:"/bill/list",
        method:"get",
        params
    })
}
//添加账单
export const add=(data)=>{
  return axios({
    url:"/bill/add",
    method:"post",
    data
  })
}