import React,{useState,useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import "../assets/css/login.less"
import { Icon,Input,Cell,Button,Checkbox, Toast} from 'zarm';
import { login,register } from '../api/login';
// import { Success } from '@zarm-design/icons';
import Captcha from "react-captcha-code"
const TabIcon = Icon.createFromIconfont("//at.alicdn.com/t/c/font_3777243_shkn7d5de.js")
export default function Login() {
  const navigate=useNavigate();
  const [isLogin,setValue]=useState(true)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState(''); // 验证码变化后存储值
  const [verify, setVerify] = useState(''); // 验证码
   //  验证码变化，回调方法
   const handleChange = useCallback((captcha) => {
    setCaptcha(captcha)
  }, []);
  const submit=async ()=>{
    //提示信息
    let tipMsg="";
    if(!username){
      tipMsg="请输入账号"
    }else if(!password){
      tipMsg="请输入密码";
    }else if(!verify&&!isLogin){
      tipMsg="请输入验证码"
    }else {
      if(isLogin){
        const res=await login({username:username,password:password})
        console.log(res)
        if(res.code===200){
         navigate("/account")
         localStorage.setItem("token",res.data.token)
        tipMsg="登录成功"
        }else{
          tipMsg=res.msg;
        }
      }else{
        if(verify===captcha){
          const {msg}=await register({username:username,password:password});
          tipMsg=msg
        }else{
         tipMsg="验证码错误"
        }
      }
    }
    Toast.show({
      content:tipMsg,
    });
  }
  return (
    <>
    <div className='login'>
      <div className="logo">
        
      </div>
      <div className="content">
        <div className="tabs">
          <span onClick={()=>setValue(true)} className={isLogin?"active":""}>登录</span>
          <span onClick={()=>setValue(false)} className={!isLogin?"active":""}>注册</span>
        </div>
        <div className="form">
        <Cell icon={<i className='iconfont icon-shouji'></i>}>
        <Input
          clearable
          type="text"
          placeholder="请输入账号"
          value={username}
          onChange={(value) => {
            setUsername(value);
          }}
        />
      </Cell>
      <Cell icon={<i className='iconfont icon-mima'></i>}>
        <Input
          clearable
          type="password"
          placeholder="请输入密码"
          value={password}
          onChange={(value) => {
            setPassword(value);
          }}
        />
      </Cell>
      {
        isLogin?"":(<Cell icon={<i className='iconfont icon-mima'></i>}>
        <Input
          clearable
          type="text"
          placeholder="请输入验证码"
          value={verify}
          onChange={(value) => {
            setVerify(value);
          }}
        />
        <Captcha charNum={4} onChange={handleChange}/>
      </Cell>
      )
      }
      {
        isLogin?"":(<div className='agree'>
          <Checkbox />
          <label>阅读并同意 <a>《猫猫记账本条款》</a> </label>
           </div>)
      }
       <Button theme="primary" onClick={submit}>{isLogin?"登录":"注册"}</Button>
        </div>
      </div>

    </div>
    </>
  )
}
