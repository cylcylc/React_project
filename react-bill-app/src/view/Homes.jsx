//父组件 Home.jsx
import React,{useRef,useEffect,useState} from 'react'
import Show from "./Show.jsx"
export default function Homes() {
  const test=useRef(); 
  const [name,setName]=useState("");
  useEffect(()=>{
      setName(test.current.name)
  })
  const display=()=>{
      test.current.showAge();
  }
  return (
    <div>
      <Show ref={test}/>
       <div>name:{name}</div>
      <button onClick={display}>显示</button>
    </div>
  )
}
