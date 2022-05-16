import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { ChatRoom, chatService, ChatMessage} from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class ChatList extends Component {
  chatRooms: ChatRoom[] = [];
  newChatRoom: ChatRoom = new ChatRoom();
  search: string = '';

  render() {
    return(
      <>
        <Card title="Chat Rooms">
          <Form.Label>Søk</Form.Label>
          <Form.Input type="text" value={this.search} onChange={(event) => (this.search = event.target.value)}/>
          <br /><br />
          {this.chatRooms
          .filter((chatRoom) => (chatRoom.title.toLowerCase().includes(this.search.toLowerCase())))
          .map((chatRoom) => (
            <>
              <Card title={chatRoom.title} key={chatRoom.id}>
                <Row>
                  <Column>{chatRoom.description}</Column>
                </Row>
                <Row>
                  <Column>
                    <Button.Light onClick={() => history.push('/chat/' + chatRoom.id)}>Gå til chat</Button.Light>
                      {' '}
                    <Button.Danger onClick={()=>this.delete(chatRoom.id)}>Slett Chat</Button.Danger>
                  </Column>
                </Row>
              </Card>
              <br />
              </>
              ))}
        </Card>
        <br />
        <Card title="Nytt rom">
          <Form.Label>Tittel</Form.Label>
          <Form.Input type="text" value={this.newChatRoom.title} onChange={(event) => (this.newChatRoom.title = event.target.value)}/>
          <Form.Label>Beskrivelse</Form.Label>
          <Form.Input type="text" value={this.newChatRoom.description} onChange={(event) => (this.newChatRoom.description = event.target.value)}/>
          <br />
          <Button.Success onClick={() => this.add()}>Legg til</Button.Success>
        </Card>
      </>
    )
  }

  add(){
    chatService.createChatRoom(this.newChatRoom)
    .then(() => this.mounted());
  }

  delete(id: number){
    chatService.deleteChatRoom(id)
    .then(() => this.mounted());
  }

  mounted(){
    chatService.getChatRooms()
    .then(chatRooms => this.chatRooms = chatRooms);
  }
}

class ChatDetails extends Component<{ match: { params: { id: number } } }> {
  chatRoom: ChatRoom = new ChatRoom();
  messages: ChatMessage[] = [];
  newMessage: ChatMessage = new ChatMessage();

  render() {
    return(
      <>
        <Card title={this.chatRoom.title}>
          <Row>
            <Column>{this.chatRoom.description}</Column>
          
            { this.messages.map((messsages) =>
              <Row><Column>{'>'} {messsages.text}</Column></Row>
              )
            }
          </Row>
        </Card>
        <br />
        <Card title="Melding">
          <Form.Input type="text" value={this.newMessage.text} onChange={(event) => (this.newMessage.text = event.target.value)}/>
          <br />
          <Button.Success onClick={() => this.addMessage()}>Send</Button.Success>
          
        </Card>
        <Button.Light onClick={() => history.push('/')}>Tilbake</Button.Light>
      </>
    )
  }

  addMessage(){
    console.log(this.newMessage)
    chatService
    .addMessage(this.newMessage.text, this.chatRoom.id)
    .then(() => this.mounted());
  }

  mounted(){
    chatService.getChatRoom(this.props.match.params.id)
    .then(chatRoom => this.chatRoom = chatRoom);
    chatService.getMessages(this.props.match.params.id)
    .then(messages => this.messages = messages);
  }
}

ReactDOM.render(
  <div>
    <Alert />
    <HashRouter>
      <div>
        <Route exact path="/" component={ChatList} />
        <Route path="/chat/:id" component={ChatDetails} />
      </div>
    </HashRouter>
  </div>,
  document.getElementById('root')
);