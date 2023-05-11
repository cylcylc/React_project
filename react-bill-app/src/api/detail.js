import axios from "axios"

export const getDetail=(params)=>{
  return axios({
   url:"/bill/detail",
   method:"get",
   params
})
}
export const deleted=(data)=>{
  return axios({
    url:"/bill/delete",
    method:"post",
    data
  })
}