import React, { useState,useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import "../assets/css/account.less"
import { Icon,Pull} from 'zarm';
import Type from '../components/Type';
import PopDate from '../components/PopupDate';
import AddAccount from '../components/AddAccount';
import { timestamp } from '../utils/date';
import { getTypes,getList } from '../api/account';
import { getIconType,REFRESH_STATE,LOAD_STATE} from '../utils/index.js';
import LOAD_STATUS from 'zarm/lib/image-preview/utils/loadStatus';
import dayjs from "dayjs"

const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_3777243_h89abgn6fqp.js');
export default function Account() {
  const [types,setTypes]=useState([]);
  const [lists,setList]=useState([]);
  const [state,setState]=useState({
    totalExpense:0,
    totalIncome:0,
    totalPage:1
  })
  const [currentTime,setCurrentTime]=useState(dayjs().format('YYYY-MM'))
  const [selectType,setSelectType]=useState("all");
  const [listParams,setListParams]=useState({"date":dayjs().format("YYYY-MM"),"type_id":"all","page":1,"page_size":5});
  const getType=async ()=>{
    const {data}=await getTypes();
    setTypes(data)
  }
  const getLists=async()=>{
    const {data,data:{list}}=await getList(listParams);
    setState({totalExpense:data.totalExpense,totalIncome:data.totalIncome,totalPage:data.totalPage});
      //处理数据，将每天的收入和支出总和求出
    list.forEach((item)=>{
        let out=0;
        let accountIn=0;
        item.bills.forEach((content)=>{
               if(content.pay_type===1){
                out+=Number(content.amount);
               }else{
                accountIn+=Number(content.amount)
               }
        })
        item.out=out.toFixed(2);
        item.in=accountIn.toFixed(2)
      })
     //下拉刷新，重置数据
     if(listParams.page===1){
      setList(list)
     }else{
      //拼接数据
      setList(lists.concat(list));
     }
      // 上滑加载状态
    setLoading(LOAD_STATE.success);
    setRefreshing(REFRESH_STATE.success);
  }
  useEffect(()=>{
    getLists();
  },[listParams.page])

  useEffect(()=>{
    getType()
  },[])
const typePup=useRef();
 const [type,setType]=useState('price');
 const showType=()=>{
  typePup.current&&typePup.current.showPopup(true)
 }
 const popDate=useRef();
 const showDate=()=>{
  popDate.current&&popDate.current.show();
 }
 //跳转详情页面
 const navigate=useNavigate();
 const detail=(id)=>{
    navigate(`/detail?id=${id}`)
 }

  //下拉刷新
 const [refreshing,setRefreshing]=useState(REFRESH_STATE.normal)//下拉刷新状态
 const [loading,setLoading]=useState(LOAD_STATUS.normal)//上拉加载状态
 // 请求列表数据
 //刷新数据
 const refreshData = () => {
  setRefreshing(REFRESH_STATE.loading);

  if (listParams.page != 1) {
    listParams.page=1;
    setListParams(listParams)
  } else {
   getLists();
  };
};
//加载数据
const loadData = () => {
  if (listParams.page < state.totalPage) {
    setLoading(LOAD_STATE.loading);
    listParams.page+=1;
    setListParams(listParams)
  }
}
//选择类型
const select=(content)=>{
  console.log(content)
  setRefreshing(REFRESH_STATE.loading);
  listParams.page=1;
  if(content!=="all"){
    types.list.forEach((item)=>{
      if(item.name===content){
        listParams.type_id=item.id;
      }
    })
  }else{
    listParams.type_id="all";
  }

  setListParams(listParams)
  getLists()
  setSelectType(content)
}
 // 筛选月份
 const selectMonth = (item) => {
  setRefreshing(REFRESH_STATE.loading);
  listParams.date=item;
  listParams.page=1;
  setListParams(listParams)
  getLists()
  setCurrentTime(item)
}
//添加账单
const addAccount=useRef();
const add=()=>{
  addAccount.current&&addAccount.current.show();
}
  return (
    <div className='account'>
      <div className="add" onClick={add}><i className='iconfont icon-classnotes'></i></div>
      <header>
        <div className="sum">
          <div className='out'>总支出：<span>¥&nbsp;{state.totalExpense.toFixed(2)}</span></div>
          <div className='in'>总收入：<span>¥&nbsp;{state.totalIncome.toFixed(2)}</span></div>
        </div>
        <div className="type">
          <div className="all" onClick={showType} ><span>{selectType==="all"?"全部类型":selectType}</span><TabIcon type="icon-down" /></div>
          <div className="time" onClick={showDate}><span>{currentTime}</span><TabIcon type="icon-down" /></div>
        </div>
      </header>
      <div className='content'>
      <Pull
          animationDuration={200}
          stayTime={400}
          refresh={{
            state: refreshing,
            handler: refreshData
          }}
          load={{
            state: loading,
            distance: 200,
            handler: loadData
          }}
        >
        {
        lists.length!==0?lists.map((item,index)=>{
           return (<div className='dayAccount' key={index}>
                 <div className="title">
                   <div className="date">{item.date}</div>
                   <div className='outIn'><span className='out'><span>支</span>¥{item.out}</span><span className='in'><span>收</span>¥{item.in}</span></div>
                 </div>
                 {item.bills.sort((a, b) => b.date - a.date).map((listitem,index)=>{
                  return(
                    <div className="listItem" key={index} onClick={()=>detail(listitem.id)}>
                      <div className="listItem-one"><div className="typeIcon"><i className={"iconfont "+getIconType(listitem.type_name)}></i>{listitem.type_name}</div><div className={listitem.pay_type===1?'amountOut':'amountIn'}>{listitem.pay_type===1?"-"+listitem.amount:"+"+listitem.amount}</div></div>
                       <div className="listItem-two">{timestamp(Number(listitem.date),1)}</div>
                    </div>
                  )
                 })}
           </div>)
        }):(<div className='empty'>暂无数据</div>)
        }
        </Pull>
      </div>
      <AddAccount ref={addAccount} onSelect={select} isModify={false} />
      <Type ref={typePup} onSelect={select}/>
      <PopDate ref={popDate} mode="month" onSelect={selectMonth}/>
      
    </div>
  
  )
}
