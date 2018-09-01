import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import { formatAmount } from '../../utils';

const changeColor = myColor => {
  return {
    textAlign: 'right',
    color: myColor,
  };
};
const FriendHistoryListItem = ({ bill }) => {
  const color = bill.direction === 'owed' ? Colors.green600 : Colors.red600;

  return (
    <View style={styles.container}>
      <Text>{bill.description}</Text>
      <View>
        <Text style={changeColor(color)}>
          {bill.direction === 'owed' ? 'you lent' : 'you borrowed'}
        </Text>
        <Text style={changeColor(color)}>{formatAmount(bill.amount)}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default FriendHistoryListItem;
