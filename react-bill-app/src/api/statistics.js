import axios from "../utils/axios.js"

export const getData=(params)=>{
    return axios({
        url:"/bill/data",
        method:"get",
        params
    })
}