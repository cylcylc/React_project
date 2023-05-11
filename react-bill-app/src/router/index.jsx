import Home from "../view/Home"
import Login from "../view/Login"
import Account from "../view/Account"
import Statistics from "../view/Statistics"
import User from "../view/User" 
import Detail from "../view/Detail"
import Userinfo from "../view/Userinfo"
import ModifyPassword from "../view/ModifyPassword"
import Homes from "../view/Homes"
import {Navigate} from "react-router-dom"
const  routes=[
    {
      path:"/",
      element:<Navigate to="/account"/>
    },
    {
    path:'/login',
    element:<Login/>
},
{
    path:"/",
    element:<Home/>,
    children:[
        {
         path:"account",
         element:<Account/>
        },
        {
            path:"statistics",
            element:<Statistics/>
        },
        {
            path:"user",
            element:<User/>
        },{
            path:'detail',
            element:<Detail/>
        },
        {
            path:"userinfo",
            element:<Userinfo/>

        },
        {
            path:"modifyPassword",
            element:<ModifyPassword/>
        },
        {
            path:"homes",
            element:<Homes/>
        }
    ]
}
]
const onRouteBefore=(meta,to)=>{
    console.log(meta,9)
    console.log(to,0)
}

export default routes;
