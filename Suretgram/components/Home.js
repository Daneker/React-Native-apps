import React, { Component } from 'react';
import { Image, AppRegistry, Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Button, TextInput } from 'react-native-paper';

class Home extends React.Component {
  state = {
    text: '',
    screenName: 'home',
  };

  onPressed = () => {
    if (this.state.text === '') {
      return
    }
    this.props.initialProfile(this.state.text);
    this.props.onGoToProfileScreen();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentView}>
          <Image
            style={{ width: 200, height: 200, alignSelf: 'center' }}
            source={{
              uri:
                'https://image.freepik.com/free-vector/instagram-icon_1057-2227.jpg',
            }}
          />
          <TextInput
            label=" "
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <Button style={styles.button} raised onPress={() => this.onPressed()}>
            SEARCH
          </Button>
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
  contentView: {
    flex: 7,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#cd486b',
  },
});

export default Home;
