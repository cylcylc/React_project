import React, { forwardRef, useState,useEffect } from 'react'
import { Popup,Input,Cell,Keyboard} from 'zarm'
import dayjs  from 'dayjs';
import PopupDate from './PopupDate';
import "../assets/css/addAccount.less"
import { getTypes } from '../api/account';
import { getIconType } from '../utils/index.js';
import { add } from '../api/account';
const AddAccount = forwardRef(({onSelect,detail={}}, ref) => {
  const [show, setShow] = useState(false)
  const [time,setTime]=useState(dayjs().format("MM-DD"));
  const [showRemark,setShowRemark]=useState(false)
  const [data,setData]=useState({
    amount:"",
    date:new Date().getTime(),
    pay_type:1,
    remark:"",
    type_id:1,
    type_name:"餐饮"
  })
  const [type,setType]=useState(1);//1为支出，2为收入
  const [allType,setAllType]=useState([]);
  const getType=async ()=>{
    const {data:{list}}=await getTypes();
    setAllType(list)
   
  }
  useEffect(()=>{  
    console.log(123)
    getType();
  },[])
  useEffect(()=>{
    
    // if(detail.id){
    //   setTime(detail.date)
    // }
    
  },[detail])
//暴露给其他组件
  if (ref) {
    ref.current = {
      show: () => {
        setShow(true)
      },
      close: () => {
        setShow(false)
      }
    }
  };
  const select=(item)=>{
    setTime(dayjs(item).format("MM-DD"))
    setData({...data,date:new Date(item).getTime()})
  }

  const showDate=()=>{
   
    PopupDate.current&&PopupDate.current.show()
  
  }
  //关闭弹窗
  const closePop=()=>{
    console.log(131)
    setShow(false)
  }
const saveAmount=async (key)=>{
  if(key!=="delete"&&key!=="ok"){
    setData({...data,amount:data.amount+key});
  }
  if(key==="delete"){
    if(data.amount){
      setData({...data,amount:data.amount.substring(0,data.amount.length-1)})
    }
  }
  if(key==="ok"){
    await add(data);
    setShow(false)
    onSelect()
  }
}
  return (
  
  <Popup
    visible={show}
    direction="bottom"
    onMaskClick={() => setShow(false)}
    destroy={false}
    mountContainer={() => document.body}
  >
    <div className='addAcount'>
     <div onClick={closePop} className="close">x</div>
     <div className="change"><div><span className={["out",type===1?"active":""].join(' ')} onClick={()=>{setType(1);setData({...data,type_id:1,type_name:"餐饮"})}}>支出</span><span className={["in",type===2?"active1":""].join(' ')} onClick={()=>{setType(2);setData({...data,type_id:11,type_name:"工资"})}}>收入</span></div><div className='date' onClick={showDate}>{time}<i className='icon-down iconfont'></i></div></div>
     <div className='input'><span>¥</span><span>{data.amount}</span></div>
     <div className="types">
      <div className="content">
      {allType.map((item,index)=>{
        if(item.type==type){
          return (<div  key={index}><i className={["iconfont",getIconType(item.name),(index+1)==data.type_id?type===1?"active1":"active2":""].join(' ')} onClick={()=>{setData({...data,type_id:item.id,type_name:item.name})}}></i><span>{item.name}</span></div>)
        }
      })}
      </div>
     
     </div>
     <div className="remark">
       {!showRemark?<div className='showRemark' onClick={()=>setShowRemark(true)}>{data.remark?data.remark:'添加备注'}</div>:""}
      {showRemark? <div className='content'>
      <Input
        autoHeight
        showLength
        maxLength={200}
        type="text"
        rows={3}
        placeholder="请输入备注信息"
        value={data.remark}
        onChange={(value)=>{
          setData({...data,remark:value})
        }}
      />
    </div>:""}
     </div>
     <Keyboard type="price" onKeyClick={saveAmount} />
     <PopupDate ref={PopupDate} mode="date" onSelect={select}/>
    </div>
  </Popup>
  
)
});


export default AddAccount;
