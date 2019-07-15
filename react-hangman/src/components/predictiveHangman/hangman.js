import React from 'react';
import HangmanStatus from './hangmanStatus.js';
import WordDisplay from './wordDisplay.js';
import WordList from '../../constants/wordList.json';
import LettersDisplay from './lettersDisplay.js';
import PredictLetter from './predictLetter.js'; 

export default class Hangman extends React.Component{
    constructor(props){
        super(props)
        let word = prompt('Enter a word')
        this.state={
            currentWord: word,
            lettersGuessed: [],
            stage: 0,
            totalGuesses: 0,
            currentGuess: word.replace(/[^a-zA-Z0-9-\s]/, '').replace(/[^a-zA-Z0-9]/, '_').split('')
        };

    }

    guessLetters(resolve,reject){

        while(this.state < 6){

            var letter = PredictLetter.guessLetter();

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
            if(this.state.currentGuess === this.state.currentWord.split('')){
                resolve('win')
            }
        }
        reject('loss');
    }


    render(){

        const startGuessing = new Promise(() => this.guessLetters())

        const playing = <div id='a-hangman-container'>
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
                    lettersGuessed={this.state.lettersGuessed}
                    />
                    <button onClick={() => {startGuessing.then(console.log('done'))}}>Start guessing</button>
            </div>;
        return(
            <div>
            {playing}
            </div>
        );
    }
}