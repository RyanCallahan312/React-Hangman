import React from 'react';
import HangmanStatus from './hangmanStatus.js';
import WordDisplay from './wordDisplay.js';
import InitalWordList from '../../Constants/wordList.json';
import Alphabet from '../../Constants/alphabet.json';
import LettersDisplay from './lettersDisplay.js';
import PredictLetter from './predictLetter.js';

export default class Hangman extends React.Component {
	constructor(props) {
		super(props);
		let word = prompt('Enter a word');
		if (word) {
			word.toUpperCase();
		} else {
			word = '';
		}
		this.state = {
			currentWord: word,
			lettersGuessed: [],
			stage: 0,
			totalGuesses: 0,
			guessing: false,
			reset: false,
			win: null
		};

		this.guessLetters = this.guessLetters.bind(this);
	}

	async guessLetters() {
		var currentWordList = InitalWordList.wordList.filter(
			word => word.length === this.state.currentWord.length
		);

		var currentGuess = this.state.currentWord
			.replace(/[\s]/gi, ' ')
			.replace(/[a-zA-Z]/gi, '_')
			.split('');

		var lettersGuessed = this.state.lettersGuessed;

		var incorrectGuesses = 0;

		var correctGuess;

		const guessLetter = () => {
			return PredictLetter(
				currentWordList,
				this.state.currentWord,
				currentGuess,
				lettersGuessed
			);
		};

		const sleep = ms => {
			return new Promise(resolve => setTimeout(resolve, ms));
		};

		while (incorrectGuesses < 7 && currentGuess.indexOf('_') !== -1) {
			await sleep(Math.floor(Math.random() * (1200 - 200) + 200)).then(
				([
					currentGuess,
					currentWordList,
					lettersGuessed,
					correctGuess
				] = guessLetter())
			);
			this.setState({
				lettersGuessed: lettersGuessed,
				stage: correctGuess ? this.state.stage : this.state.stage + 1
			});
			!correctGuess && incorrectGuesses++;
		}
		if (incorrectGuesses < 7) {
			this.setState({
				win: false
			});
		} else {
			this.setState({
				win: true
			});
		}
	}

	resetState() {
		let word = prompt('Enter a word');
		if (word) {
			word.toUpperCase();
		} else {
			word = '';
		}
		this.setState({
			currentWord: word.toUpperCase(),
			lettersGuessed: [],
			stage: 0,
			totalGuesses: 0,
			guessing: false,
			reset: false,
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
				/>
				<LettersDisplay
					letters={Alphabet.alphabet}
					lettersGuessed={this.state.lettersGuessed}
				/>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<button
						style={styles.button}
						onClick={
							this.state.reset
								? () => this.resetState()
								: async () => {
										this.setState({ guessing: true });
										await this.guessLetters();
										this.setState({ reset: true });
								  }
						}
						disabled={
							this.state.reset ? false : this.state.guessing
						}
					>
						{this.state.reset
							? 'Reset Game'
							: this.state.guessing
							? 'Currently Guessing'
							: 'Start Guessing'}
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
