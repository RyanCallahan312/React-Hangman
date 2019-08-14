import Alphabet from '../../constants/alphabet.json';

function guessRandomLetter(lettersRemaining) {
	let index = Math.floor(Math.random() * lettersRemaining.length);
	return lettersRemaining.splice(index, 1)[0];
}

function predictLetter(wordList, currentGuess) {
	return wordList[0].charAt(currentGuess.indexOf('_')).toUpperCase();
}

function cullWordList(wordList, letterGuessed, letterIndexes) {

	return wordList.filter(word => {
		word = word.toUpperCase();

		if (letterIndexes[0] !== -1) {
			var letterAtIndex = true;
			letterIndexes.forEach(index => {
				if (word[index] !== letterGuessed) {
					letterAtIndex = false;
				}
			});
			if (letterAtIndex === false) {
				return false;
			}
		} else if (
			letterIndexes[0] === -1 &&
			word.indexOf(letterGuessed) !== -1
		) {
			return false;
		}
		return true;
	});
}

function insertLetterIfCorrect(letterGuessed, currentGuess, letterIndexes) {
	if(letterIndexes[0] !== -1){
		letterIndexes.forEach((index) => {
			currentGuess.splice(index, 1, letterGuessed);
		});
	}
	return currentGuess;
}

function checkForLetterInWord(currentWord, letterGuessed) {
	var indexes = [];

	for (let i = 0; i < currentWord.length; i++) {
		if (currentWord.charAt(i).toUpperCase() === letterGuessed) {
			indexes.push(i);
		}
	}

	if (indexes.length === 0) {
		indexes.push(-1);
	}
	
	return indexes;
}

export default function updateCurrentGuess(
	wordList,
	currentWord,
	currentGuess,
	lettersGuessed
) {
	var letterGuessed;

	if (wordList && wordList.length > 0) {
		letterGuessed = predictLetter(wordList, currentGuess);
	} else {
		letterGuessed = guessRandomLetter(
			Alphabet.alphabet.filter(letter => !lettersGuessed.includes(letter))
		);
	}

	lettersGuessed.push(letterGuessed);

	var letterIndexes = checkForLetterInWord(currentWord, letterGuessed);

	wordList = cullWordList(wordList, letterGuessed, letterIndexes);

	currentGuess = insertLetterIfCorrect(
		letterGuessed,
		currentGuess,
		letterIndexes
	);

	return [currentGuess, wordList, lettersGuessed, letterIndexes[0] !== -1];
}
