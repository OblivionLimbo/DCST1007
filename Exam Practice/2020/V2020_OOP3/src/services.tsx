import { pool } from './mysql-pool';

export class Show {
  id: number = 0;
  title: string = '';
  description: string = '';
}

class ShowService {
  getShows(success: (shows: Show[]) => void) {
    pool.query('SELECT * FROM Shows', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getShow(id: number, success: (student: Show) => void) {
    pool.query('SELECT * FROM Shows WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateShow(show: Show, success: () => void) {
    pool.query(
      'UPDATE Shows SET name=?, email=? WHERE id=?',
      [show.title, show.description, show.id],
      (error) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}
export let showService = new ShowService();
