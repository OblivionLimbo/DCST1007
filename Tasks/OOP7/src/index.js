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
      <div>
      <p>Name: {this.student.name}</p>
      <p>Email: {this.student.email}</p>
      <h3>Study Program:</h3>
      <ul>
        <NavLink to={'/program/' + this.student.studyProgramId}>{this.student.studyProgramName}</NavLink>
      </ul>
    </div>
  );
  }

  mounted() {
    pool.query(
      'SELECT name, email, studyProgramId FROM Students WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return

        this.student = results[0];


        pool.query('SELECT name FROM StudyPrograms WHERE id=?',
            [this.student.studyProgramId],
            (error, results) => {
              if (error) return console.error(error); // If error, show error in console (in red text) and return
            this.student.studyProgramName = results[0].name;
        });
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
  students = [];

  render() {
    if (!this.program) return null;
    return (
      <div>
        <p>Tittel: {this.program.name}</p>
        <p>Kode: {this.program.code}</p>
        <h3>Studenter:</h3>
        <ul>
          {this.students.map((student) => (
            <li key={student.id}>
              <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  mounted() {
    pool.query('SELECT id, name, code FROM StudyPrograms WHERE id=?', 
    [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return

        this.program = results[0];
      }
    );
    pool.query('SELECT id, name FROM Students WHERE studyProgramId=?', 
    [this.props.match.params.id],
    (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return
      this.students = results;
  });
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