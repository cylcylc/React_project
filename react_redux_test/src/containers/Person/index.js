import React, { Component } from 'react'
import {connect} from "react-redux"
import {createAddpersonAction} from "../../redux/person_action"
import {nanoid} from "nanoid"
 class Person extends Component {
    addPerson=()=>{
        const name=this.name.value;
        const age=this.age.value;
        const personObj={id:nanoid(),name,age}
        this.props.addPer(personObj)
        
    }
  render() {
    return (
      <div>
        <input  ref={c=>this.name=c} type="text" placeholder='输入姓名' />
        <input ref={c=>this.age=c} type="text" placeholder='输入年龄' />
        <button onClick={this.addPerson}>添加</button>
        {
            this.props.persons.map((item)=>{
                return <div key={item.id}>{item.name+"-----------"+item.age}</div>
            })
        }
      </div>
    )
  }
}
export default connect(
    state=>({persons:state.persons}),
    {
        addPer:createAddpersonAction
    }
)(Person)