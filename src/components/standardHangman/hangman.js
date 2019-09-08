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
				textAlign: 'center',
				userSelect: 'none'
			},
			button: {
				margin: 5,
				minHeight: '20px',
				minWidth: '100px',
				height: '3vh',
				width: '10vw',
				background: 'rgba(246, 246, 246, 1)',
				border: '1px solid black',
				outline: 'none',
				boxShadow:
					'0px 1px 2px 1px rgba(0,0,0,0.2), 0px 1px 4px 2px rgba(0,0,0,0.15)',
				cursor: 'pointer',
				fontWeight: 800,
				fontFamily: 'Open Sans',
				color: 'rgba(0, 138, 250, 1)',
				userSelect: 'none'
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
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<button
						onClick={() => this.resetState()}
						style={styles.button}
					>
						Reset Game
					</button>
				</div>
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
