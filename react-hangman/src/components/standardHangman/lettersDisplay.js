/* eslint-disable no-useless-constructor */
import React from 'react';

export default class LettersDisplay extends React.Component{
    constructor(props){
        super(props)
    }

    guessLetter(letter){
        this.props.guessLetter(letter);
    }

    render(){

        const liStyles = {
            padding:'.25em',
            display:'inline',
            fontSize:30,
            cursor:'pointer'
        }
        const letters = this.props.letters.map((letter, index) => (!this.props.lettersGuessed.includes(letter)
        ? (<li key={index+letter} style={liStyles} onClick={() => {this.guessLetter(letter)}}>{letter}</li>) 
        : (<li key={index+letter} style={{...liStyles,  color:'#c7c7c7'}}>{letter}</li>)));

        return(
            <div id='a-letter-display'>
                <ul style={{listStyleType:'none',display:'flex', justifyContent:'center'}}>
                    {letters}
                </ul>
            </div>
        );
    }
}