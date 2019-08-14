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
			fontSize: 30
		};

		const word = this.props.word
			.toUpperCase()
			.replace(/[^a-zA-Z0-9-\s]/, '')
			.split('')
			.map((letter, index) =>
				this.props.lettersGuessed.includes(letter) ? (
					<li key={index + letter} style={liStyles}>
						{letter}
					</li>
				) : letter === ' ' ? (
					<li
						key={index + letter}
						style={{ ...liStyles, color: '#c7c7c7' }}
					>
                         
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
					justifyContent: 'center'
				}}
			>
				{word}
			</ul>
		);
	}
}
