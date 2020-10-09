import React, { Component } from "react";
import { Alert, Row, Col, Button } from "react-bootstrap";
import "../style/GameStatusStyle.css";

class GameStatus extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userSelection: null,
		}
	}
	
	handleUserWantsToBeSelection = (event) => {
		const { handleUserWantsToBeSelection } = this.props;
		this.setState({ userSelection: event.target.value });
		handleUserWantsToBeSelection(event.target.value);
	}

	handlePlayAgainSelection = (event) => {
		const { handlePlayAgainSelection } = this.props;
		let playAgain = event.target.value == 1 ? true : false;
		handlePlayAgainSelection(playAgain);
	}

	renderUserSelection = () => {
		return (
			<div>
				<h4> Select one: </h4>
				<Button className='user-selection-btn' variant='secondary' value='X' onClick={this.handleUserWantsToBeSelection}> X </Button>
				<Button className='user-selection-btn' variant='secondary' value='O' onClick={this.handleUserWantsToBeSelection}> O </Button>	 
			</div>
		)			
	}

	renderWhoIsNext = () => {
		const  { whoIsNext } = this.props;
		const { userSelection } = this.state;
		let whoCanSelect = whoIsNext;

		if (!whoIsNext) {
			whoCanSelect = userSelection;
		}

		return (
			<Row>
				<Col>
					<h4> Next: </h4>
				</Col>
				<Col>
					{whoCanSelect}
				</Col>
			</Row>
		);
	}

	renderWinnerMessage = () => {
		const { winner } = this.props;
		return (
			<div>
				{winner == 'Tied' ? (
					<h4>{'Tied Game!'}</h4>
				):
					<h4>{winner + ' Wins!'}</h4>
				}
				{this.renderPlayAgain()}
			</div>
		)
	}

	renderExitGameMessage = () => {
		return (
			<div>
				<h4>Thanks for playing!</h4>
				<Button className='user-selection-btn' variant='secondary' value={1} onClick={this.handlePlayAgainSelection}>Play</Button>
			</div>
		)
	}

	renderPlayAgain = () => {
		return (
			<div>
				<h4> Play Again? </h4>
				<Button className='user-selection-btn' variant='secondary' value={1} onClick={this.handlePlayAgainSelection}>Yes</Button>
				<Button className='user-selection-btn' variant='secondary' value={0} onClick={this.handlePlayAgainSelection}> No </Button>	 
			</div>
		)
	}

	render() {
		const { whoIsNext, winner, exitGame } = this.props;
		const { userSelection } = this.state;
		let variant = 'dark';
		
		if (winner) {
			variant = 'primary';
		}

		if (exitGame) {
			return (
				<div className='gameStatusDiv'>
				<Alert variant={'dark'}>
					{this.renderExitGameMessage()}
				</Alert>
			</div>
			)
		}

		return (
			<div className='gameStatusDiv'>
				<Alert variant={variant}>
					{(userSelection && !winner) && ( 
						this.renderWhoIsNext()
					)}
					{!userSelection && (
						this.renderUserSelection()
					)}
					{winner && (
						this.renderWinnerMessage()
					)}
					{exitGame && (
						this.renderExitGameMessage()
					)}
				</Alert>
			</div>
		)
	}
}

export default GameStatus;