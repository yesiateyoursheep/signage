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
	if(props.type === "video" || props.type === "webm"){
		return(
			<video muted autoPlay loop>
				<source src={props.url}/>
			</video>
		);
	}
	if(props.type === "audio"){
		return(
			<video controls>
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

// TODO: Add edit button in meme

// TODO: Add edit form, which is a QR code.
// eg http://chart.googleapis.com/chart?cht=qr&chs=512x512&chl=https://meme.yiays.com/meme/edit/1001&chld=L|1

class Weather extends React.Component{
	constructor(){
		super();
		this.state = {
			hourly: {}, // hourly is a little misleading, it's actually once every 3 hours
			loading: true,
			error: false
		}
	}

	componentDidMount(){
		fetch("https://api.openweathermap.org/data/2.5/forecast?q=Nelson,nz&appid=71e65618a80b5c3d419b2ac804582791")
		.then(response => response.json())
		.then(data => {this.setState({hourly: data.list.slice(0,10), loading: false}); })
		.catch(error => this.setState({error, loading: false}));
	}

	WeatherCard(props){
		if(props.hourly.length>0){
			var result = [];
			props.hourly.map(weather => {
				result.push(
					<div key={weather.dt} className="card" style={{'left':'calc( '+((weather.dt-new Date().getTime()/1000)/600).toString()+'vw - 15vh )'}}>
						<span className="hour">{formatDate(new Date(weather.dt*1000),"dddd, htt")}</span>
						<span className="temp">{Math.round(weather.main.temp-273.15).toString()+"°C ("+(weather.main.humidity).toString()+"%)"}</span>
						<span className="desc">{weather.weather[0].description}</span>
						<img src={"/svg/Weather/"+weather.weather[0].main+".svg"} alt={weather.weather[0].description}/>
					</div>
				)
				return null;
			});
			return result;
		}else{
			return null;
		}
	}

	render(){
		return(
			<section className="weather">
				<this.WeatherCard hourly={this.state.hourly}/>
			</section>
		);
	}
}

// TODO: Add notification module.

// TODO: Add memedb changes module

//  Pages

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
			<Weather/>
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

function formatDate(date, format, utc) {
	var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	function ii(i, len) {
			var s = i + "";
			len = len || 2;
			while (s.length < len) s = "0" + s;
			return s;
	}

	var y = utc ? date.getUTCFullYear() : date.getFullYear();
	format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
	format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
	format = format.replace(/(^|[^\\])y/g, "$1" + y);

	var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
	format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
	format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
	format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
	format = format.replace(/(^|[^\\])M/g, "$1" + M);

	var d = utc ? date.getUTCDate() : date.getDate();
	format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
	format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
	format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
	format = format.replace(/(^|[^\\])d/g, "$1" + d);

	var H = utc ? date.getUTCHours() : date.getHours();
	format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
	format = format.replace(/(^|[^\\])H/g, "$1" + H);

	var h = H > 12 ? H - 12 : H === 0 ? 12 : H;
	format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
	format = format.replace(/(^|[^\\])h/g, "$1" + h);

	var m = utc ? date.getUTCMinutes() : date.getMinutes();
	format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
	format = format.replace(/(^|[^\\])m/g, "$1" + m);

	var s = utc ? date.getUTCSeconds() : date.getSeconds();
	format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
	format = format.replace(/(^|[^\\])s/g, "$1" + s);

	var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
	format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
	f = Math.round(f / 10);
	format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
	f = Math.round(f / 10);
	format = format.replace(/(^|[^\\])f/g, "$1" + f);

	var T = H < 12 ? "AM" : "PM";
	format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
	format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

	var t = T.toLowerCase();
	format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
	format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

	var tz = -date.getTimezoneOffset();
	var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
	if (!utc) {
			tz = Math.abs(tz);
			var tzHrs = Math.floor(tz / 60);
			var tzMin = tz % 60;
			K += ii(tzHrs) + ":" + ii(tzMin);
	}
	format = format.replace(/(^|[^\\])K/g, "$1" + K);

	var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
	format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
	format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

	format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
	format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

	format = format.replace(/\\(.)/g, "$1");

	return format;
};