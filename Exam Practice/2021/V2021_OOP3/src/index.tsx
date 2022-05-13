import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Chat, chatService, Message } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return <NavBar brand="ChatApp"></NavBar>;
  }
}

class ChatList extends Component {
  chats: Chat[] = [];
  newchat = new Chat();

  render() {
    return (
      <div>
        <Card title="Chat rooms">
          {this.chats.map((chat) => (
            <Row key={chat.id}>
              <Column>
                <NavLink to={'/chats/' + chat.id}>{chat.title}</NavLink>
              </Column>
            </Row>
          ))}
        </Card>
        <Card title="New chat rooms">
          <Form.Label>Title:</Form.Label>
          <Form.Input
            type="text"
            value={this.newchat.title}
            onChange={(event) => (this.newchat.title = event.currentTarget.value)}
          />
          <Form.Label>Description</Form.Label>
          <Form.Input
            type="text"
            value={this.newchat.description}
            onChange={(event) => (this.newchat.description = event.currentTarget.value)}
          />
          <Button.Success
            onClick={() =>{this.add()}
            }
          >
            Create chatroom
          </Button.Success>
        </Card>
      </div>
    );
  }

  add(){
    chatService
      .addChatPromise(this.newchat)
      .then(() => {
        this.newchat = new Chat;
        this.mounted()
      })
      .catch((error) => console.log(error.message))
  }

  mounted() {
    chatService
      .getchatsPromise()
      .then((results) => (this.chats = results))
      .catch((error) => console.log(error.message));
  }
}

class ChatDetails extends Component<{ match: { params: { id: string } } }> {
  chat = new Chat();
  messages: Message[] = [];
  newMessage = new Message();

  render() {
    return (
      <Card title="Chat room">
        <Card title={this.chat.title}>
          {this.chat.description}
          <Card title="Messages">
            {this.messages.map((message) => (
              <Row key={message.id}>
                <Column>{'>' + message.text}</Column>
              </Row>
            ))}
          </Card>
        </Card>
        <Card title="New message">
          <Form.Input
            type="text"
            value={this.newMessage.text}
            onChange={(event) => (this.newMessage.text = event.currentTarget.value)}
          />
          <Button.Success
            onClick={() =>
              chatService.addMessage(
                Number(this.props.match.params.id),
                this.newMessage.text,
                () => {
                  this.newMessage = new Message();
                  this.mounted();
                }
              )
            }
          >
            Create message
          </Button.Success>
        </Card>
      </Card>
    );
  }

  mounted() {
    chatService.getChat(Number(this.props.match.params.id), (chat) => {
      this.chat = chat;
    });
    chatService.getMessages(Number(this.props.match.params.id), (messages) => {
      this.messages = messages;
    });
  }
}

ReactDOM.render(
  <HashRouter>
    <Menu />
    <Route exact path="/" component={ChatList} />
    <Route exact path="/chats/:id" component={ChatDetails} />
  </HashRouter>,
  document.getElementById('root')
);