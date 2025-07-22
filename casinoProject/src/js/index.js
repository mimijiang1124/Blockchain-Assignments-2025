import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import '/css/index.css'; // Adjusted path

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastWinner: 0,
      timer: 0
    };
    this.web3 = null;
  }

  async componentDidMount() {
    // Initialize Web3
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error("MetaMask not detected!");
    }
  }

  voteNumber(number) {
    console.log(number);
  }

  render() {
    return (
      <div className="main-container">
        <h1>Bet for your best number and win huge amounts of Ether</h1>
        <div className="block">
          <h4>Timer:</h4> &nbsp;
          <span>{this.state.timer}</span>
        </div>
        <div className="block">
          <h4>Last winner:</h4> &nbsp;
          <span>{this.state.lastWinner}</span>
        </div>
        <hr />
        <h2>Vote for the next number</h2>
        <ul>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <li key={num} onClick={() => this.voteNumber(num)}>
              {num}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// Render with error boundary
ReactDOM.render(
  <App />,
  document.getElementById('root')
);