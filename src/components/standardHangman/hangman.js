import React from 'react';
import LettersDisplay from './lettersDisplay.js';
import HangmanStatus from './hangmanStatus.js';
import WordDisplay from './wordDisplay.js';
import WordList from '../../constants/wordList.json';
import Alphabet from '../../constants/alphabet.json';

export default class Hangman extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentWord: WordList.wordList[
				Math.floor(Math.random() * WordList.wordList.length)
			].toUpperCase(),
			lettersGuessed: [],
			stage: 0,
			totalGuesses: 0,
			win: null
		};

		this.guessLetter = this.guessLetter.bind(this);
	}

	async guessLetter(letter) {
		if (this.state.win === null) {
			const didWin = () => {
				let word = this.state.currentWord.split('');
				return word.every(letter =>
					this.state.lettersGuessed.includes(letter)
				);
			};
			if (!this.state.currentWord.toUpperCase().includes(letter)) {
				await this.setState({
					stage: this.state.stage + 1,
					lettersGuessed: [...this.state.lettersGuessed, letter],
					totalGuesses: this.state.totalGuesses + 1
				});
			} else {
				await this.setState({
					lettersGuessed: [...this.state.lettersGuessed, letter],
					totalGuesses: this.state.totalGuesses + 1
				});
			}
			if (await didWin()) {
				this.setState({
					win: true
				});
			} else if (this.state.stage >= 6) {
				this.setState({
					win: false
				});
			}
		}
	}

	resetState() {
		this.setState({
			currentWord: WordList.wordList[
				Math.floor(Math.random() * WordList.wordList.length)
			].toUpperCase(),
			lettersGuessed: [],
			stage: 0,
			totalGuesses: 0,
			win: null
		});
	}

	render() {
		const styles = {
			winMessage: {
				textAlign: 'center'
			}
		};

		const playing = (
			<div id="a-hangman-container">
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<HangmanStatus stage={this.state.stage} />
				</div>
				<WordDisplay
					word={this.state.currentWord}
					lettersGuessed={this.state.lettersGuessed}
					win={this.state.win}
				/>
				<LettersDisplay
					letters={Alphabet.alphabet}
					guessLetter={this.guessLetter}
					lettersGuessed={this.state.lettersGuessed}
					win={this.state.win}
				/>
				<button onClick={() => this.resetState()}>Reset Game</button>
				{this.state.win === true ? (
					<h1 style={styles.winMessage}>Human Wins</h1>
				) : (
					this.state.win === false && (
						<h1 style={styles.winMessage}>Computer Wins</h1>
					)
				)}
			</div>
		);
		return playing;
	}
}
