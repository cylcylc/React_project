import React, { Fragment } from 'react'
import { useEffect,useState } from 'react';
import {Outlet,useLocation} from "react-router-dom"
import TabBar from '../components/TabBar'
import Type from '../components/Type'
export default function Home() {
  const {pathname}=useLocation();
  const showPath=["/account","/statistics","/user"]
  const [isShow,setShow]=useState(false);
  useEffect(()=>{
    if(showPath.indexOf(pathname)>=0){
      setShow(true)
    }else{
      setShow(false)
    }
  },[pathname])
  return (
    <>
     <div className="home">
        <Outlet/>
        {isShow?<TabBar/>:<></>}
    </div>
    </>
  )
}
