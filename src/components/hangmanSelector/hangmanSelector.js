/* eslint-disable no-useless-constructor */
import React from 'react';
import StandardHangman from '../standardHangman/hangman.js';
import PredictiveHangman from '../predictiveHangman/hangman.js';

export default class hangmanSelector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			gameMode: 'standard'
		};

		this.changeGame = this.changeGame.bind(this);
	}

	changeGame(gameMode) {
		this.setState({
			gameMode: gameMode
		});
	}

	render() {
		const styles = {
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
			},
			selected: {
				background: 'rgba(147, 204, 255, 1)'
			}
		};
		const buttons = (
			<div style={{ textAlign: 'center' }}>
				<button
					style={
						this.state.gameMode === 'standard'
							? { ...styles.button, ...styles.selected }
							: styles.button
					}
					onClick={() => this.changeGame('standard')}
				>
					Standard
				</button>
				<button
					style={
						this.state.gameMode === 'predicitve'
							? { ...styles.button, ...styles.selected }
							: styles.button
					}
					onClick={() => this.changeGame('predicitve')}
				>
					Predicitve
				</button>
			</div>
		);
		return (
			<div style={{margin: '2% 0px 0px 0px', width:'100vw'}}>
				{buttons}
				{this.state.gameMode === 'standard' ? (
					<StandardHangman />
				) : this.state.gameMode === 'predicitve' ? (
					<PredictiveHangman />
				) : null}
			</div>
		);
	}
}
