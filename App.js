/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Searchbox from './app/components/Searchbox.js';

// type Props = {};
//export default class App extends Component<Props> {
export default class App extends Component {  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.welcome}>
            React Native POS Client
          </Text>
        </View>
        <View style={styles.searchbox}>
        <Searchbox/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FEFEFE',
  },
  titleBar: {
    alignSelf: 'stretch',
    backgroundColor: '#2070A0',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FEFEFE'
  },
  searchbox: {
    alignSelf: 'stretch',
  }
});
