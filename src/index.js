import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//var mysql = require('mysql');

class Time extends React.Component{
	constructor() {
		super()
		this.state={
			hour:new Date().getHours(),
			min:new Date().getMinutes(),
			sec:new Date().getSeconds()
		}

		setInterval(()=>{
			this.setState({
				hour:new Date().getHours(),
				min:new Date().getMinutes(),
				sec:new Date().getSeconds()
			})
		},1000)
	}

	padleft(i){
		if(i.toString().length===1) return '0'+i.toString();
		return i;
	}

	render(){
		return(
			<div className="time">
				<span className="hour">{this.padleft(this.state.hour)}</span>
				<span className="min">:{this.padleft(this.state.min)}</span>
				<span className="sec">.{this.padleft(this.state.sec)}</span>
			</div>
		)
	}
}

function One() {
	return (
		<div>
			Page 1
			<Time/>
		</div>
	);
}
function Two() {
	return (
		<div>Page 2
		<Time/></div>
	);
}
function Three() {
	return (
		<div>Page 3</div>
	);
}
function Four(){
	return(
		<div>Page 4</div>
	);
}
function Five(){
	return(
		<div>Page 5</div>
	);
}
function Six(){
	return(
		<div>Page 6</div>
	);
}
function Seven(){
	return(
		<div>Page 7</div>
	);
}

let pagenames={
	1:'one',
	2:'two',
	3:'three',
	4:'four',
	5:'five',
	6:'six',
	7:'seven'
}
let pages={
	1:<One/>,
	2:<Two/>,
	3:<Three/>,
	4:<Four/>,
	5:<Five/>,
	6:<Six/>,
	7:<Seven/>
}

ReactDOM.render(<App />, document.getElementById('root'));
for(var i=1;i<=5;i++){
	ReactDOM.render(pages[i], document.querySelector('.page.'+pagenames[i]))
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
