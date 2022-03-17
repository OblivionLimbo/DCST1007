import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Routes, Route } from 'react-router-dom';
// Comment to do shit
class Menu extends Component {
  render() {
    return (
      <div className='mother'>
        <NavLink activeStyle={{ color: 'green'}} to="/cv" className={("child")} >Min CV</NavLink>
        <NavLink to="/education" className={("child")}>Utdanning</NavLink>
        <NavLink to="/work" className={("child")}>Arbeidserfaring</NavLink>
        <NavLink to="/interests" className={("child")}>Interesser</NavLink>
      </div>
    );
  }
}

class CV extends Component {
  render() {
    return <div className='info'>CV</div>;
  }
}

class Education extends Component {
  render() {
    return <div className='info'>Utdanning</div>;
  }
}

class Work extends Component {
  render() {
    return <div className='info'>Arbeidserfaring</div>;
  }
}

class Interests extends Component {
  render() {
    return <div className='info'>Interesser</div>;
  }
}

ReactDOM.render(
  <link rel="stylesheet" href="../src/index.css"></link>,
  document.getElementById('root')
)

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Routes>
        <Route path="/cv" element={<CV />} />
        <Route path="/education" element={<Education />} />
        <Route path="/work" element={<Work />} />
        <Route path="/interests" element={<Interests />} />
      </Routes>
    </div>
    <link rel='stylesheet' href='../src/index.css'></link>
  </HashRouter>,
  document.getElementById('root')
);
