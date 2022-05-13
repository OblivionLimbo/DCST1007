import { pool } from './mysql-pool';

export class Student {
  id: number = 0;
  name: string = '';
  email: string = '';
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

  updateStudent(student: Student, success: () => void) {
    pool.query(
      'UPDATE Students SET name=?, email=? WHERE id=?',
      [student.name, student.email, student.id],
      (error) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}
export let studentService = new StudentService();
