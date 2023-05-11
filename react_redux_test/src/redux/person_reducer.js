export default function personReducer(preState=[],action){
     const {type,data}=action;
     switch(type){
        case "add_person":
        //preState.unshift(data)//此处不可以这样写，这样会导致preState被改写了，presonReducer就不是纯函数了
            return [data,...preState]
        default:
            return preState
     }
}