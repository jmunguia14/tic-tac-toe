import React, { Component } from "react";
import Square from "./Square";
import GameStatus from "./GameStatus";
import { Row } from "react-bootstrap"
import "../style/SquareStyle.css";

class TicTacToeBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			whoIsNext: '',
			machineLetter: '',
			userLetter: '',
			winner:null,
			board: [
				['', '', ''],
				['', '', ''],
				['', '', ''],
			]
		}
	}

	updateBoardStatus = (who, position) => {
		if (!who || !position) {
			return;
		}

		const { board, userLetter, maxNumberOfRounds, winner, machineLetter } = this.state;
		let newBoardState = board;
		let row = Number(position[0]);
		let column = Number(position[2]);
		newBoardState[row][column] = who;
		let isThereWinner = this.checkWinner(who, [...newBoardState]);
		let availablePositions = this.getBoardEmptyPositions().length;
	
		this.setState({ board: [...newBoardState] });

		if (availablePositions == 0 && !isThereWinner) {
			this.setWinner('Tied');
		}

		if (who == userLetter && !isThereWinner) {
			this.setWhoIsNext(machineLetter);
			this.handleMachineSelection();
		}

		if (who == machineLetter && !isThereWinner) {
			this.setWhoIsNext(userLetter);
		}
	}

	handleMachineSelection = () => {
		const { machineLetter, board, winner } = this.state;
		let boardEmptyPositions = this.getBoardEmptyPositions();
		let maxRamdom = boardEmptyPositions.length;
		let randomNumber = Math.floor(Math.random() * Math.floor(maxRamdom));
		let machineSelection = boardEmptyPositions[randomNumber];
		let milliSeconds = 1000;
		
		setTimeout(() => { this.updateBoardStatus(machineLetter, machineSelection) }, milliSeconds);
	}
	
	handleUserWantsToBeSelection = (selection) => {
		let machineLetter = 'X'; 

		if (selection == 'X') {
			machineLetter = 'O';
		}

		this.setState({ userLetter: selection });
		this.setMachineLetter(machineLetter);
	}

	setMachineLetter = (letter) => {
		this.setState({machineLetter: letter});
	}

	setWhoIsNext = (who) => {
		this.setState({ whoIsNext: who});
	}

	handleUserSelection = (squarePosition) => {
		const { userLetter } = this.state;
		
		if (userLetter == '') {
			alert('Please select a letter.');
			return;
		}
		
		this.updateBoardStatus(userLetter, squarePosition);
	}

	handlePlayAgainSelection = (playAgain) => {
		if (playAgain) {
			this.resetBoard();
			this.setWinner('');
			this.setWhoIsNext('');
			this.resetGameStatus();
			this.setState({exitGame: false})
		} else {
			this.setState({exitGame: true})
		}
	}

	resetGameStatus = () => {
		if (this.refs.GameStatusChild && typeof this.refs.GameStatusChild.startNewGame == 'function') {
			this.refs.GameStatusChild.startNewGame();
		}
	}

	getBoardEmptyPositions = () => {
		const { board, machineLetter } = this.state;
		let emptyPositions = [];

		board.forEach((row, rowIndex) => {
			row.forEach((column, columnIndex) => {
				let boardPosition = board[rowIndex][columnIndex];

				if (boardPosition == '' && boardPosition != machineLetter) {
					let rowPosition = rowIndex.toString();
					let columnPosition = columnIndex.toString();
					emptyPositions.push(rowPosition + ',' + columnPosition);
				}
			});
		});

		return emptyPositions;
	}

	setWinner = (who) => {
		this.setState({ winner: who });
	}

	resetBoard = () => {
		const { board } = this.state;
		let newBoard =  [
				['', '', ''],
				['', '', ''],
				['', '', ''],
			];

		this.setState({ board: newBoard });
	}

	checkWinner = (letter, board) => {
		let winsVertically = this.checkVerticalSquares(letter, board);
		let winsHorizontally = this.checkHorizontalSquares(letter, board);
		let winsDiagonally = this.checkDiagonalSquares(letter, board);

		if (winsVertically || winsHorizontally || winsDiagonally) {
			return true;
		}

		return false;
	}

	checkVerticalSquares = (letter, board) => {
		let checks = ['0,0', '1,0', '2,0', '0,1', '1,1', '2,1', '0,2', '1,2', '2,2'];
		let countToWin = 0;
		let neededCountToWin = 3;

		for (let position = 0; position < checks.length; position++) {
			let square = checks[position];
			let row = Number(square[0]);
			let column = Number(square[2]);
			let startSecondVertical = 3;
			let startLastVertical = 6;

			if (position == startSecondVertical || position == startLastVertical) {
				countToWin = 0;
			}
			
			if (board[row][column] == letter) {
				countToWin += 1;
			}

			if (countToWin == neededCountToWin) {
				this.setWinner(letter);
				return true;
			}
		}

		return false;
	} 

	checkHorizontalSquares = (letter, board) => {
		let checks = ['0,0', '0,1', '0,2', '1,0', '1,1', '1,2', '2,0', '2,1', '2,2'];
		let countToWin = 0;
		let neededCountToWin = 3;

		for (let position = 0; position < checks.length; position++) {
			let square = checks[position];
			let row = Number(square[0]);
			let column = Number(square[2]);
			let startSecondRow = 3;
			let startLastRow = 6;

			if (position== startSecondRow || position == startLastRow) {
				countToWin = 0;
			}
			
			if (board[row][column] == letter) {
				countToWin += 1;
			}

			if (countToWin == neededCountToWin) {
				this.setWinner(letter);
				return true;
			}
		}

		return false;
	}

	checkDiagonalSquares = (letter, board) => {
		let checks = ['0,0', '1,1', '2,2', '0,2', '1,1', '2,0'];
		let countToWin = 0;
		let neededCountToWin = 3;
		
		for (let position = 0; position < checks.length; position++) {
			let square = checks[position];
			let row = Number(square[0]);
			let column = Number(square[2]);
			let startLastVertical = 3;

			if (position == startLastVertical) {
				countToWin = 0;
			}

			if (board[row][column] == letter) {
				countToWin += 1;
			}

			if (countToWin == neededCountToWin) {
				this.setWinner(letter);
				return true;
			}
		}

		return false;
	} 

	render() {
		const { board, whoIsNext, winner, userLetter,exitGame } = this.state;

		return(
			<div className='squares-board'>
				<Row>
					<Square  value={'0,0'} who={board[0][0]} handleUserSelection={this.handleUserSelection} />
					<Square  value={'0,1'} who={board[0][1]} handleUserSelection={this.handleUserSelection} />
					<Square  value={'0,2'} who={board[0][2]} handleUserSelection={this.handleUserSelection} />	
				</Row>
				<Row>
					<Square value={'1,0'} who={board[1][0]} handleUserSelection={this.handleUserSelection} />
					<Square value={'1,1'} who={board[1][1]} handleUserSelection={this.handleUserSelection} />
					<Square value={'1,2'} who={board[1][2]} handleUserSelection={this.handleUserSelection} />	
				</Row>
				<Row>
					<Square value={'2,0'} who={board[2][0]} handleUserSelection={this.handleUserSelection} />
					<Square value={'2,1'} who={board[2][1]} handleUserSelection={this.handleUserSelection} />
					<Square value={'2,2'} who={board[2][2]} handleUserSelection={this.handleUserSelection} />	
				</Row>			
				<GameStatus
					ref={'GameStatusChild'}
					whoIsNext={whoIsNext}
					winner={winner}
					handleUserWantsToBeSelection={this.handleUserWantsToBeSelection}
					handlePlayAgainSelection={this.handlePlayAgainSelection}
					exitGame={exitGame}
				/>	
			</div>
		)
	}
}

export default TicTacToeBoard;