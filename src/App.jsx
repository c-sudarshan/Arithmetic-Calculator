import { useState } from 'react';
import { NODE_URL } from './data';
import { callAPI } from './callapi';
import './App.css';

function App() {

  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState(null);


  // Addition - POST
  const handleAdd = () => {

    if (!value1 || !value2) {
      alert("Please enter both numbers");
      return;
    }

    const payload = {
      value1: value1,
      value2: value2
    };

    const url = `${NODE_URL}/add`;

    callAPI("POST", url, payload, (res) => {

      if (res.status === "success") {
        setResult(res.result);
      }

    });
  };


  // Subtraction - GET
  const handleSubtract = () => {

    if (!value1 || !value2) {
      alert("Please enter both numbers");
      return;
    }

    const url =
      `${NODE_URL}/subtract/${value1}/${value2}`;

    callAPI("GET", url, null, (res) => {

      if (res.status === "success") {
        setResult(res.result);
      }

    });
  };


  return (
    <main className="calculator-page">
      <section className="calculator-card">
        <h1>Arithmetic Calculator</h1>
        <p className="subtitle">Enter two numbers and choose an operation.</p>

        <div className="input-group">
          <label htmlFor="value1">Value 1</label>
          <input
            id="value1"
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="value2">Value 2</label>
          <input
            id="value2"
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
        </div>

        <div className="button-row">
          <button className="operation-button add-button" onClick={handleAdd}>
            Add
          </button>
          <button className="operation-button subtract-button" onClick={handleSubtract}>
            Subtract
          </button>
        </div>

        <div className="result-box" aria-live="polite">
          <span>Result</span>
          <strong>{result !== null ? result : 'N/A'}</strong>
        </div>
      </section>
    </main>
  );
}

export default App;