import { pool } from './mysql-pool';

export class Student {
  id: number = 0;
  name: string = '';
  email: string = '';
  groupId: number = 0;
}

export class Group {
  id: number = 0;
  name: string = '';
  leaderId: number = 0;
  description: string = '';
  groupImage: string = '';
}

class StudentService {
  getStudents(success: (students: Student[]) => void) {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id: number, success: (student: Student) => void) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getGroup(id: number, success: (group: string) => void) {
    pool.query('SELECT name FROM Groups WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0].name);
    });
  }

  updateStudent(student: Student, success: () => void) {
    pool.query(
      'UPDATE Students SET name=?, email=?, groupId=? WHERE id=?',
      [student.name, student.email, student.id],
      (error) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteStudent(id: number, success: () => void) {
    pool.query('DELETE FROM Students WHERE id=?', [id], (error) => {
      if (error) return console.error(error);

      success();
    });
  }

  createStudent(student: Student, success: () => void) {
    pool.query(
      'INSERT INTO Students (name, email, groupId) VALUES (?, ?, ?)',
      [student.name, student.email],
      (error) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

class GroupService {
  getGroups(success: (groups: Group[]) => void) {
    pool.query('SELECT * FROM Groups', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getGroup(id: number, success: (group: Group) => void) {
    pool.query('SELECT * FROM Groups WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getMembers(id: number, success: (members: Student[]) => void) {
    pool.query('SELECT * FROM Students WHERE groupId=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  
  getLeader(id: number, success: (leaderId: string) => void) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);
      
      success(results[0]);
    });
  }

  updateGroup(group: Group, success: () => void) {
    pool.query(
      'UPDATE Groups SET name=?, leaderId=?, description=?, groupImage=? WHERE id=?',
      [group.name, group.leaderId, group.description, group.groupImage, group.id],
      (error) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteGroup(id: number, success: () => void) {
    pool.query('DELETE FROM Groups WHERE id=?', [id], (error) => {
      if (error) return console.error(error);

      success();
    });
  }

  createGroup(group: Group, success: () => void) {
    pool.query(
      'INSERT INTO Groups (name, leaderId, description, groupImage) VALUES (?, ?, ?, ?)',
      [group.name, group.leaderId, group.description, group.groupImage],
      (error) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

export let studentService = new StudentService();
export let groupService = new GroupService();
