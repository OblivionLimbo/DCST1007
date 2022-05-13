import { pool } from './mysql-pool';

export class Chat {
  id: number = 0;
  title: string = '';
  description: string = '';
}

export class Message {
  id: number = 0;
  text: string = '';
  roomId: number = 0;
}

class ChatService {
  getchatsPromise() {
    return new Promise<Chat[]>((resolve, reject) => {
      pool.query('SELECT * FROM ChatRooms', (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }

  getChat(id: number, success: (chat: Chat) => void) {
    pool.query('SELECT * FROM ChatRooms WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getMessages(chatroomId: number, success: (messages: Message[]) => void) {
    pool.query('SELECT * FROM Messages WHERE chatroomId=?', [chatroomId], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // updateChatPromise(chat: Chat) {
  //   return new Promise((resolve, reject) => {
  //     pool.query(
  //       'UPDATE ChatRooms SET title=?, description=? WHERE id=?',
  //       [chat.title, chat.description, chat.id],
  //       (error, results) => {
  //         if (error) return reject(error);

  //         resolve(results);
  //       }
  //     );
  //   });
  // }
  addChatPromise(chat: Chat) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'INSERT INTO ChatRooms (title, description) VALUES (?, ?)',
        [chat.title, chat.description],
        (error, results) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  addMessage(chatroomId: number, text: string, success: () => void) {
    pool.query(
      'INSERT INTO Messages(text, chatroomId) VALUES (?, ?)',
      [text, chatroomId],
      (error, _results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

export let chatService = new ChatService();
