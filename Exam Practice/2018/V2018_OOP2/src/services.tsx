import { pool } from './mysql-pool';

export class Score {
  id: number = 0;  
  name: string = '';
  score: number = 0; 
}

class ScoreService {

  getScores(){
    return new Promise<Score[]>((resolve, reject) => {
      pool.query('SELECT * FROM Scores', (err, rows) => {
        if(err) reject(err);
        else resolve(rows);
      });
    });
  }

  updateScore(score: number, id: number){
    return new Promise<void>((resolve, reject) => {
      pool.query('UPDATE Scores SET score = ? WHERE id = ?', [score, id], (err, rows) => {
        if(err) reject(err);
        else resolve();
      });
    });
  }

  resetScore(){
    return new Promise<void>((resolve, reject) => {
      pool.query('UPDATE Scores SET score = 0', (err, rows) => {
        if(err) reject(err);
        else resolve();
      });
    });
  }

}
export let scoreService = new ScoreService();
