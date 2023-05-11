import React,{useState,useRef} from 'react'
import "../assets/css/item.css"
import {EditOutlined,DeleteOutlined} from "@ant-design/icons"
import PubSub from "pubsub-js"

export default function Item(props) {
  const [isEdit,setEdit]=useState(false);
  const input1=useRef();
  function changeStatus(){
   props.changeStatus(!props.listItem.done,props.listItem.id)
  }
  //删除
  function deleteTodo(){
       props.deleteTodo(props.listItem.id)
  }

  //编辑
  function edit(){
    input1.current.focus()
     setEdit(true)
     input1.current.value=props.listItem.content;
  }
  function modify(){
    PubSub.publish("modify",[input1.current.value,props.listItem.id])
    setEdit(false)
  }
  return (
    <div className="item">
        <div className="con">
        <span onClick={changeStatus} className={[props.listItem.done?"finished":"",isEdit?"editItem":"showItem"].join(" ")}>{props.listItem.content}</span>
        <input type="text" className={isEdit?"edit":"noEdit"} ref={input1} onBlur={modify}/>
        <span className='oper'>
        <span onClick={edit}><EditOutlined /></span>
        <span onClick={deleteTodo}><DeleteOutlined /></span>
        </span>
        </div>
    </div>
  )
}
 