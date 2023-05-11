import React,{forwardRef} from 'react'

const Show=forwardRef((props,ref)=>{
    //暴露给其他组件
  if (ref) {
    ref.current = {
      showAge: () => {
        alert(21)
      },
      name:"zhangsan"
    }
  };
    return (
    <>
        <div>show</div>
    </>
    )
})
export default Show;