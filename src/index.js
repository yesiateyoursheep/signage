import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import One from './page1';
import Two from './page2';
import Three from './page3';
import Four from './page4';
import Five from './page5';
import Six from './page6';
import Seven from './page7';
import * as serviceWorker from './serviceWorker';

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
