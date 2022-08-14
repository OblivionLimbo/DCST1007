// Tar utgangspunkt i kildekode fra https://gitlab.com/ntnu-idri1005/react-typescript
// Jeg har programmert i separate filer for widgets, services og hovedkode, i tillegg til databasetilkobling, men har lagt widgets, services og index i samme index.tsx fil

import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
// import { Cart, Item, itemService, cartService } from './services';
// import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

// widgets - tatt direkte fra https://gitlab.com/ntnu-idri1005/react-typescript
import { ReactNode, ChangeEvent } from 'react';

/**
 * Renders an information card using Bootstrap classes.
 *
 * Properties: title
 */
class Card extends Component<{ title: ReactNode }> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

/**
 * Renders a row using Bootstrap classes.
 */
class Row extends Component {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

/**
 * Renders a column with specified width using Bootstrap classes.
 *
 * Properties: width, right
 */
class Column extends Component<{ width?: number; right?: boolean }> {
  render() {
    return (
      <div className={'col' + (this.props.width ? '-' + this.props.width : '')}>
        <div className={'float-' + (this.props.right ? 'end' : 'start')}>{this.props.children}</div>
      </div>
    );
  }
}

/**
 * Renders a success button using Bootstrap styles.
 *
 * Properties: onClick
 */
class ButtonSuccess extends Component<{ onClick: () => void }> {
  render() {
    return (
      <button type="button" className="btn btn-success" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a danger button using Bootstrap styles.
 *
 * Properties: onClick
 */
class ButtonDanger extends Component<{ onClick: () => void }> {
  render() {
    return (
      <button type="button" className="btn btn-danger" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a light button using Bootstrap styles.
 *
 * Properties: onClick
 */
class ButtonLight extends Component<{ onClick: () => void }> {
  render() {
    return (
      <button type="button" className="btn btn-light" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a button using Bootstrap styles.
 *
 * Properties: onClick
 */
class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
}

/**
 * Renders a NavBar link using Bootstrap styles.
 *
 * Properties: to
 */
class NavBarLink extends Component<{ to: string }> {
  render() {
    return (
      <NavLink className="nav-link" activeClassName="active" to={this.props.to}>
        {this.props.children}
      </NavLink>
    );
  }
}

/**
 * Renders a NavBar using Bootstrap classes.
 *
 * Properties: brand
 */
class NavBar extends Component<{ brand: ReactNode }> {
  static Link = NavBarLink;

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid justify-content-start">
          <NavLink className="navbar-brand" activeClassName="active" exact to="/">
            {this.props.brand}
          </NavLink>
          <div className="navbar-nav">{this.props.children}</div>
        </div>
      </nav>
    );
  }
}

/**
 * Renders a form label using Bootstrap styles.
 */
class FormLabel extends Component {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

/**
 * Renders a form input using Bootstrap styles.
 *
 * Properties: type, value, onChange, required, pattern
 */
class FormInput extends Component<{
  type: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  pattern?: string;
}> {
  render() {
    return (
      <input
        className="form-control"
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
        required={this.props.required}
        pattern={this.props.pattern}
      />
    );
  }
}

/**
 * Renders form components using Bootstrap styles.
 */
class Form {
  static Label = FormLabel;
  static Input = FormInput;
}

/**
 * Renders alert messages using Bootstrap classes.
 *
 * Students: this slightly more complex component is not part of curriculum.
 */
class Alert extends Component {
  alerts: { id: number; text: ReactNode; type: string }[] = [];
  nextId: number = 0;

  render() {
    return (
      <div>
        {this.alerts.map((alert, i) => (
          <div
            key={alert.id}
            className={'alert alert-dismissible alert-' + alert.type}
            role="alert"
          >
            {alert.text}
            <button
              type="button"
              className="btn-close btn-sm"
              onClick={() => this.alerts.splice(i, 1)}
            />
          </div>
        ))}
      </div>
    );
  }

  /**
   * Show success alert.
   */
  static success(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'success' });
    });
  }

  /**
   * Show info alert.
   */
  static info(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'info' });
    });
  }

  /**
   * Show warning alert.
   */
  static warning(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'warning' });
    });
  }

  /**
   * Show danger alert.
   */
  static danger(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'danger' });
    });
  }
}

// Services
import { pool } from './mysql-pool';
import { crashReporter } from 'electron';

class Item {
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  count: number = 0;
}

class Cart {
  id: number = 0;
  itemId: number = 0;
  itemCount: number = 0;
}

class Items {

  getItems(){
    return new Promise<Item[]>((resolve,reject ) => {
      pool.query('SELECT * FROM Items', (error,results) => {
        if (error) return reject(error);
        resolve(results);
      })
    })
  }

}

class Orders {

