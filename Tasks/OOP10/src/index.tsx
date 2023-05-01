import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Student, studentService, Group, groupService } from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="StudAdm">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/groups">Groups</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Welcome to StudAdm</Card>;
  }
}

class StudentList extends Component {
  students: Student[] = [];

  render() {
    return (
      <>
      <Card title="Students">
        {this.students.map((student) => (
          <Row key={student.id}>
            <Column>
              <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
            </Column>
          </Row>
        ))}
      </Card>
      <Button.Success onClick={() => history.push('/students/create')}>New Student</Button.Success>
     </>
    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
}

class StudentDetails extends Component<{ match: { params: { id: string } } }> {
  student = new Student();
  groupName: string = '';

  render() {
    return (
      <>
        <Card title="Student details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.student.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Email:</Column>
            <Column>{this.student.email}</Column>
          </Row>
          <Row>
            <Column width={2}>Group:</Column>
            <Column><NavLink to={'/groups/' + this.student.groupId}>{this.groupName}</NavLink></Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </>
    );
  }

  mounted() {
    studentService.getStudent(Number(this.props.match.params.id), (student) => {
      this.student = student;
      studentService.getGroup(student.groupId, (group) => {
        this.groupName = group;
      });
    });
  }

  edit() {
    history.push('/students/' + this.student.id + '/edit');
  }
}

class StudentEdit extends Component<{ match: { params: { id: string } } }> {
  student = new Student();
  groups: Group[] = [];

  render() {
    return (
      <>
        <Card title="Edit student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.name}
            onChange={(event) => (this.student.name = event.currentTarget.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.email}
            onChange={(event) => (this.student.email = event.currentTarget.value)}
          />
          <Form.Label>Group:</Form.Label>
          <br />
            <select value={this.student.groupId} onChange={(event) => (this.student.groupId = parseInt(event.currentTarget.value))}>
              {this.groups.map((group) => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          <br/>
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
          <Column>
            <Button.Danger onClick={this.delete}>Delete</Button.Danger>
          </Column>
        </Row>
      </>
    );
  }

  mounted() {
    studentService.getStudent(Number(this.props.match.params.id), (student) => {
      this.student = student;
    });
    groupService.getGroups((groups) => {
      this.groups = groups;
    });
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students/' + this.props.match.params.id);
    });
  }

  delete() {
    studentService.deleteStudent(this.student.id, () => {
      history.push('/students');
    });
  }

  cancel() {
    history.push('/students/' + this.props.match.params.id);
  }
}

class CreateStudent extends Component {
  student = new Student();
  groups: Group[] = [];

  render() {
    return (
      <>
        <Card title="Create student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.name}
            onChange={(event) => (this.student.name = event.currentTarget.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.email}
            onChange={(event) => (this.student.email = event.currentTarget.value)}
          />
          <Form.Label>Group:</Form.Label>
          <br />
            <select value={this.student.groupId} onChange={(event) => (this.student.groupId = parseInt(event.currentTarget.value))}>
              {this.groups.map((groups) => (
                <option key={groups.id} value={groups.id}>
                  {groups.name}
                </option>
              ))}
            </select>
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </>
    );
  }

  save() {
    studentService.createStudent(this.student, () => {
      history.push('/students');
    });
  }

  cancel() {
    history.push('/students');
  }

  mounted() {
    groupService.getGroups((groups) => {
      this.groups = groups;
    });
  } 
}

class GroupList extends Component <{ match: { params: { id: string } } }> {
  groups: Group[] = [];

  render() {
    return (
      <>
      <Card title="Groups">
        {this.groups.map((group) => (
          <Row key={group.id}>
            <Column>
              <NavLink to={'/groups/' + group.id}>{group.name}</NavLink>
            </Column>
          </Row>
        ))}
      </Card>
      {/* <Button.Success onClick={() => history.push('/group/create')}>Create New Group</Button.Success> */}
     </>
    );
  }

  mounted() {
    groupService.getGroups((groups) => {
      this.groups = groups;
    });
  }
}

class GroupDetails extends Component <{ match: { params: { id: string } } }> {
  group = new Group();
  members: Student[] = [];
  leader: any = [];
  
  render() {
    if (!this.group) return null;

    return (
      <div>
        <Card title="Group details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.group.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Description:</Column>
            <Column>{this.group.description}</Column>
          </Row>
          <Row>
            <Column width={2}>Leader:</Column>
            <Column><NavLink to={'/students/' + this.group.leaderId} style={{textDecoration:'none'}}>{this.leader.name}</NavLink></Column>
          </Row>
          <br></br>
          <Row>
            <Column width={2}>Group Image:</Column>
            <Column><img src={this.group.groupImage}></img></Column>
          </Row>
          <br />
          <Row>
            <Column width={2}><b>Members:</b></Column>
            {this.members.map((member) => (
              <Row key={member.id}>
                <Column>
                  <NavLink to={'/students/' + member.id}>{member.name}</NavLink>
                </Column>
              </Row>
            ))}
          </Row> 
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }
  mounted() {
    groupService.getGroup(Number(this.props.match.params.id), (group) => {
      this.group = group;
      groupService.getMembers(group.id, (students) => {
        this.members = students;
      });
      groupService.getLeader(this.group.leaderId, (leader) => {
        this.leader = leader;
      });
    });
  }

  edit() {
    history.push('/groups/' + this.group.id + '/edit');
  }
}

class GroupEdit extends Component<{ match: { params: { id: number } } }> {
  
  group = new Group();
  members: Student[] = [];

  render() {
    if (!this.group) return null;

    return (
      <div>
        <Card title="Update Group">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.name}
            onChange={(event) => (this.group.name = event.currentTarget.value)}/>
          <Form.Label>Leader:</Form.Label>
          <br></br>
            <select value={this.group.leaderId} onChange={(event) => (this.group.leaderId = parseInt(event.currentTarget.value))}>
              {this.members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          <br></br>
          <Form.Label>Description:</Form.Label>
          <Form.Input 
          type="text" 
          value={this.group.description} 
          onChange={(event) => (this.group.description = event.currentTarget.value)} />
          <Form.Label>Group Image</Form.Label>
          <Form.Input 
          type="text" 
          value={this.group.groupImage} 
          onChange={(event) => (this.group.groupImage = event.currentTarget.value)} />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column>
            <Button.Danger onClick={this.delete}>
              Delete
            </Button.Danger>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    groupService.getGroup(this.props.match.params.id, (group) => {
      this.group = group;
      groupService.getMembers(this.props.match.params.id, (members) => {
        this.members = members;
      });
    });
  }

  save() {
    groupService.updateGroup(this.group, () => {
      history.push('/groups/' + this.props.match.params.id);
    });
  }
  delete() {
    groupService.deleteGroup(this.group.id, () => {
      history.push('/groups');
    });
  }

  cancel() {
    history.push('/groups/' + this.props.match.params.id);
  }
}

// class CreateGroup extends Component {
//   group = new Group();

//   render() {
//     return (
//       <div>
//         <Card title="Create group">
//           <Form.Label>Name:</Form.Label>
//           <Form.Input
//             type="text"
//             value={this.group.name}
//             onChange={(event) => (this.group.name = event.currentTarget.value)}
//           />
//           <Form.Label>Leader</Form.Label>

//           <Form.Label>Description</Form.Label>

//           <Form.Label>Image</Form.Label>
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
  
//   save() {
//     groupService.createGroup(this.group, () => {
//       history.push('/groups');
//     });
//   }

//   cancel() {
//     history.push('/groups');
//   }
// }


ReactDOM.render(
  <div>
    <Alert />
    <HashRouter>
      <div>
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/students" component={StudentList} />
        <Route exact path="/students/:id" component={StudentDetails} />
        <Route exact path="/students/:id/edit" component={StudentEdit} />
        <Route exact path="/students/create" component={CreateStudent} />
        <Route exact path="/groups" component={GroupList} />
        <Route exact path="/groups/:id" component={GroupDetails} />
        <Route exact path="/groups/:id/edit" component={GroupEdit} />
        {/* <Route exact path="/groups/create" component={CreateGroup} /> */}
      </div>
    </HashRouter>
  </div>,
  document.getElementById('root')
);