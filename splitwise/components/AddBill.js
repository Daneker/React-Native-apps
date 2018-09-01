import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import {
  Button,
  Checkbox,
  Colors,
  RadioButton,
  TextInput,
  Toolbar,
  ToolbarAction,
  ToolbarContent,
  TouchableRipple,
} from 'react-native-paper';

export default class AddBill extends React.Component {
  state = {
    amountInputValue: '',
    descriptionInputValue: '',
    involvedFriends: [],
    paidByName: '',
  };

  handleAmountInputChangeText = text => {
    this.setState({ amountInputValue: text });
  };
  handleDescriptionInputChangeText = text => {
    this.setState({ descriptionInputValue: text });
  };
  handleToggleInvolveFriend = ({ name }) => {
    this.setState(prevState => {
      const prevInvolved = prevState.involvedFriends[name];
      const nextInvolved = !prevInvolved;

      return {
        involvedFriends: {
          ...prevState.involvedFriends,
          [name]: nextInvolved,
        },
        paidByName:
          prevState.paidByName === name && !nextInvolved
            ? null
            : prevState.paidByName,
      };
    });
  };
  
  handleSetPaidByName = name => {
    this.setState({ paidByName: name });
  };

  handleAddBills = () => {
    const involvedFriendNames = this.getInvolvedFriendNames();
    if (
      involvedFriendNames.length === 0 ||
      this.state.paidByName === '' ||
      this.state.amountInputValue === '' ||
      this.state.descriptionInputValue === ''
    ) {
      return;
  }

    const direction = this.state.paidByName === 'You' ? 'owed' : 'owing';
    const newBillsMap = Object.assign(
      ...involvedFriendNames.map(name => ({
        [name]: [
          {
            direction,
            amount: Number(
              (
                this.state.amountInputValue /
                (involvedFriendNames.length + 1)
              ).toFixed(2)
            ),
            description: this.state.descriptionInputValue,
          },
        ],
      }))
    );
    this.props.onAddBills(newBillsMap);
  };

  getInvolvedFriendNames = () =>
    Object.entries(this.state.involvedFriends)
      .filter(([, involved]) => involved)
      .map(([name]) => name);

  render() {
    const { friendNames, onGoHome } = this.props;
    const involvedFriendNames = this.getInvolvedFriendNames();

    return (
      <View style={styles.container}>
        <Toolbar style={{backgroundColor: 'green'}}>
          <ToolbarContent title="Add a bill" />
          <ToolbarAction onPress={onGoHome} icon="close" />
        </Toolbar>
        <ScrollView style={styles.scrollview}>
          <View>
            <Text style={styles.title}>Involved friends</Text>
            {friendNames.map(name => (
              <TouchableRipple
                key={name}
                onPress={() => this.handleToggleInvolveFriend({ name })}>
                <View style={styles.checkView}>
                  <Text>{name}</Text>
                  <View pointerEvents="none">
                    <Checkbox
                      key={name}
                      checked={this.state.involvedFriends[name]}
                    />
                  </View>
                </View>
              </TouchableRipple>
            ))}
          </View>
          <View>
            <Text style={styles.title}>Who paid?</Text>
            {['You', ...involvedFriendNames].map(name => (
              <TouchableRipple
                key={name}
                onPress={() => this.handleSetPaidByName(name)}>
                <View style={styles.checkView}>
                  <Text>{name}</Text>
                  <View pointerEvents="none">
                    <RadioButton
                      value={name}
                      checked={this.state.paidByName === name}
                    />
                  </View>
                </View>
              </TouchableRipple>
            ))}
          </View>

          <TextInput
            label="Amount"
            value={this.state.amountInputValue}
            onChangeText={this.handleAmountInputChangeText}
            keyboardType="numeric"
          />

          <TextInput
            label="Description"
            value={this.state.descriptionInputValue}
            onChangeText={this.handleDescriptionInputChangeText}
          />

          <Button
            style={{backgroundColor: 'green'}}
            onPress={this.handleAddBills}
            disabled={
              involvedFriendNames.length === 0 ||
              this.state.paidByName === '' ||
              this.state.amountInputValue === '' ||
              this.state.descriptionInputValue === ''
            }
            raised
            primary>
            Save
          </Button>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  checkView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    color: 'gray',
  },
  scrollview: {
    flex: 1,
    padding: 16,
  },
});
