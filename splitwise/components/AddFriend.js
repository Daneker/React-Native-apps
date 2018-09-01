import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import {
  Button,
  Colors,
  Toolbar,
  ToolbarContent,
  ToolbarAction,
  TextInput,
} from 'react-native-paper';

export default class AddFriend extends React.Component {
  state = {
    nameInputValue: '',
  };

  handleNameInputChangeText = text => {
    this.setState({ nameInputValue: text });
  };

  handleAddFriend = () => {
    if (this.state.nameInputValue === '') return;
    const newFriend = {
      name: this.state.nameInputValue,
    };
    this.props.onAddFriend(newFriend);
  };

  render() {
    return (
      <View style={styles.container}>
        <Toolbar style={{backgroundColor: 'green'}}>
          <ToolbarContent title="Add a friend" />
          <ToolbarAction onPress={this.props.onGoHome} icon="close" />
        </Toolbar>
        <View style={styles.content}>
          <TextInput
            label="Name"
            value={this.state.nameInputValue}
            onChangeText={this.handleNameInputChangeText}
          />
          <Button
            onPress={this.handleAddFriend}
            disabled={this.state.nameInputValue === ''}
            raised>
            Save
          </Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
