import React from 'react';
import LettersDisplay from './lettersDisplay.js'
import HangmanStatus from './hangmanStatus.js'
import WordDisplay from './wordDisplay.js'
import WordList from './wordList.json'

export default class Hangman extends React.Component{
    constructor(props){
        super(props)
        console.log(WordList);
        this.state={
            currentWord: WordList.wordList[Math.floor(Math.random()*WordList.wordList.length)],
            lettersGuessed: [],
            stage: 0,
            totalGuesses: 0
        };

        this.guessLetter = this.guessLetter.bind(this);
    }

    guessLetter(letter){
        console.log(letter)
        if(!this.state.currentWord.toUpperCase().includes(letter)){
            this.setState({
                stage: this.state.stage + 1,
                lettersGuessed: [...this.state.lettersGuessed, letter],
                totalGuesses: this.state.totalGuesses + 1
            })
        }else{
            this.setState({
                lettersGuessed: [...this.state.lettersGuessed, letter],
                totalGuesses: this.state.totalGuesses + 1
            })
        }
    }


    render(){
        return(
            <div id='a-hangman-container'>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <HangmanStatus
                    stage={this.state.stage}
                    />
                </div>
                <WordDisplay
                word={this.state.currentWord}
                lettersGuessed={this.state.lettersGuessed}
                />
                <LettersDisplay
                letters={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y','Z']}
                guessLetter={this.guessLetter}
                lettersGuessed={this.state.lettersGuessed}
                />
            </div>
        );
    }
}