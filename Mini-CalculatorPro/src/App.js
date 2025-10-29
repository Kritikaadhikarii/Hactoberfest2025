import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [memory, setMemory] = useState(0);

  const handleButtonTapped = (value) => {
    try {
      if (value === '=') {
        setInput(evaluate(input).toString());
      } else if (value === 'C') {
        setInput("");
      } else if (value === '%') {
        setInput((evaluate(input) / 100).toString());
      } else if (value === 'M+') {
        setMemory(memory + evaluate(input));
        setInput(""); 
      } else if (value === 'M-') {
        setMemory(memory - evaluate(input));
        setInput("");
      } else {
        setInput(input + value);
      }
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="App">
      <h1 className="text-center">MiniCalculator Pro </h1>
      <div className="container flex flex-col items-center mx-auto m-w-20">
        <div className="innercontainer">
          <div className="row">
            <input 
              className="input" 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="row">
            <button className="button delete" onClick={() => handleButtonTapped('C')}>C</button>
            <button className="button operation" onClick={() => handleButtonTapped('%')}>%</button>
            <button className="button operation" onClick={() => handleButtonTapped('M+')}>M+</button>
            <button className="button operation" onClick={() => handleButtonTapped('M-')}>M-</button>
          </div>
          <div className="row">
            <button className="button nums" onClick={() => handleButtonTapped('7')}>7</button>
            <button className="button nums" onClick={() => handleButtonTapped('8')}>8</button>
            <button className="button nums" onClick={() => handleButtonTapped('9')}>9</button>
            <button className="button operation" onClick={() => handleButtonTapped('*')}>*</button>
          </div>
          <div className="row">
            <button className="button nums" onClick={() => handleButtonTapped('4')}>4</button>
            <button className="button nums" onClick={() => handleButtonTapped('5')}>5</button>
            <button className="button nums" onClick={() => handleButtonTapped('6')}>6</button>
            <button className="button operation" onClick={() => handleButtonTapped('/')}>/</button>
          </div>
          <div className="row">
            <button className="button nums" onClick={() => handleButtonTapped('1')}>1</button>
            <button className="button nums" onClick={() => handleButtonTapped('2')}>2</button>
            <button className="button nums" onClick={() => handleButtonTapped('3')}>3</button>
            <button className="button operation" onClick={() => handleButtonTapped('+')}>+</button>
          </div>
          <div className="row">
            <button className="button nums" onClick={() => handleButtonTapped('0')}>0</button>
            <button className="button nums" onClick={() => handleButtonTapped('.')}>.</button>
            <button className="button operation" onClick={() => handleButtonTapped('=')}>=</button>
            <button className="button operation" onClick={() => handleButtonTapped('-')}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;