import React, { useState, useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [local, setLocal] = useState('');

  useEffect(() => {
    fetch("/api")
      .then((response) => response.text())
      .then((response) => setLocal(response))
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {local}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
