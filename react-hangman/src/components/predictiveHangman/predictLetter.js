function guessRandomLetter(lettersRemaining){
    let index = Math.floor(Math.random() * lettersRemaining.length);
    return lettersRemaining.splice(index, 1);
}

function guessPredictedLetter(wordList){
    
}

export default function getLetter(wordList, lettersRemaining, currentGuess){
    return(guessRandomLetter(lettersRemaining));
    // if(wordList.length === 0){
    //     return(guessRandomLetter(lettersRemaining));
    // }else{
    //     return(guessPredictedLetter(wordList, currentGuess))
    // }
}