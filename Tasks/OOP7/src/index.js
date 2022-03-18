import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';

class Menu extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="/" activeStyle={{ color: 'darkblue' }}>
          StudAdm
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/students" activeStyle={{ color: 'darkblue' }}>
          Students
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/program" activeStyle={{ color: 'darkblue' }}>
          Studyprogram
        </NavLink>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <div>Welcome to StudAdm</div>;
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <ul>
        {this.students.map((student) => (
          <li key={student.id}>
            <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    pool.query('SELECT id, name FROM Students', (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      this.students = results;
    });
  }
}

class StudentDetails extends Component {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <ul>
        <li>Name: {this.student.name}</li>
        <li>Email: {this.student.email}</li>
      </ul>
    );
  }

  mounted() {
    pool.query(
      'SELECT name, email FROM Students WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return

        this.student = results[0];
      }
    );
  }
}
class StudyProgramList extends Component {
  programs = [];

  render() {
    return (
      <ul>
        {this.programs.map((program) => (
          <li key={program.id}>
            <NavLink to={'/program/' + program.id}>{program.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    pool.query('SELECT id, name FROM StudyPrograms', (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return
      
      this.programs = results;
    });
  }
}
class StudyProgramDetails extends Component {
  program = null;

  render() {
    if (!this.program) return null;
    return (
      <ul>
        <li>Name: {this.program.name}</li>
        <li>Code: {this.program.code}</li>
      </ul>
    );
  }

  mounted() {
    pool.query('SELECT id, name, code FROM StudyPrograms WHERE id=?', 
    [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return
          console.log(results)
        this.program = results[0];
      }
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/program/" component={StudyProgramList} />
      <Route exact path="/program/:id" component={StudyProgramDetails} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
