import React from 'react';
import { View, StyleSheet } from 'react-native';

import AddBill from './components/AddBill';
import AddFriend from './components/AddFriend';
import FriendHistory from './components/FriendHistory';
import Home from './components/Home';

export default class App extends React.Component {
  state = {
    billsMap: {},
    currentScreenName: 'home',
    currentScreenParams: {},
  };
  
  handleNavigatePage = page => {
    this.setState({
      currentScreenName: page,
    });
  };

  handleNavigateToFriendScreen = ({ name }) => {
    this.setState({
      currentScreenName: 'friend',
      currentScreenParams: { name },
    });
  };

  handleAddFriend = newFriend => {
    this.setState(prevState => ({
      billsMap: {
        ...prevState.billsMap,
        [newFriend.name]: [],
      },
    }));
    this.handleNavigatePage('home');
  };
  
  handleAddBills = billsMap => {
    this.setState(prevState => ({
      billsMap: Object.assign(
        ...prevState.billsMap,
        ...Object.entries(billsMap).map(([name, bills]) => ({
          [name]: [...bills, ...(prevState.billsMap[name] || [])],
        }))
      ),
    }));
    this.handleNavigatePage('home');
  };

  render() {
    const { currentScreenName, billsMap } = this.state;
    return (
      <View style={styles.container}>
        {currentScreenName === 'home' && (
          <Home
            billsMap={billsMap}
            onNavigateToAddFriendScreen={() => this.handleNavigatePage('addFriend')}
            onNavigateToAddBillScreen={() => this.handleNavigatePage('addBill')}
            onNavigateToFriendScreen={this.handleNavigateToFriendScreen}
          />
        )}
        {currentScreenName === 'addFriend' && (
          <AddFriend
            onGoHome={() => this.handleNavigatePage('home')}
            onAddFriend={this.handleAddFriend}
          />
        )}
        {currentScreenName === 'addBill' && (
          <AddBill
            friendNames={Object.keys(billsMap)}
            onAddBills={this.handleAddBills}
            onGoHome={() => this.handleNavigatePage('home')}
          />
        )}
        {currentScreenName === 'friend' && (
          <FriendHistory
            name={this.state.currentScreenParams.name}
            bills={billsMap[this.state.currentScreenParams.name]}
            onGoHome={() => this.handleNavigatePage('home')}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

