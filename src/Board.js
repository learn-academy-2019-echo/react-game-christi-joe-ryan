import React, {Component} from 'react';
import Square from "./Square.js";
import winningConditions from './winningConditions.js';
import './App.css';
import Dropdown from './Dropdown.js'

class Board extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      firstPlayer : {
        spaces: [],
        won : false,
        character: ""
      },
      secondPlayer : {
        spaces: [],
        won : false,
        character: ""
      },
      firstPlayerTurn : true,
      gameOver: false
    }
  }
  
  checkIfWinner = () =>{
    let { firstPlayer, secondPlayer} = this.state;
    let firstWon = false;
    for(let i = 0; i < winningConditions.length; i++){
      for(let j = 0; j < winningConditions[i].length; j++){
        if(firstPlayer.spaces.includes(winningConditions[i][j])){
          firstWon = true;
        }
        else {
          firstWon = false;
          break;
        }
      } 
      if(firstWon){
        break;
      }
    }
    if(firstWon){
      this.setState({gameOver: true});
      firstPlayer["won"] = true
      this.setState({firstPlayer});
      return;
    }
    
    let secondWon = false;
    for(let i = 0; i < winningConditions.length; i++){
      for(let j = 0; j < winningConditions[i].length; j++){
        if(secondPlayer.spaces.includes(winningConditions[i][j])){
          secondWon = true;
        }
        else {
          secondWon = false;
          break;
        }
      }
      if(secondWon){
        break;
      }
    }
    
    if(secondWon){
      this.setState({gameOver: true});
      secondPlayer["won"] = true
      this.setState({secondPlayer});
      return;
    }
  }
  
  handleClick = (id) => {
    let {squares, firstPlayerTurn, firstPlayer, secondPlayer, gameOver} = this.state;
    if(gameOver){
      return;
    }
    let possibleClick = false;
    let s = squares;
    for(let i = 0; i < s.length; i++){
      if(id === i){
        if(s[i] === null){
          possibleClick = true;
          s[i] = firstPlayerTurn ? 1 : 2;
          if(firstPlayerTurn){
            let spa = firstPlayer.spaces;
            spa.push(i);
            firstPlayer["spaces"] = spa
            this.setState({firstPlayer})
          }
          else {
            let spa = secondPlayer.spaces;
            spa.push(i);
            secondPlayer["spaces"] = spa
            this.setState({secondPlayer})
          }
        }
        break;
      }
    }
    if(possibleClick){
      this.setState({squares: s});
      let nuTurn = !firstPlayerTurn;
      this.setState({firstPlayerTurn : nuTurn});
      this.checkIfWinner();
    }
  }
  
  resetGame = () => {
    let {firstPlayer, secondPlayer} = this.state;
    firstPlayer["spaces"] = [];
    firstPlayer["won"] = false;
    secondPlayer["spaces"] = [];
    secondPlayer["won"] = false;
    let s = Array(9).fill(null);
    this.setState({squares : s});
    this.setState({firstPlayer});
    this.setState({secondPlayer});
    this.setState({firstPlayerTurn : true});
    this.setState({gameOver : false});
  }
  
  chooseCharacter = (isFirst, character) =>{
    let {firstPlayer,secondPlayer} = this.state
    if(isFirst){
      firstPlayer["character"] = character;
      this.setState({firstPlayer});
    }
    else{
      secondPlayer["character"] = character;
      this.setState({secondPlayer});
    }
  }
  
  render(){
    let {squares, firstPlayer, secondPlayer, gameOver} = this.state;
    let grid = squares.map((square,i) =>{
      return(
        <Square key = {i.toString()} id = {i} firstPlayer = {firstPlayer.character} secondPlayer = {secondPlayer.character} val = {squares[i]} handleClick = {this.handleClick}  />)
    })
    return (
      <div className = "backgroundStuff">
        <h1>{firstPlayer.won ? "First Player Won!" : secondPlayer.won ? "Second Player Won!" : gameOver ? "Cat's Game!" : "Tic-Tac-Tizzle"}</h1>
        <Dropdown isFirst = {true} chooseCharacter = {this.chooseCharacter}/>
        <Dropdown isFirst = {false} chooseCharacter = {this.chooseCharacter}/>
        <button onClick = {this.resetGame}>Reset</button>
        <div className = "grid">
          {grid}
        </div>
      </div>
    );
  }
}

export default Board;

//.map(key = i functionName = {this.functionName})