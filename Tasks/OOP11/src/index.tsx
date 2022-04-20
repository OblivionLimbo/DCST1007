import * as React from 'react';
import { Component } from 'react-simplified';
import { View, Text } from 'react-native';
import moji from 'moji-translate';

export class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>{moji.translate('Hello World')}</Text>
      </View>
    );
  }
}
