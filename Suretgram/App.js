import React, { Component } from 'react';
import {
  Button,
  Image,
  AppRegistry,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Constants } from 'expo';
import { TextInput } from 'react-native-paper';

import Home from './components/Home';
import UserProfile from './components/UserProfile';

class App extends React.Component {
  state = {
    screenName: 'home',
    userName: '',
  };

  handleGoToProfileScreen = () => {
    this.setState({
      screenName: 'profile',
    });
  };

  handleGoToHomeScreen = () => {
    this.setState({
      userName: '',
      screenName: 'home',
    });
  };

  initialProfile = initialProfileName => {
    this.setState({
      userName: initialProfileName,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          ({this.state.screenName === 'profile' && (
            <Button title="<" onPress={this.handleGoToHomeScreen} />
          )})
          <Text style={styles.headerTitle}>
            {this.state.screenName === 'home' && 'SURETGRAM'}
            {this.state.screenName === 'profile' && 'PROFILE'}
          </Text>
        </View>
        <View style={styles.contentView}>
          {this.state.screenName === 'home' && (
            <Home
              onGoToProfileScreen={this.handleGoToProfileScreen}
              initialProfile={initialProfileName =>
                this.initialProfile(initialProfileName)
              }
            />
          )}
          {this.state.screenName === 'profile' && (
            <UserProfile userName={this.state.userName} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    width: '90%',
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#cd486b',
  },
  contentView: {
    flex: 7,
  },
});

export default App;
