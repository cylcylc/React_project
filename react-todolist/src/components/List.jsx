import {React,useState,useEffect} from 'react'
import Item from "./Item"
import "../assets/css/list.css"
import PubSub from 'pubsub-js'
export default function List() {
  const [todoLists,setUpdate]=useState([{id:new Date(),content:"Linux",done:true},{id:2,content:"数据采集",done:false}])
  function newTodo(msg,data){
    const todo={id:new Date(),content:data,done:false}
    setUpdate([todo,...todoLists])
  }
  function modify(msg,data){
    const newTodo=todoLists.map((item)=>{
     if(data[1]===item.id){
      return {...item,content:data[0]}
     }
     return item;
    })
    setUpdate(newTodo)

  }
 function changeStatus(status,id){
  const newTodo=todoLists.map((item)=>{
    if(item.id===id){
      return {...item,done:status}
    }
    return item;
  })
  setUpdate(newTodo)

  }
  useEffect(()=>{
    //订阅
    PubSub.subscribe("newTodo",newTodo);
    PubSub.subscribe("modify",modify);
    return ()=>{
      //取消订阅
      PubSub.unsubscribe(newTodo)
      PubSub.unsubscribe(modify)
    }
  },[todoLists])//eslint-disable-line react-hooks/exhaustive-deps
  function deleteTodo(id){
 
  const list=todoLists.filter((item)=>{
    console.log(item.id)
    return item.id!==id;
  })
  setUpdate(list)
  }

  return (
    <div className="list">
            { 
                todoLists.map((item)=>{
                    return <Item listItem={item} key={item.id} deleteTodo={deleteTodo} changeStatus={changeStatus}/>
                })
            }
    </div>
  )
}
