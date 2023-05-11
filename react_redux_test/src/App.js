
import './App.css';
import React, { Component } from 'react'
import Count from './containers/count';
 import Person from "./containers/Person/index"
export default class App extends Component {
  state={count:0}
  render() {
    return (
     <div>
     <Count/>
     <hr/>
     <Person/>
     </div>
    )
  }
 
}
