import React, { Component } from 'react';
import './App.css';

const buttonsConfig = [
  { displayValue: 'X', scoreValue: 10, color: '#FFFF00' },
  { displayValue: '10', scoreValue: 10, color: '#FFFF00' },
  { displayValue: '9', scoreValue: 9, color: '#FFFF00' },
  { displayValue: '8', scoreValue: 8, color: '#FF0000' },
  { displayValue: '7', scoreValue: 7, color: '#FF0000' },
  { displayValue: '6', scoreValue: 6, color: '#0000FF' },
  { displayValue: '5', scoreValue: 5, color: '#0000FF' },
  { displayValue: '4', scoreValue: 4, color: '#000000' },
  { displayValue: '3', scoreValue: 3, color: '#000000' },
  { displayValue: '2', scoreValue: 2, color: '#FFFFFF' },
  { displayValue: '1', scoreValue: 1, color: '#FFFFFF' },
  { displayValue: 'M', scoreValue: 0, color: '#808080' },
];

//https://24ways.org/2010/calculating-color-contrast/
const getContrastingColor = (color) => {
  if (!color) {
    return 'black';
  }

  let hexColor = color.substr(1, color.length);
  let r = parseInt(hexColor.substr(0, 2), 16);
  let g = parseInt(hexColor.substr(2, 2), 16);
  let b = parseInt(hexColor.substr(4, 2), 16);
  let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoredValues: []
    };

    this.handleScoreClicked = this.handleScoreClicked.bind(this);
    this.handleClearButtonClicked = this.handleClearButtonClicked.bind(this);
    this.handleBackButtonClicked = this.handleBackButtonClicked.bind(this);
    this.getSum = this.getSum.bind(this);
    this.isLastIndex = this.isLastIndex.bind(this);
  }

  handleScoreClicked(valueToAdd) {
    let newScoredValues = this.state.scoredValues.slice(0);
    newScoredValues.push(valueToAdd);
    this.setState({ scoredValues: newScoredValues });
  }

  handleClearButtonClicked() {
    this.setState({ scoredValues: [] });
  }

  handleBackButtonClicked() {
    let newScoredValues = this.state.scoredValues.slice(0);
    newScoredValues.pop();
    this.setState({ scoredValues: newScoredValues });
  }

  getSum() {
    let sum = 0;
    this.state.scoredValues.forEach(x => sum += x.scoreValue);
    return sum;
  }

  isLastIndex(indexValue){
    return this.state.scoredValues.length === indexValue+1;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-scored-values-box">
            <div className="App-header-scored-values">
              {this.state.scoredValues.map((x, index) => {
                return <span key={index}><span>{x.displayValue} </span>
                  {!this.isLastIndex(index) && <span>+ </span>}
                </span>
              })}
            </div>
            <div className="App-header-scored-values_sum">
              {this.state.scoredValues && this.state.scoredValues.length > 0 && <span> = </span>}
              <span>{this.getSum()}</span>
            </div>
          </div>

          <div className="App-header-action-buttons">
            <ActionButton handleOnClicked={this.handleBackButtonClicked} displayValue={'Back'} color={'#D3D3D3'} />
            <ActionButton handleOnClicked={this.handleClearButtonClicked} displayValue={'Clear'} color={'#D3D3D3'} />
          </div>
        </header>
        <div className="App-buttons">
          {buttonsConfig.map((b, index) => <ScoreButton key={index} {...b} handleScoreClicked={this.handleScoreClicked} />)}
        </div>
      </div>
    );
  }
}

const ActionButton = (props) => {
  const { handleOnClicked, displayValue, color } = props;
  const contrastingColor = getContrastingColor(color);
  return (<div className="App-action-button App-div-button" onClick={() => handleOnClicked && handleOnClicked(props)} style={{ backgroundColor: color, color: contrastingColor }}><span>{displayValue}</span></div>);
}

const ScoreButton = (props) => {
  const { handleScoreClicked, displayValue, color } = props;
  const contrastingColor = getContrastingColor(color);
  return (<div className="App-score-button App-div-button" onClick={() => handleScoreClicked && handleScoreClicked(props)} style={{ backgroundColor: color, color: contrastingColor }}><span>{displayValue}</span></div>);
}

export default App;
