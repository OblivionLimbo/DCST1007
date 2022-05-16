import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { List, shoppingService } from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class ShoppingList extends Component {

  list: List[] = [];

  render() {
    return (
      <>
      <Card title={'Shopping List'}>
        <Row>
          <Column>Varenavn</Column>
          <Column>Antall</Column>
          <Column>Plukket opp</Column>
          { 
            <Column>Slett</Column>
          }
        </Row> 
        {
          this.list.map(list =>
            
              <Row key={list.id}>
                <Column>
                  {list.name}
                </Column>
                <Column>
                  {list.count}
                </Column>
                <Column>
                  {list.collected ? 'Ja' : <Button.Success onClick={() => this.collect(list.id)}>Plukk opp</Button.Success>}
                </Column>
                { list.collected ?
                  <Column>
                    <Button.Danger onClick={() => this.delete(list.id)}>X</Button.Danger>
                  </Column> : <Column></Column>
                }
              </Row>
          )
          }
          </Card>
          <br />
          <NewItem />
      </>
    );
  }

  delete(id: number) {
    shoppingService.deleteItem(id)
    .then(() => history.go(0));
  }

  collect(id: number) {
    shoppingService.collectItem(id)
    .then(() => history.go(0));
  }

  mounted() {
    shoppingService.getList().then(list => this.list = list);
  }
}

class NewItem extends Component {
  list = new List();

  render() {
    return (
      <>
        <Card title={'Legg til ny vare'}>
              <Form.Label>Navn:</Form.Label>
              <Form.Input type="text" value={this.list.name} onChange={(e) => this.list.name = e.target.value} />
              <Form.Label>Antall:</Form.Label>
              <Form.Input type="number" value={this.list.count} onChange={(e) => this.list.count = parseInt(e.target.value)} />
              <br />
            <Button.Success onClick={() => this.add(this.list)}>Legg til</Button.Success>
        </Card>
      </>
    );
  }

  add(x: List) {
    shoppingService.addItem(x).then(() => {
      history.go(0);
    });
  }
}

ReactDOM.render(
  <div>
    <Alert />
    <HashRouter>
      <div>
        <Route exact path="/" component={ShoppingList} />
      </div>
    </HashRouter>
  </div>,
  document.getElementById('root')
);
