import { pool } from './mysql-pool';

class StudentService {
  getStudents(success) {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id, success) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getGroup(id, success) {
    pool.query('SELECT * FROM Groups WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);
      success(results [0]);
    });
  }

  updateStudent(student, success) {
    pool.query(
      'UPDATE Students SET name=?, email=?, groupId=? WHERE id=?',
      [student.name, student.email,student.groupId, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteStudent(id, success) {
    pool.query('DELETE FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  createStudent(student, success) {
    pool.query(
      'INSERT INTO Students (name, email, groupId) VALUES (?, ?, ?)',
      [student.name, student.email, student.groupId],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

class GroupService{
  getGroups(success) {
    pool.query('SELECT * FROM Groups', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getGroup(id, success) {
    pool.query('SELECT * FROM Groups WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getMembers(id, success) {
    pool.query('SELECT * FROM Students WHERE groupId=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getLeader(leaderId, success) {
    pool.query('SELECT * FROM Students WHERE id=?', [leaderId], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateGroup(group, success) {
    pool.query(
      'UPDATE Groups SET name=?, leaderId=?, description=?, groupImage=? WHERE id=?',
      [group.name,group.leaderId, group.description, group.groupImage, group.id],
      (error, results) => {
        if (error) return console.error(error);
        success();
      }
    );
  }

  deleteGroup(id, success) {
    pool.query('DELETE FROM Groups WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  createGroup(group, success) {
    pool.query(
      'INSERT INTO Groups (name, leaderId, description, image) VALUES (?, ?, ?, ?)',
      [group.name, group.leaderId, grpup.descriptio, group.image],
      (error, results) => {
        if (error) return console.error(error);
        success();
      }
    );
  }
}
export let studentService = new StudentService();
export let groupService = new GroupService();
