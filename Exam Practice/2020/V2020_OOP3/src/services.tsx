import { powerMonitor } from 'electron';
import { pool } from './mysql-pool';

export class Show {
  id: number = 0;
  title: string = '';
  description: string = '';
}

export class Rating {
  rating: number = 0;
  showId: number = 0;
}

class ShowService {
  getShows() {
    return new Promise<Show[]>((resolve, reject) => {
    pool.query('SELECT * FROM Shows', (error, results) => {
      if (error) return reject(error);
      resolve(results);
      });
    });
  }

  getShow(id: number) {
    return new Promise<Show>((resolve, reject) => {
    pool.query('SELECT * FROM Shows WHERE id=?', [id], (error, results) => {
      if (error) return reject(error);

      resolve(results[0]);
    });});
  }

  updateShow(show: Show) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE Shows SET title=?, description=? WHERE id=?',
        [show.title, show.description, show.id],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
    });
  }

  createShow(show: Show) {
    return new Promise<Show>((resolve, reject) => {
    pool.query(
      'INSERT INTO Shows (title, description, id) VALUES (?, ?, ?)',
      [show.title, show.description, show.id],
      (error,results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }

  deleteShow(id: number) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM Shows WHERE id=?', [id], (error,results) => {
        pool.query('DELETE FROM ShowRatings WHERE showId=?', [id], (error,results) => {
          if (error) return reject(error);
          resolve(results);
          });
        if (error) return reject(error);
        resolve(results);
      });
    });
  }

  getRatings() {
    return new Promise<Rating[]>((resolve, reject) => {
    pool.query('SELECT rating, showId FROM ShowRatings', (error, results) => {
      if (error) return reject(error);

      resolve(results);
    })});
  }

  addRating(rating: number, showId: number) {
    return new Promise<void>((resolve, reject) => {
    pool.query(
      'INSERT INTO ShowRatings (rating, showId) VALUES (?, ?)',
      [rating, showId],
      (error) => {
        if (error) return reject(error);

        resolve();
      }
    )});
  }


}
export let showService = new ShowService();
