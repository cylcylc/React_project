
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import "../assets/css/Nav.less"
export default function Nav(props){
    const [name,setName]=useState("");
    useEffect(()=>{
        setName(props.name)
    })
    const navigate=useNavigate()
    const back=()=>{
        console.log(1)
       navigate(-1)
    }
 return (
    <div className="nav" onClick={back}>
     <span className="back"><i className="iconfont icon-down"></i></span>
     <span>{name}</span>
    </div>
 )
}