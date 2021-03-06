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

		const word = this.props.word
			.toUpperCase()
			.replace(/[^a-zA-Z0-9-\s]/, '')
			.split('')
			.map((letter, index) =>
				this.props.lettersGuessed.includes(letter) ||
				this.props.win !== null ? (
					<li key={index + letter} style={liStyles}>
						{letter}
					</li>
				) : (
					<li
						key={index + letter}
						style={{ ...liStyles, color: '#c7c7c7' }}
					>
						_
					</li>
				)
			);

		return (
			<ul
				style={{
					listStyleType: 'none',
					display: 'flex',
					justifyContent: 'center',
					width: '100%',
					height: 'auto',
					flexWrap: 'wrap',
					padding: '0'
				}}
			>
				{word}
			</ul>
		);
	}
}
