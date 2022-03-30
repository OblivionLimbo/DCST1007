import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService, studyProgramService } from './services';
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
      <div>
      <ul>
        {this.students.map((student) => (
          <li key={student.id}>
            <NavLink to={'/students/' + student.id}>{student.name}</NavLink>            
          </li>
        ))}
      </ul>
      <NavLink to="/students/create"><button>New Student</button></NavLink>
      </div>
    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
}

class StudentDetails extends Component {
  student = null;
  studentDetails = null;

  render() {
    if (!this.student) return null; 
    if(!this.studentDetails) return null;

    return (
      <>
      <p>Name: {this.student.name}</p>
      <p>Email: {this.student.email}</p>
      <h3>Study Program:</h3>
      <ul>
        <NavLink to={'/program/' + this.student.studyProgramId}>{this.studentDetails.name}</NavLink>
      </ul>
      <NavLink to={'/students/' + this.student.id + '/edit'}>
        <button>
          Edit User
        </button>
      </NavLink>
    </>
  );
  }
  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
    this.student = student;
    });
    studentService.getStudentDetails(this.props.match.params.id, (studentDetails) => {
    this.studentDetails = studentDetails;
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
        <button onClick={this.delete}>Delete</button>
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

  delete(){
    studentService.deleteStudent(this.student.id, () => {
      history.push('/students');
    });
  }
}

// Create new student
class StudentCreate extends Component {

  studyPrograms = [];

  student = {
    name: '',
    email: '',
    studyProgramId: 1
  };

  render() {
    return (
        <div>
        <h1>Create new student</h1>
        <form>
          <label>Name:</label>
          <input
            type="text"
            value={this.student.name}
            onChange={(event) => (this.student.name = event.target.value)} />
          <br />
          <label>Email:</label>
          <input
            type="text"
            value={this.student.email}
            onChange={(event) => (this.student.email = event.target.value)} />
          <br />
          <label>Study Program:</label>
          <select value={this.student.studyProgramId} onChange={(event) => (this.student.studyProgramId = event.target.value)}>
            {this.studyPrograms.map((studyProgram) => (
              <option key={studyProgram.id} value={studyProgram.id}>
                {studyProgram.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={this.save}>
            Save
          </button>
        </form>
      </div>
    );
  }
  save() {
    studentService.createStudent(this.student, () => {
      history.push('/students');
    });
  }
  mounted() {
    studyProgramService.getStudyPrograms((studyPrograms) => {
      this.studyPrograms = studyPrograms;
    });
  }
}

  
  class StudyProgramList extends Component {
  studyPrograms = [];

  render() {
    return (
      <div>
      <ul>
        {this.studyPrograms.map((studyProgram) => (
          <li key={studyProgram.id}>
            <NavLink to={'/program/' + studyProgram.id}>{studyProgram.name}</NavLink>
          </li>
        ))}
      </ul>
      <NavLink to={'/program/create'}>
      <button>
        Create new study program
      </button>
    </NavLink>
    </div>
    );
  }

  mounted() {
    studyProgramService.getStudyPrograms((studyPrograms) => {
      this.studyPrograms = studyPrograms;
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
        <NavLink to={'/program/' + this.program.id + '/edit'}>
          <button>
            Edit Program
          </button>
        </NavLink>
      </div>
    );
  }

  mounted() {
    studyProgramService.getStudyProgram(this.props.match.params.id, (studyProgram) => {
      this.program = studyProgram;
    });
    studyProgramService.getStudyProgramDetails(this.props.match.params.id, (students) => {
      this.students = students;
    });
  }
}
class updateStudyProgram extends Component {
  studyProgram = null;

  render() {
    if (!this.studyProgram) return null;

    return (
      <div>
        Name:{' '}
        <input
          type="text"
          value={this.studyProgram.name}
          onChange={(event) => (this.studyProgram.name = event.currentTarget.value)}
        />
        <input
          type="text"
          value={this.studyProgram.code}
          onChange={(event) => (this.studyProgram.code = event.currentTarget.value)}
        />
        <button type="button" onClick={this.save}>
          Save
        </button>
        <button onClick={this.delete}>Delete Program</button>
      </div>
    );
  }

  mounted() {
    studyProgramService.getStudyProgram(this.props.match.params.id, (studyProgram) => {
      this.studyProgram = studyProgram;
    });
  }

  save() {
    studyProgramService.updateStudyProgram(this.studyProgram, () => {
      history.push('/program');
    });
  }

  delete(){
    studyProgramService.deleteStudyProgram(this.studyProgram.id, () => {
      history.push('/program');
    });
  }
}

// create study program
class CreateStudyProgram extends Component {

  studyProgram = {
    name: '',
    code: ''
  };

  render(){
    return (
      <div>
        <h1>Create new study program</h1>
        <form>
          <label>Name:</label>
          <input
            type="text"
            value={this.studyProgram.name}
            onChange={(event) => (this.studyProgram.name = event.currentTarget.value)} />
          <label>Code:</label>
          <input
            type="text"
            value={this.studyProgram.code}
            onChange={(event) => (this.studyProgram.code = event.currentTarget.value)} />
          <button type="button" onClick={this.save}>
            Save
          </button>
        </form>
      </div>
    );
  }
  save() {
    studyProgramService.createStudyProgram(this.studyProgram, () => {
      history.push('/program');
    });
  }
}

ReactDOM.render(
  <HashRouter>
    <Menu />
    <Route exact path="/" component={Home} />
    <Route exact path="/students" component={StudentList} />
    <Route exact path="/students/:id" component={StudentDetails} />
    <Route exact path="/students/:id/edit" component={StudentEdit} />
    <Route exact path="/students/create" component={StudentCreate} />
    <Route exact path="/program" component={StudyProgramList} />
    <Route exact path="/program/:id" component={StudyProgramDetails} />
    <Route exact path="/program/:id/edit" component={updateStudyProgram} />
    <Route exact path="/program/create" component={CreateStudyProgram} />
  </HashRouter>,
  document.getElementById('root')
);
