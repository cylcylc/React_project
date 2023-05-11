
import React, { Component } from 'react'
export default class App extends Component {
  state={count:0}
  render() {
    return (
      <div>
        <div>下方Person组件总人数为{this.props.renshu}</div>
        <div>求和{this.props.count}</div>
        <select ref={c=>this.selectValue=c}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementIfOdd}>奇数加</button>
        <button onClick={this.incrementAsync}>异步加</button>
      </div>
    )
  }
 increment=()=>{
 const {value}=this.selectValue;
 this.props.jia(value*1)
 }
 decrement=()=>{
  const {value}=this.selectValue;
  this.props.jian(value*1)
  
 }
 incrementIfOdd=()=>{
  const {value}=this.selectValue;
  if(this.props.count%2!==0){
    this.props.jia(value*1)
  }
 }

 incrementAsync=()=>{
  const {value}=this.selectValue;
  setTimeout(()=>{
    this.props.jia(value*1)
  },500)
//   store.dispatch(incrementAsyncAction(value*1,500))
 }
}
