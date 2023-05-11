
export const incrementAction=(data)=>{
    return {type:"increment",data}
}
export const decrementAction=(data)=>{
    return {type:"decrement",data}
}
//异步action，就是指action的值为函数，异步action中一般都会调用同步action，异步action不是必须要用的
export const incrementAsyncAction=(data,time)=>{
    //store调用此回调函数，会将dispatch传入
    return (dispatch)=>{
        setTimeout(()=>{ 
            dispatch(incrementAction(data))
        },time)
    }
}