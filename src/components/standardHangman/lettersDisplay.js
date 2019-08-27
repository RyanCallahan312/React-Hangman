/* eslint-disable no-useless-constructor */
import React from 'react';

export default class LettersDisplay extends React.Component {
	constructor(props) {
		super(props);
	}

	guessLetter(letter) {
		this.props.guessLetter(letter);
	}

	render() {
		const styles = {
			enabled: {
				padding: '.25em',
				display: 'inline',
				fontSize: 30,
				cursor: 'pointer',
				userSelect: 'none'
			},
			disabled: {
				padding: '.25em',
				display: 'inline',
				fontSize: 30,
				cursor: 'default',
				color: '#c7c7c7',
				userSelect: 'none'
			}
		};
		const letters = this.props.letters.map((letter, index) =>
			!this.props.lettersGuessed.includes(letter) &&
			this.props.win === null ? (
				<li
					key={index + letter}
					style={styles.enabled}
					onClick={() => {
						this.guessLetter(letter);
					}}
				>
					{letter}
				</li>
			) : (
				<li key={index + letter} style={styles.disabled}>
					{letter}
				</li>
			)
		);

		return (
			<div id="a-letter-display">
				<ul
					style={{
						listStyleType: 'none',
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					{letters}
				</ul>
			</div>
		);
	}
}
