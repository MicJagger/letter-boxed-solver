import './App.css';
import logo from './logo.svg';
import React from 'react';
import wasm from './wasm'

function wasmTest(): bigint {
  const a = BigInt(5);
  const b = BigInt(8);
  return wasm.add(a, b);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {wasmTest()}
      </header>
    </div>
  );
}

export default App;
