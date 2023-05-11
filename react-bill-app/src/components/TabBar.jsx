import "../assets/css/tabbar.less"
import React,{useState,useEffect, Fragment} from 'react'
import { useNavigate,useLocation} from "react-router-dom";
import { Icon, TabBar} from 'zarm';

const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_3777243_a8wd2s0y44.js');
export default function TabBars() {
    const navigate=useNavigate();
    const [activeKey, setActiveKey] = useState('home');
    const change=(value)=>{
       navigate(value);
    }
   const {pathname}=useLocation();
   useEffect(()=>{
    let path=pathname.split("/")[1]
    setActiveKey(path)
   },[pathname])
  return (
    <>
   
      <div>
        <TabBar activeKey={activeKey} onChange={change}>
        <TabBar.Item itemKey="account" title="账单" icon={<TabIcon type="icon-zhangdan1" />} />
        
        <TabBar.Item
          itemKey="statistics"
          title="统计"
          icon={<TabIcon type="icon-tongji" />}
                  />
        <TabBar.Item
          itemKey="user"
          title="我的"
          icon={<TabIcon type="icon-cc-user" />}/>
      </TabBar>
      </div>

    </>
  )
}
