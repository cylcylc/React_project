import PubSub from "pubsub-js"
import React,{useRef}from 'react'
import "../assets/css/footer.css"
export default function Footer() {
  const input1=useRef();
  function add(){
    if(input1.current.value){
      PubSub.publish("newTodo",input1.current.value);
      input1.current.value=""
    }
  }
  return (
    <div className="footer">
        <p>New Todo</p>
        <input type="text" name="content" id="content" placeholder='New Todo' ref={input1} /><button onClick={add}>ADD TODO</button>
    </div>
  )
}
