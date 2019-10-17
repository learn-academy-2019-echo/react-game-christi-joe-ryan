import React, {Component} from 'react';
import x from "./x.png";
import o from "./o.png";
import blank from "./blank.png";
import './App.css';

class Square extends Component {
  render(){
    const {id, handleClick, val, firstPlayer, secondPlayer} = this.props
    return (
      <div onClick={() =>handleClick(id)} className = "square">
        <img className = "imgs" src =  {val === 1 ? x : val === 2 ? o : blank} alt = ""></img>
        <h1>{val === 1 ? firstPlayer : val === 2 ? secondPlayer : ""}</h1>
      </div>
    );
  }
}
//<h1>{val !== null ? val.toString() : "0"}</h1>
export default Square;