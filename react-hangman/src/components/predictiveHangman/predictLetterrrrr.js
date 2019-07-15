var wordList;

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}

function removeFromArray(element, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == element) {
            return array.splice(i, 1);
        }
    }
}

function dumbGuessLetter(letters) {
    var index = Math.floor(Math.random() * letters.length);
    return letters.splice(index, 1);
}

function smartGuessLetter(letters, words, computerWord) {
    if (words.length < 1) {
        return dumbGuessLetter(letters);
    } else {
        var guessIndex = -1;
        for (var i = 0; i < computerWord.length; i++) {
            if (computerWord[i] == "_") {
                guessIndex = i;
                break;
            }
        }
        removeFromArray(words[0].charAt(guessIndex).toUpperCase(), letters)
        return words[0].charAt(guessIndex).toUpperCase()

    }
}

function getWord() {
    return prompt("enter your word");
}

function checkDone(word, computerWord) {
    for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) != computerWord[i]) {
            return false;
        }
    }
    return true;
}

function makeComputerWord(word) {
    var computerWord = [];
    for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) == " ") {
            computerWord.push(" ");
        } else {
            computerWord.push("_");
        }
    }
    return computerWord
}

function checkLetter(letter, word) {
    word = word.toUpperCase();
    for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) == letter) {
            return true;
        }
    }
    return false;
}

function cullListLetterFound(letter, words, letterIndex) {
    var wordsIndex = 0;

    while (wordsIndex < words.length) {
        if (words[wordsIndex].charAt(letterIndex).toUpperCase() != letter) {
            words.splice(wordsIndex, 1);
        } else {
            wordsIndex++;
        }
    }
}

function cullListLetterNotFound(letter, words) {
    var index = 0;
    var removed = false;

    while (index < words.length) {

        for (var i = 0; i < words[index].length; i++) {

            if (words[index].charAt(i).toUpperCase() == letter) {
                words.splice(index, 1)
                removed = true;
                break;
            }
        }
        if (removed == true) {
            removed = false;

        } else {
            index++;
        }
    }
}

function cullListByLength(length, words) {
    var index = 0;

    while (index < words.length) {

        if (words[index].length != length) {
            words.splice(index, 1);

        } else {
            index++;
        }
    }
}

function updateComputerWord(letter, computerWord, word, words) {

    for (var i = 0; i < word.length; i++) {

        if (word.charAt(i).toUpperCase() == letter) {
            computerWord[i] = word.charAt(i);
            cullListLetterFound(letter, words, i);
        }
    }
    return computerWord;
}

export default async function getLetter(letters, words) {

    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var words = wordList.slice(0).split("\n");
    var word = getWord();
    var computerWord = makeComputerWord(word);
    var guessedLetter = "";
    var hangmanStage = 0;

    cullListByLength(word.length, words);

    while (checkDone(word, computerWord) == false) {

        guessedLetter = smartGuessLetter(letters, words, computerWord);

        if (checkLetter(guessedLetter, word) == true) {
            computerWord = updateComputerWord(guessedLetter, computerWord, word, words);

        } else {
            cullListLetterNotFound(guessedLetter, words);
            if (hangmanStage == 6) {
                break;
            } else {
                console.log(guessedLetter)
            }

        }
}
}

wordList = loadFile("/20kWordList.txt");