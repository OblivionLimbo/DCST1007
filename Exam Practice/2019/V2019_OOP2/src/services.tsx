import { pool } from './mysql-pool';

export class List {
  id: number = 0;
  name: string = '';
  count: number = 0;
  collected: boolean = false;
}

class ShoppingService {

  getList() {
    return new Promise<List[]>((resolve, reject) => {
      pool.query('SELECT * FROM ShoppingList', (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  addItem(x: List) {
    return new Promise<List>((resolve, reject) => {
      pool.query('INSERT INTO ShoppingList (name,count,collected) VALUES (?,?,?)', [x.name, x.count, false], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
  
  collectItem(id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query('UPDATE ShoppingList SET collected=? WHERE id=?', [true, id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  deleteItem(id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query('DELETE FROM ShoppingList WHERE id=?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

}

export let shoppingService = new ShoppingService();
