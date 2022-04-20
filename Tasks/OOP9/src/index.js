import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { groupService, studentService } from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="StudAdm">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/group">Group</NavBar.Link>
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
  students = [];

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
      <Button.Success onClick={this.create}>New Student</Button.Success>
      </>
    );
  }
  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
  create() {
    history.push('/students/create');
  }
}

class StudentDetails extends Component {
  student = null;
  group = null;
  
  render() {
    if (!this.student) return null;
    if(!this.group) return null;

    return (
      <div>
        <Card title="Student details">
          <Row>
            <Column width={4}>Name:</Column>
            <Column>{this.student.name}</Column>
          </Row>
          <Row>
            <Column width={4}>Email:</Column>
            <Column>{this.student.email}</Column>
          </Row>
          <Row>
            <Column width={4}>Group:</Column>
         <Column><NavLink to={'/group/' + this.student.groupId}>{this.group.name}</NavLink></Column>
       </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
      studentService.getGroup(this.student.groupId, (group) => {
        this.group = group;
      });
    });
  }

  edit() {
    history.push('/students/' + this.student.id + '/edit');
  }
}

class StudentEdit extends Component {
  student = null;

  groups = [];

  render() {
    if (!this.student) return null;

    return (
      <div>
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
            <select value={this.student.groupId} onChange={(event) => (this.student.groupId = event.currentTarget.value)}>
              {this.groups.map((groups) => (
                <option key={groups.id} value={groups.id}>
                  {groups.name}
                </option>
              ))}
            </select>
          <br />
        </Card>
        <Row>
          <Column left>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column center>
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
    studentService.getStudent(this.props.match.params.id, (student) => {
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

class createStudent extends Component {
  student = {
    name: '',
    email: '',
    groupId: 1
  };
  groups = [];

  render() {
    return (
      <div>
        <Card title="Create student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.name}
            onChange={(event) => (this.student.name = event.currentTarget.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="email"
            value={this.student.email}
            onChange={(event) => (this.student.email = event.currentTarget.value)}
          />
          <Form.Label>Group</Form.Label>
          <br></br>
            <select value={this.student.groupId} onChange={(event) => (this.student.groupId = event.currentTarget.value)}>
              {this.groups.map((groups) => (
                <option key={groups.id} value={groups.id}>
                  {groups.name}
                </option>
              ))}
            </select>
        </Card>
        <Row>
          <Column left>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
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

class GroupList extends Component {
  groups = [];

  render() {
    return (
      <div>
        <Card title="Groups">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.groups.map((groups) => (
                <tr key={groups.id}>
                  <td>{groups.name}</td>
                  <td>
                    <Button.Light onClick={() => history.push('/group/' + groups.id)}>
                      Details
                    </Button.Light>
                    <Button.Light onClick={() => history.push('/group/' + groups.id + '/edit')}>
                      Edit
                    </Button.Light>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Button.Success onClick={() => history.push('/group/create')}>
          New Group
        </Button.Success>
      </div>
    );
  }

  mounted() {
    groupService.getGroups((groups) => {
      this.groups = groups;
    });
  }

}

class GroupDetails extends Component {
  group = null;
  leader = '';
  members = [];

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
            <NavLink to={'/students/' + this.leader.id}>
            <Column>{this.leader.name}</Column>
            </NavLink>
          </Row>
          <Row>
            <Column width={2}>Image:</Column>
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
    groupService.getGroup(this.props.match.params.id, (group) => {
      this.group = group;
      groupService.getMembers(this.props.match.params.id, (members) => {
        this.members = members;
      });
      groupService.getLeader(this.group.leaderId, (leader) => {
        this.leader = leader;
        console.log(leader)
      });
    });
  }
  edit() {
    history.push('/group/' + this.props.match.params.id + '/edit');
  }
}

class updateGroup extends Component {

  group = null;
  members = [];

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
            <select value={this.group.leaderId} onChange={(event) => (this.group.leaderId = event.currentTarget.value)}>
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
      history.push('/group/' + this.props.match.params.id);
    });
  }
  delete() {
    groupService.deleteGroup(this.group.id, () => {
      history.push('/group');
    });
  }

  cancel() {
    history.push('/group/' + this.props.match.params.id);
  }
}


class createGroup extends Component {

  group = {
    name: '',
    leader: 0,
    description: '',
    groupImage: ''
  };

  render() {
    return (
      <div>
        <Card title="Create study program">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.name}
            onChange={(event) => (this.group.name = event.currentTarget.value)}/>
          <Form.Label>Leader:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.leadId}
            onChange={(event) => (this.group.leaderId = event.currentTarget.value)}/>
          <Form.Label>Description:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.description}
            onChange={(event) => (this.group.description = event.currentTarget.value)}/>
          <Form.Label>Image:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.groupImage}
            onChange={(event) => (this.group.groupImage = event.currentTarget.value)}/>
        </Card>
        <Row>
          <Column left>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column center>
            <Button.Danger onClick={this.cancel}>
              Cancel
            </Button.Danger>
          </Column>
        </Row>
      </div>
    );
  }

  save() {
    groupService.createGroup(this.studyProgram, () => {
      history.push('/group');
    });
  }

  cancel() {
    history.push('/group');
  }

}


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
        <Route exact path="/students/create" component={createStudent} />
        <Route exact path="/group" component={GroupList} />
        <Route exact path="/group/:id" component={GroupDetails} />
        <Route exact path="/group/:id/edit" component={updateGroup} />
        <Route exact path="/group/create" component={createGroup} />
      </div>
    </HashRouter>
  </div>,
  document.getElementById('root')
);
