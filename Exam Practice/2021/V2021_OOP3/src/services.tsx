import { pool } from './mysql-pool';

export class ChatRoom {
  id: number = 0;
  title: string = '';
  description: string = '';
}

export class ChatMessage {
  text: string = '';
  chatRoomId: number = 0;
}

class ChatService {

  getChatRooms(){
    return new Promise<ChatRoom[]>((resolve, reject) => {
      pool.query('SELECT * FROM ChatRooms', (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }

  getChatRoom(id: number) {
    return new Promise<ChatRoom>((resolve, reject) => {
    pool.query('SELECT * FROM ChatRooms WHERE id=?', [id], (error, results) => {
      if (error) return reject(error);

      resolve(results[0]);
    });
    });
  }

  createChatRoom(chat: ChatRoom) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'INSERT INTO ChatRooms (title, description, id) VALUES (?, ?, ?)',
        [chat.title, chat.description, chat.id],
        (error) => {
          if (error) return reject(error);
          resolve();
        });
    });
  }

  deleteChatRoom(id: number) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM ChatRooms WHERE id=?', [id], (error,results) => {
        pool.query('DELETE FROM Messages WHERE chatRoomId=?', [id], (error,results) => {
          if (error) return reject(error);
          resolve(results);
        });
        if (error) return reject(error);
        resolve(results);
      });
    });
  }

  getMessages(chatRoomId: number) {
    return new Promise<ChatMessage[]>((resolve, reject) =>{
      pool.query('SELECT * FROM Messages WHERE chatRoomId=?', [chatRoomId], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }

  addMessage(message: string, chatRoomId: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'INSERT INTO Messages (text, chatRoomId) VALUES (?, ?)',
        [message, chatRoomId],
        (error) => {
          if (error) return reject(error);
          resolve();
        });
    });
  }

}

export let chatService = new ChatService();
