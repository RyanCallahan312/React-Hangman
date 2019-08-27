/* eslint-disable no-useless-constructor */
import React from 'react';

export default class LettersDisplay extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const liStyles = {
			padding: '.25em',
			display: 'inline',
			fontSize: 30,
			userSelect: 'none'
		};
		const letters = this.props.letters.map((letter, index) =>
			!this.props.lettersGuessed.includes(letter) ? (
				<li key={index + letter} style={liStyles}>
					{letter}
				</li>
			) : (
				<li
					key={index + letter}
					style={{ ...liStyles, color: '#c7c7c7' }}
				>
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
						justifyContent: 'center',
					}}
				>
					{letters}
				</ul>
			</div>
		);
	}
}
