function adapter(){
    const dpWidth=document.documentElement.clientWidth;
    const rootFonstSize=dpWidth/10;
    document.documentElement.style.fontSize=rootFonstSize+"px"   
}
adapter()
window.onresize=adapter