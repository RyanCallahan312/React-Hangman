/* eslint-disable no-useless-constructor */
import React from 'react';
import StandardHangman from '../standardHangman/hangman.js';
import PredictiveHangman from '../predictiveHangman/hangman.js';

export default class LettersDisplay extends React.Component{
  constructor(props){
      super(props)

      this.state = {
        gameMode: ''
      }

      this.changeGame = this.changeGame.bind(this);
  }

  changeGame(e){
    this.setState({
      gameMode: e
    })
  }

  render(){
      const buttons = <div>
        <button onClick={() => this.changeGame('standard')}>
        standard
        </button>
        <button onClick={() => this.changeGame('predicitve')}>
        predicitve
        </button>
      </div>
      return(
        <div>
          {buttons}
          {this.state.gameMode === 'standard' ? <StandardHangman/> : this.state.gameMode === 'predicitve' ? <PredictiveHangman/> : null}
        </div>
      );
  }
}
