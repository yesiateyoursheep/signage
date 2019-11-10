import React from 'react';
import './App.css';

function App() {
  return (
    <>
      <div id='pagination'>
        <span className='one active'></span>
        <span className='two'></span>
        <span className='three'></span>
        <span className='four'></span>
        <span className='five'></span>
        <span className='six'></span>
        <span className='seven'></span>
      </div>
      <div className='page one'></div>
      <div className='page two'></div>
      <div className='page three'></div>
      <div className='page four'></div>
      <div className='page five'></div>
      <div className='page six'></div>
      <div className='page seven'></div>
    </>
  );
}

export default App;
