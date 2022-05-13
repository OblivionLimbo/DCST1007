import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Show, showService } from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a show

class ShowList extends Component {
  shows: Show[] = [];

  render() {
    return (
      <>
      <Card title="Barne-TV Programmer">
      {this.shows.map((show) => (
            <Card title={show.title}>
              <div>{show.title}</div>
            </Card>
          ))}
      </Card>
      </>
    );
  }

  mounted() {
    showService.getShows((shows) => {
      this.shows = shows;
    });
  }
}

// class StudentDetails extends Component<{ match: { params: { id: string } } }> {
//   student = new Student();

//   render() {
//     return (
//       <div>
//         <Card title="Student details">
//           <Row>
//             <Column width={2}>Name:</Column>
//             <Column>{this.student.name}</Column>
//           </Row>
//           <Row>
//             <Column width={2}>Email:</Column>
//             <Column>{this.student.email}</Column>
//           </Row>
//         </Card>
//         <Button.Light onClick={this.edit}>Edit</Button.Light>
//       </div>
//     );
//   }

//   mounted() {
//     studentService.getStudent(Number(this.props.match.params.id), (student) => {
//       this.student = student;
//     });
//   }

//   edit() {
//     history.push('/students/' + this.student.id + '/edit');
//   }
// }

// class StudentEdit extends Component<{ match: { params: { id: string } } }> {
//   student = new Student();

//   render() {
//     return (
//       <div>
//         <Card title="Edit student">
//           <Form.Label>Name:</Form.Label>
//           <Form.Input
//             type="text"
//             value={this.student.name}
//             onChange={(event) => (this.student.name = event.currentTarget.value)}
//           />
//           <Form.Label>Email:</Form.Label>
//           <Form.Input
//             type="text"
//             value={this.student.email}
//             onChange={(event) => (this.student.email = event.currentTarget.value)}
//           />
//         </Card>
//         <Row>
//           <Column>
//             <Button.Success onClick={this.save}>Save</Button.Success>
//           </Column>
//           <Column right>
//             <Button.Light onClick={this.cancel}>Cancel</Button.Light>
//           </Column>
//         </Row>
//       </div>
//     );
//   }

//   mounted() {
//     studentService.getStudent(Number(this.props.match.params.id), (student) => {
//       this.student = student;
//     });
//   }

//   save() {
//     studentService.updateStudent(this.student, () => {
//       history.push('/students/' + this.props.match.params.id);
//     });
//   }

//   cancel() {
//     history.push('/students/' + this.props.match.params.id);
//   }
// }

ReactDOM.render(
  <div>
    <Alert />
    <HashRouter>
      <div>
        <Route exact path="/" component={ShowList} />
      </div>
    </HashRouter>
  </div>,
  document.getElementById('root')
);
