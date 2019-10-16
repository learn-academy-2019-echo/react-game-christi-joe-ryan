import React, {Component} from 'react';
import x from "./x.png";
import o from "./o.png";
import './App.css';

class Square extends Component {
  render(){
    const {id, handleClick, val} = this.props
    return (
      <div onClick={() =>handleClick(id)} className = "nerd">
        <img className = "imgs" src =  {val === 1 ? x : val === 2 ? o : null} alt = ""></img>
      </div>
    );
  }
}
//<h1>{val !== null ? val.toString() : "0"}</h1>
export default Square;