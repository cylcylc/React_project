import React from 'react';
import { DatePicker,Progress } from 'zarm';
import * as echarts from 'echarts';
import "../assets/css/statistics.less"
import { useState } from 'react';
import dayjs from 'dayjs';//格式化时间
import PopupDate from "../components/PopupDate"
import { useRef } from 'react';
import { useEffect } from 'react';
import { getData } from '../api/statistics.js';
import { getIconType } from '../utils';
export default function Statistics() {
  const dateRef=useRef();
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'));
  const [data,setData]=useState({});
  const [progressList,setProgressList]=useState([]);
  const [isProgressOut,setProgressOut]=useState(true);
  const [isPieOut,setIsPieOut]=useState(true);
  const getMessage=async ()=>{
    const {data}=await getData({date:currentMonth})
    setData({...data})
    //进度条支出数据
    setProgressList(data.total_data.filter((item)=>{
      return item.pay_type===1
     }))
     //饼状图的数据
     const newpieData=[]
    data.total_data.forEach((item)=>{
      if(item.pay_type===1){
        newpieData.push({value:item.number,name:item.type_name})
      }
   })
     setPie(newpieData)

  }
  useEffect(()=>{
    getMessage()
  },[currentMonth])
  const showDate=()=>{
    dateRef.current&&dateRef.current.show()
  }
  const selectMonth = (item) => {
    setCurrentMonth(item)
  }
  //支出
  const amountOut=(type)=>{
  if(type==="progress"){
     setProgressOut(true)
     setProgressList(data.total_data.filter((item)=>{
      return item.pay_type===1
     }))
  }else{
    setIsPieOut(true)
    const newpieData=[]
    data.total_data.forEach((item)=>{

      if(item.pay_type===1){
        newpieData.push({value:item.number,name:item.type_name})
      }
   })
     setPie(newpieData)
  }
  }
  //收入
  const amountIn=(type)=>{
 if(type==="progress"){
    setProgressOut(false);
    setProgressList(data.total_data.filter((item)=>{
      return item.pay_type===2
     }))
  }else{
    setIsPieOut(false)
    const newpieDatas=[]
    data.total_data.forEach((item)=>{
      if(item.pay_type===2){
        console.log(item)
        newpieDatas.push({value:item.number,name:item.type_name})
      }
   })
     setPie(newpieDatas)
  }
  }
  const setPie=(data)=>{
    if (document.getElementById("pieContainer") == null) {
      return
    }
    echarts.dispose(document.getElementById("pieContainer"))
    var dom=document.getElementById('pieContainer');
    var  myChart = echarts.init(dom);
    
   var  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      top: 'top'
    },
    series: [
      {
        name:isPieOut?"支出":"收入",
        type: 'pie',
        radius: '50%',
        data:[...data],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
    }
 myChart.setOption(option)
}
  return (
    <>
    <div className='statistics'>
       <div className="content">
        <div className="sum">
          <div className="time" onClick={showDate}>
            <span>{currentMonth}</span><span className='line'></span><span><i className='iconfont icon-notes'></i></span>
          </div>
          <div className="out">
          <div>共支出</div>
          <div className='amount'>¥{data.total_expense}</div>
         
        </div>
        <div className="in">
          共收入¥{data.total_income}
        </div>
        </div>
        <div className="view">
          <div className="title">
            <div>收支构成</div>
            <div><span onClick={()=>amountOut("progress")} className={isProgressOut?"active":""}>支出</span><span onClick={()=>amountIn("progress")} className={isProgressOut?"":"active"}>收入</span></div>
          </div>
          {progressList.map((item,index)=>{
            return (
              <div className="listItem" key={index}>
                <div className='detailIcon'><i className={"iconfont "+(isProgressOut?"active ":"inActive ")+getIconType(item.type_name)}></i><span>{item.type_name}</span><span>¥{item.number}</span></div>
                <div className={"progress "+(isProgressOut?"":"in")}>
                <Progress
                  shape="line"
                  percent={item.pay_type===1?((item.number/data.total_expense)*100).toFixed(2):((item.number/data.total_income)*100).toFixed(2)}
                  theme={"primary"}
                  strokeShape={"round"}
                  strokeWidth={10}
                />
                </div>
              </div>
            )
          })}
          <div className="title">
            <div>收支构成</div>
            <div><span onClick={()=>amountOut("pie")} className={isPieOut?"active":""}>支出</span><span onClick={()=>amountIn("pie")} className={isPieOut?"":"active"}>收入</span></div>
          </div>
          <div id='pieContainer'></div>
        </div>
       </div>
    </div>
    <PopupDate ref={dateRef}  mode="month" onSelect={selectMonth}/>
    </>
  )
}
