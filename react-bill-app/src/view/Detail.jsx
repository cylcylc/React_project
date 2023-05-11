import { func } from "prop-types";
import { useEffect,useState,useRef } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { getDetail,deleted } from "../api/detail";
import { getIconType } from "../utils";
import { timestamp } from "../utils/date";
import "../assets/css/detail.less"
import {Modal,Toast} from "zarm";
import Nav from "../components/Nav";
import AddAccount from "../components/addAccount";
export default function Detial(){
    const location=useLocation();
    const [detail,setDetail]=useState({})
    const getMessage=async ()=>{
        const id=Number(location.search.split("=")[1]);
        const {data}=await getDetail({id:id})
        setDetail(data)
    }
    useEffect(()=>{
       getMessage()
    },[])
const navigate=useNavigate()
  const deleteDetail=()=>{
    Modal.confirm({
      title: '删除',
      content: '确认删除账单？',
      onCancel: () => {
      },
      onOk:async () => {
        const {code}=await deleted({id:detail.id})
        if(code===200){
          Toast.show("删除成功")
          navigate(-1)
        }
      },
})
  }
const popupDate=useRef();
const select=()=>{
    
}
  return (
       <div className="detail">
        <Nav name="账单详情"/>
         <div className="detail-content">
            <div className="iconDetail"><span><i className={"iconfont "+getIconType(detail.type_name)}></i></span>{detail.type_name}
           </div>
           <div className="amount">{detail.amount>0?"+"+detail.amount:"-"+detail.amount}</div>
           <div className="time"><span>记录时间</span><span className="date">{timestamp(Number(detail.date),3)}</span></div>
           <div className="remark"><span>备注</span>{detail.remark?detail.remark:"-"}</div>
           <div className="button">
            <span className="delete" onClick={deleteDetail}><i className="iconfont icon-shanchu"></i>删除</span>
            <span className="edit" onClick={()=>{popupDate.current.show()}}><i className="iconfont icon-classnotes"></i>编辑</span>
           </div>
         </div>
        <AddAccount ref={popupDate} onSelect={select} detail={detail} />
       </div>
  )
}