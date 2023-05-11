import React from 'react'
import "../assets/css/user.less"
import { getUser } from '../api/user'
import { useEffect,useState } from 'react'
import {useNavigate} from "react-router-dom"
import { Cell,Button } from 'zarm';

export default function User() {
   const [user,setUser]=useState({})
   const getUserMessage=async ()=>{
    const {data}=await getUser()
     setUser({...data});
     console.log(data)
   }
   useEffect(()=>{
      getUserMessage()
    
   },[])
   const navigate=useNavigate();
   const loginOut=()=>{
        localStorage.removeItem("token");
        navigate("/login")
   }
  return (
    <div className='user'>
      <div className="header">
            <div className="left">
              <span className='name'>昵称:{user.username}</span>
              <div className="remark"><img src="http://s.yezgea02.com/1615973630132/geqian.png" alt="131321" /><span>{user.signature}</span></div>
            </div>
            <div className="right"><img src={user.avatar} alt="" /></div>
      </div>
      <div className="content">
        <Cell hasArrow title="用户信息修改"  icon={<img alt="" src="http://s.yezgea02.com/1615974766264/gxqm.png" style={{ width: 24, height: 24 }} />}  onClick={() => {navigate("/userinfo")}} />
        <Cell hasArrow title="重置密码"  icon={<img alt="" src="http://s.yezgea02.com/1615975178434/lianxi.png" style={{ width: 24, height: 24 }} />}  onClick={() => {navigate("/modifyPassword")}} />
        <Cell hasArrow title="关于我们"  icon={<img alt="" src="http://s.yezgea02.com/1615974766264/zhaq.png" style={{ width: 24, height: 24 }} />} onClick={() => {}} />
      </div>
      <Button theme="danger" className='loginOut' onClick={loginOut}>退出登录</Button>
    </div>
  )
}
