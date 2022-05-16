import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Score, scoreService } from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class ScoreCounter extends Component {

  scores: Score[] = [];

  render() {
    return(
      <>
      <Card title={'ScoreBoard'}>
        <Row>
          <Column><b>Spiller</b></Column>
          <Column><b>Poeng</b></Column>
          <Column></Column>
        </Row>
      { this.scores.map((score) => (
        <>
          <Row key={score.id}>
            <Column>{score.name}</Column>
            <Column>{score.score}</Column>
            <Column><Button.Success onClick={() => this.updateScore(score.id)}>+</Button.Success></Column>
          </Row>
          <br />
        </>
      ))}
      <Button.Light onClick={() => this.reset()}>Nullstill</Button.Light>
      </Card>
      </>
    )
  }

  updateScore(id: number) {
    scoreService.updateScore((this.scores.find((score) => (score.id === id))).score+1,id)
    .then(() => {this.mounted()})
    .catch((error) => {console.error(error)});
  }

  reset(){
    scoreService.resetScore()
    .then(() => {this.mounted()})
    .catch((error) => {console.error(error)});
  }

  mounted() {
    scoreService.getScores()
    .then((scores) => {this.scores = scores; this.forceUpdate()})
    .catch((error) => {console.error(error)});
  }
}

ReactDOM.render(
  <div>
    <Alert />
    <HashRouter>
      <div>
        <Route exact path="/" render={() => <ScoreCounter />} />
      </div>
    </HashRouter>
  </div>,
  document.getElementById('root')
);
