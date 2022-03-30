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

  getStudentDetails(id, success) {
    pool.query('SELECT * FROM Students WHERE id=?',
        [id],(error, results) => {
          if (error) return console.error(error); // If error, show error in console (in red text) and return
          success(results[0]);
    
    pool.query('SELECT * FROM StudyPrograms WHERE id=?',
      [results[0].studyProgramId],(error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return
        success(results[0]);
      });
    });
  }

  updateStudent(student, success) {
    pool.query(
      'UPDATE Students SET name=?, email=?, studyProgramId=? WHERE id=?',
      [student.name, student.email, student.studyProgramId, student.id],
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

  // create new student
  createStudent(student, success) {
    pool.query(
      'INSERT INTO Students (name, email, studyProgramId) VALUES (?, ?, ?)',
      [student.name, student.email, student.studyProgramId],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

class StudyProgramService{
  getStudyPrograms(success) {
    pool.query('SELECT * FROM StudyPrograms',(error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }

  getStudyProgram(id, success) {
    pool.query('SELECT * FROM StudyPrograms WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);
      success(results[0]);
    });
  }

  getStudyProgramDetails(id, success) {
    pool.query('SELECT * FROM Students WHERE studyProgramId=?',
        [id],(error, results) => {
          if (error) return console.error(error); // If error, show error in console (in red text) and return
          success(results);
    });
  }

  updateStudyProgram(studyProgram, success) {
    pool.query(
      'UPDATE StudyPrograms SET name=?, code=? WHERE id=?',
      [studyProgram.name, studyProgram.code, studyProgram.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteStudyProgram(id, success) {
    pool.query('DELETE FROM StudyPrograms WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  // create new study program
  createStudyProgram(studyProgram, success) {
    pool.query(
      'INSERT INTO StudyPrograms SET name=?, code=?',
      [studyProgram.name, studyProgram.code],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

export let studentService = new StudentService();
export let studyProgramService = new StudyProgramService();
