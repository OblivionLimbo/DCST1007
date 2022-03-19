import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService } from './services';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

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
            <NavLink to={'/students/' + student.id + '/edit'}>{student.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
}

class StudentEdit extends Component {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        Name:{' '}
        <input
          type="text"
          value={this.student.name}
          onChange={(event) => (this.student.name = event.currentTarget.value)}
        />
        Email:{' '}
        <input
          type="text"
          value={this.student.email}
          onChange={(event) => (this.student.email = event.currentTarget.value)}
        />
        <button type="button" onClick={this.save}>
          Save
        </button>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students');
    });
  }
}

ReactDOM.render(
  <HashRouter>
    <Menu />
    <Route exact path="/" component={Home} />
    <Route exact path="/students" component={StudentList} />
    <Route path="/students/:id/edit" component={StudentEdit} />
  </HashRouter>,
  document.getElementById('root')
);
