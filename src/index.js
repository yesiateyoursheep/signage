import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';

const pagenames={
	1:'one',
	2:'two',
	3:'three',
	4:'four',
	5:'five',
	6:'six',
	7:'seven'
}
const pages={
	1:<One/>,
	2:<Two/>,
	3:<Three/>,
	4:<Four/>,
	5:<Five/>,
	6:<Six/>,
	7:<Seven/>
}

var currentPage = 'one';

class Time extends React.Component{
	constructor() {
		super()
		this.state={
			hour:new Date().getHours(),
			min:new Date().getMinutes(),
			sec:new Date().getSeconds()
		}
	}

	componentDidMount(){
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



function TypeRenderer(props){
	console.log(props);
	if(props.type === "image" || props.type === "gif"){
		return(
			<img src={props.url} alt="meme"/>
		)
	}
	if(props.type === "video" || props.type === "webm" || props.type === "audio"){
		return(
			<video muted autoPlay>
				<source src={props.url}/>
			</video>
		);
	}
	if(props.type === "text"){
		return(props.url);
	}
	if(props.type === "url"){
		return(
			<iframe frameBorder="None" url={props.url} title={props.url}/>
		)
	}
	return(
		"Unknown type!"
	);
}

class LatestMemes extends React.Component{
	constructor(){
		super();
		this.state = {
			memes: [],
			loading: true,
			page: 0,
			error: 0
		}
	}

	componentDidMount(){
		fetch("http://localhost:8080/meme/latest")
		.then(response => response.json())
		.then(data => {this.setState({memes: data, loading: false}); })
		.catch(error => this.setState({error, loading: false}));
	}

	Memes(props){
		if(props.memes.length>0){
			let result = []
			props.memes.map(meme => {
				result.push(
					<div key={meme.Id}>
						<article className={"meme "+meme.Type}>
							<TypeRenderer type={meme.Type} url={meme.Url}/>
						</article>
						<hr/>
					</div>
				);
				return null;
			});
			return result;
		}else{
			return null;
		}
	}

	render(){
		return(
			<section className="meme-panel panel">
				<h3 className="title">Latest Memes</h3>
				<hr/>
				{this.state.error ? <p>{this.state.error.message}</p> : null}
				{this.state.loading ? <span className="loading"/> : null}
				{!(this.state.loading||this.state.error) ? <this.Memes memes={this.state.memes}/> : null}
			</section>
		);
	}
}

function One() {
	return (
		<div>
			<span className="name"></span>
			<Time/>
			<LatestMemes/>
		</div>
	);
}
function Two() {
	return (
		<div>
			<span className="name"></span>
			<Time/>
		</div>
	);
}
function Three() {
	return (
		<div>
			<span className="name"></span>
			<LatestMemes/>
		</div>
	);
}
function Four(){
	return(
		<div>
			<span className="name"></span>
			<AnalogClock/>
			<Time/>
		</div>
	);
}
function Five(){
	return(
		<div>
			<span className="name"></span>
		</div>
	);
}
function Six(){
	return(
		<div>
			<span className="name"></span>
		</div>
	);
}
function Seven(){
	return(
		<div>
			<span className="name"></span>
		</div>
	);
}

function scrollToPage(pagename,behavior="smooth"){
	if(['one','two','three','four','five','six','seven'].indexOf(pagename)>=0){
		document.querySelector("#pagination>.active").classList.remove('active');
		document.querySelector("#pagination>."+pagename).classList.add('active');
		window.scroll({
			left:document.querySelector(".page."+pagename).getBoundingClientRect().left - document.body.getBoundingClientRect().left,
			behavior:"smooth"
		});
		currentPage = pagename;
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
for(var i=1;i<=5;i++){
	ReactDOM.render(pages[i], document.querySelector('.page.'+pagenames[i]))
}

scrollToPage('one');
let pageslideshow = true;
setInterval(function(){
	if(pageslideshow){
		var n = ['one','two','three','four','five','six','seven'].indexOf(currentPage)+1;
		if(n > 6) n = 0;
		scrollToPage(['one','two','three','four','five','six','seven'][n]);
	}else{
		pageslideshow = true;
	}
},15000);

document.querySelectorAll("#pagination>span").forEach(function(e){
	e.addEventListener('click',function(){
		scrollToPage(this.classList[0]);
		pageslideshow = false;
	});
});
window.addEventListener('resize',function(){scrollToPage(currentPage,"")});

let moved = new Date();
document.addEventListener("mousemove",function(){
	moved = new Date();
	document.getElementById('pagination').classList.remove('idle');
});
setInterval(function() {
	if(moved < new Date().getTime()-5000){
		document.getElementById('pagination').classList.add('idle');
	}
},1000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