  addItem(itemId: number, itemCount: number){
    return new Promise<Cart>((resolve,reject ) => {
      pool.query('INSERT INTO Orders (itemId, itemCount) VALUES (?, ?)', [itemId,itemCount], (error,results) => {
        if (error) return reject(error);
        resolve(results);
      })
    });
  }

  removeItem(id: number){
    return new Promise<Cart[]>((resolve,reject ) => {
      pool.query('DELETE FROM Orders WHERE itemId=?', [id], (error,results) => {
        if (error) return reject(error);
        resolve(results);
      })
    })
  }

  getOrders(){
    return new Promise<Cart[]>((resolve,reject ) => {
      pool.query('SELECT * FROM Orders', (error,results) => {
        if (error) return reject(error);
        resolve(results);
      })
    })
  }

  emptyOrders() {
    return new Promise<Cart[]>((resolve,reject ) => {
      pool.query('DELETE FROM Orders', (error,results) => {
        if (error) return reject(error);
        resolve(results);
      })
    })
  }
}

let itemService = new Items();
let cartService = new Orders();

// Main code

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="StudAdm">
        <NavBar.Link to="/items">Items</NavBar.Link>
        <NavBar.Link to="/cart">Shopping Cart</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome to the shop">
      Check out our items and add them to your cart.
      <br />
      <Button.Light onClick={() => history.push('/items')}>Check out items</Button.Light>
    </Card>;
  }
} 

class ItemList extends Component {
  items: Item[] = [];
  orders: Cart[] = [];

  render() {
    return(
      <>
        <Card title="Items">
          <Row>
            <Column><b>Item</b></Column>
            <Column><b>Added/Available</b></Column>
            <Column></Column>
          </Row>
          {this.items.map((item => (
            <>
              <Row key={item.id}>
                <Column>
                  <Row>{item.name}</Row>
                  <Row><i>{item.description}</i></Row>
                </Column>
                <Column>
                {this.orders.filter(order => order.itemId === item.id).reduce((count, current) => count + current.itemCount, 0)}
                /
                {item.count}
                </Column>
                <Column><Button.Success onClick={() => this.add(item.id)}>Add to cart </Button.Success></Column>
              </Row>
            </>
          )))}
        </Card>
      </>
    )
  }

  add(itemId: number){
    cartService.addItem(itemId, 1)
    .then(() => {this.mounted()})
    .catch(err => console.error(err))
  }

  mounted(){
    cartService.getOrders()
    .then(orders => {this.orders = orders})
    .catch(err => console.error(err))

    itemService.getItems()
    .then(items => {this.items = items})
    .catch(err => console.error(err)) 
  }
}

class ShoppingCart extends Component {
  cart: Cart[] = [];
  items: Item[] = [];

  render() {
    return(
      <>
        <Card title="Shopping Cart">
          <Row>
            <Column><b>Name</b></Column>
            <Column><b>Price per item</b></Column>
            <Column><b>Count</b></Column>
            <Column><b>Sum</b></Column>
            <Column></Column>
          </Row>
          {this.items.map((item) => (
            <>
            { this.cart.filter(cart => cart.itemId === item.id).reduce((count, current) => count + current.itemCount, 0) > 0 &&
              <Row key={item.id}>
                <Column>{item.name}</Column>
                <Column>{item.price} kr</Column>
                <Column>{this.cart.filter(cart => cart.itemId === item.id).reduce((count, cart) => count + cart.itemCount, 0)}</Column>
                <Column>{this.cart.filter(cart => cart.itemId === item.id).reduce((count, cart) => count + cart.itemCount, 0) * item.price} kr </Column>
                <Column><Button.Light onClick={() => this.remove(item.id)}>Remove</Button.Light></Column>
              </Row>
            }
            </>
          ))}
          <Row>
            <Column><b>Sum</b></Column>
            <Column></Column>
            <Column></Column>
            <Column><b>{this.cart.reduce((count, cart) => count + this.items[cart.itemId-1].price, 0)} kr</b></Column>
            <Column></Column>
            {/* {console.log(this.cart.map((cart) => this.items[cart.itemId-1]))} */}
          </Row>
        </Card>
        <Button.Danger onClick={()=>this.empty()}>Empty Cart</Button.Danger>
      </>
    )
  }

  remove(id: number){
    cartService.removeItem(id)
    .then(() => {this.mounted()})
    .catch(err => console.error(err))
  }

  empty(){
    cartService.emptyOrders()
    .then(() => {this.mounted()})
    .catch(err => console.error(err))
  }

  mounted(){
    itemService.getItems()
    .then(items => {this.items = items})
    .catch(err => console.error(err))

    cartService.getOrders()
    .then(orders => {this.cart = orders})
    .catch(err => console.error(err))
  }
}


ReactDOM.render(
  <div>
    <Alert />
    <HashRouter>
      <div>
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/items" component={ItemList} />
        <Route exact path="/cart" component={ShoppingCart} />
      </div>
    </HashRouter>
  </div>,
  document.getElementById('root')
);