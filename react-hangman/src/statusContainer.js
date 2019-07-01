import React from 'react'
import HangmanStatus from './hangmanStatus.js'

export default function status(currentStage){
    console.log(currentStage);
    return(
        <HangmanStatus
        stage={currentStage}
        />
    );
}