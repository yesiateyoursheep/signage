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
		if(this.state.hour>12) this.setState({hour:this.state.hour-12});

		setInterval(()=>{
			this.setState({
				hour:new Date().getHours(),
				min:new Date().getMinutes(),
				sec:new Date().getSeconds()
			})
			if(this.state.hour>12) this.setState({hour:this.state.hour-12});
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

class AnalogClock extends Time{
	render(){
		return(
			<article className="clock">
				<div className="hour" style={{transform:"rotate("+(this.state.hour/12*360).toString()+"deg)"}}>
				</div>
				<div className="minute" style={{transform:"rotate("+(this.state.min/60*360).toString()+"deg)"}}>
				</div>
				<div className="second" style={{transform:"rotate("+(this.state.sec/60*360).toString()+"deg)"}}>
				</div>
			</article>
		)
	}
}

function One() {
	return (
		<div>
			<span className="name">Summary</span>
			<Time/>
		</div>
	);
}
function Two() {
	return (
		<div>
			<span className="name">Weather</span>
			<Time/>
		</div>
	);
}
function Three() {
	return (
		<div>
			<span className="name">MemeDB</span>
		</div>
	);
}
function Four(){
	return(
		<div>
			<span className="name">Clock</span>
			<AnalogClock/>
			<Time/>
		</div>
	);
}
function Five(){
	return(
		<div>
			<span className="name">User1</span>
		</div>
	);
}
function Six(){
	return(
		<div>
			<span className="name">User2</span>
		</div>
	);
}
function Seven(){
	return(
		<div>
			<span className="name">User3</span>
		</div>
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
