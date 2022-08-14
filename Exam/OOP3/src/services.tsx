import { pool } from './mysql-pool';

export class Item {
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  count: number = 0;
}

export class Cart {
  id: number = 0;
  itemId: number = 0;
  itemCount: number = 0;
}

class Items {

  getItems(){
    return new Promise<Item[]>((resolve,reject ) => {
      pool.query('SELECT * FROM Items', (error,results) => {
        if (error) return reject(error);
        resolve(results);
      })
    })
  }

}

class Orders {

  addItem(itemId: number, itemCount: number){
    return new Promise<Cart>((resolve,reject ) => {
      pool.query('INSERT INTO Orders (itemId, itemCount) VALUES (?, ?)', [itemId,itemCount], (error,results) => {
        if (error) return reject(error);
        resolve(results);
      })
    });
  }

  removeItem(id: number){
    return new Promise<Cart[]>((resolve,reject ) => {
      pool.query('DELETE FROM Orders WHERE itemId=?', [id], (error,results) => {
        if (error) return reject(error);
        resolve(results);
      })
    })
  }

  getOrders(){
    return new Promise<Cart[]>((resolve,reject ) => {
      pool.query('SELECT * FROM Orders', (error,results) => {
        if (error) return reject(error);
        resolve(results);
      })
    })
  }

  emptyOrders() {
    return new Promise<Cart[]>((resolve,reject ) => {
      pool.query('DELETE FROM Orders', (error,results) => {
        if (error) return reject(error);
        resolve(results);
      })
    })
  }
}

export let itemService = new Items();
export let cartService = new Orders();