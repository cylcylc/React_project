import React from 'react'
import Nav from "../components/Nav"
import "../assets/css/userinfo.less"
import {FilePicker,Button,Toast,Input} from 'zarm';
import {getUser,upload,edit_userinfo} from "../api/user"
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Userinfo() {
  const [user,setUser]=useState({});
  const getMessage=async ()=>{
    const {data}=await getUser();
     setUser({...data})
     setValue(data.signature)

  }
  useEffect(()=>{
  getMessage()
  },[])
  const onSelect =async (file) => {
    if (file && file.file.size > 200 * 1024) {
      Toast.show('上传头像不得超过 200 KB！！')
      return
    }
    console.log(file,"file")
     let formData=new FormData();//使用FormData上传二进制文件
     formData.append("file",file.file)
    const res=await upload(formData)
    setUser({...user,avatar:"	http://api.chennick.wang"+res.data})
  };
  const [value,setValue]=useState(user.signature)
  const changeSig=(title)=>{
    setValue(title)
  }
  const navigate=useNavigate();
  const saveInfo=async ()=>{
    const res=await edit_userinfo({avatar:user.avatar,signature:value})
   Toast.show("用户信息修改成功")
    navigate(-1)
  }
  return (
    <div className='userinfo'>
        <Nav name="用户信息"/>
        <div className="content">
            <div className='own'>个人资料</div>
            <div className='avator'>
              <p>头像</p>
              <div>
              <div><img src={user.avatar} alt="" /></div>
              <div className="file-picker-wrapper">
                <p>支持jpg,png,jpeg格式大小200KB以内的图片</p>
                <FilePicker className="file-picker-btn" onChange={onSelect} accept=".png, .jpg, .jpeg">
                 <Button theme="primary">点击上传</Button>
                </FilePicker>
              </div>
              </div>
             
            </div>
            <div className='signature'>
              <p>个性签名</p>
              <Input
                clearable
                type="text"
                placeholder="请输入个性签名"
                value={value}
                onChange={changeSig}
              />
            </div>
        </div>
        <Button theme="primary" onClick={saveInfo}>
         保存
        </Button>
        </div>
  )
}
