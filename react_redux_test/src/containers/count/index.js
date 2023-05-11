//引入UI组件
import CountUI from "../../components/count"
import { incrementAction,decrementAction } from "../../redux/count_action"
// //引入store
// import store from "../../redux/store"
//引入connect用于连接UI组件于redux
import {connect} from "react-redux"
// //向UI传递数据，在props上,mapStateToProps传递的是状态，返回对象
// function mapStateToProps(state){
//     return {count:state}
// }
// //mapDispatchToProps用于传递操作状态的方法
// function mapDispatchToProps(dispatch){
//     return {jia:(number)=>{
//         dispatch(incrementAction(number))
//     },jian:(number)=>{dispatch(decrementAction(number))}}
// }
// //使用connect（）（）创建并暴露一个Count的容器组件
// export default connect(mapStateToProps,mapDispatchToProps)(CountUI);
//优化
export default connect(
    state=>({count:state.sum,renshu:state.persons.length})
    ,
    // dispatch=>({
    // jia:(number)=>{dispatch(incrementAction(number))},
    // jian:(number)=>{dispatch(decrementAction(number))}
    // })
    //简写，dispatch会自动分发 
    {
        jia:incrementAction,
        jian:decrementAction
    }
    )(CountUI);