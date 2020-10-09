import React, { Component } from "react";
import TicTacToeBoard from './components/TicTacToeBoard';
import Header from './components/Header';
import Footer from './components/Footer';
import "./style/TicTacToeBoardStyle.css";

class App extends Component {
	render() {
		return (
			<div className='board'>
				<Header/>
				<TicTacToeBoard/>
				<Footer/>
			</div>
		)
	}
}

export default App;