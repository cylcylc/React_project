
import { Fragment, useState,forwardRef,useEffect } from 'react';
import { Popup} from 'zarm';
import "../assets/css/type.less"
import { getTypes } from '../api/account';
// const [list,setList]=useState([]);

const Type=forwardRef(({onSelect},ref)=> {
 const [show,showType]=useState(false);
 const [type,setType]=useState("all");
 const [list,setList]=useState([]);
 const getTypesList=async ()=>{
   const {data:{list}}=await getTypes();
   setList([...list])
 
 }
 useEffect(()=>{
  getTypesList()
},[])
 if(ref){//暴露给父元素
  ref.current={
    showPopup:()=>{
      showType(true)
    },
    type:type
  }
 }
    
  return(
    <div >
      <Popup
        visible={show}
        direction="bottom"
        onMaskClick={() => showType(false)}
        destroy={false}
        mountContainer={() => document.body}
        width="50%"
      >
        <div className="popup-box">
          <div className="title">
            <span>请选择类型</span>
            <span className='close' onClick={()=>{showType(false)}}>x</span>
          </div>
          <div className="type">
            <div className="all">
              <div className={type==="all"?"active":""} onClick={()=>{setType("all");showType(false);onSelect("all")}}>全部类型</div>
            </div>
            <p>支出</p>
            <div className="out">
              {list.map((item,index)=>{
                if(item.type==="1"){
                  return (<div key={index} className={item.name===type?"active":""} onClick={()=>{setType(item.name);showType(false);onSelect(item.name)}}>{item.name}</div>)
                }
              })}
            </div>
            <p>收入</p>
            <div className="out">
              {list.map((item,index)=>{
                if(item.type==="2"){
                  return (<div key={index} className={item.name===type?"active":""} onClick={()=>{setType(item.name);showType(false);onSelect(item.name)}}>{item.name}</div>)
                }
              })}
            </div>
          </div>
        </div>
      </Popup> 
    </div>
  )
    
});
export default Type;