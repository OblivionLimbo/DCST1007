import * as React from 'react';
import { Component } from 'react-simplified';
import { View, Text } from 'react-native';
import moji from 'moji-translate';

export class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <h3>Translate text into emojis</h3>
        <input type="text" value="Hello World" placeholder="Type something..."></input><button>Translate</button>
        <Text>{moji.translate('Hello World')}</Text>
      </View>
    );
  }
}
