import React, { Component } from "react";
import { Button } from "react-bootstrap";
import '../style/SquareStyle.css'

class Square extends Component  {
	handleUserSelection = (event) => {
		const { handleUserSelection } = this.props;
		handleUserSelection(event.target.value)
	}
	
	render(){
		const { value, who } = this.props;
    	return(
			<div>
				<Button
					variant='outline-secondary square'
					key={value} value={value}
					onClick={this.handleUserSelection}
				>
					{who}
				</Button>
			</div>
		)
	}
}

export default Square;