import React,{useEffect} from 'react'
import Nav from "../components/Nav"
import "../assets/css/modifyPassword.less"
import { useNavigate } from 'react-router-dom'
import { createForm  } from 'rc-form';
import { modifyPass } from '../api/user'
import { Input, Cell,Button,Toast } from 'zarm';
function ModifyPassword(props) {
    const { getFieldProps, getFieldError } = props.form;
    const navigate=useNavigate();
    useEffect(()=>{
      console.log(props.form)
    })
    const confirm=async ()=>{
        //字段验证
        props.form.validateFields(async (error,value)=>{
            if(!error){
                if (value.newPass !=value.confirmPass) {
                    Toast.show('新密码输入不一致');
                    return
                  }
                   const res=await modifyPass({
                    new_pass:value.newPass,
                    new_pass2:value.confirmPass,
                    old_pass:value.oldPass
                   });
                   Toast.show("修改一致")
                  navigate(-1)
            }else{
              Toast.show("请填写完整信息")
            }
        })
        
    }
  return (
    <div className='modifyPassword'>
     <Nav name="重置密码"/>
    <div className="content">
    <Cell title="原密码">
        <Input
          clearable
          type="password"
          placeholder="请输入原密码"
          {...getFieldProps('oldPass', { rules: [{ required: true }] })}
        />
      </Cell>
      <Cell title="新密码">
        <Input
          clearable
          type="password"
          placeholder="请输入新密码"
          {...getFieldProps('newPass', { rules: [{ required: true }] })}

        />
      </Cell>
      <Cell title="确认密码">
        <Input
          clearable
          type="password"
          placeholder="请输入确认密码"
          {...getFieldProps('confirmPass', { rules: [{ required: true }] })}
        />
      </Cell>
      <Button theme="primary" onClick={confirm}>
      提交
    </Button>
    </div>
    
    </div>
  )
}
export default createForm()(ModifyPassword)