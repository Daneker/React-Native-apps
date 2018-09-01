import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Title, Text } from 'react-native-paper';
import { oweHeaderForBills, formatAmount } from '../../../utils';

const changeColor = myColor => {
  return {
    textAlign: 'right',
    color: myColor,
  };
};

const FriendsListItem = ({ name, bills }) => {
  const oweHeader = oweHeaderForBills(bills);

  const color = (() => {
    if (oweHeader.totalBalance === 0) return Colors.gray600;
    return oweHeader.totalBalance > 0 ? Colors.green600 : Colors.red600;
  })();
  const noExpenses = bills.length === 0;
  const settledUp = !noExpenses && oweHeader.totalBalance === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View>
        <Text style={changeColor(color)}>
          {(() => {
            if (noExpenses) return 'no expenses';
            if (settledUp) return 'settled up';
            return oweHeader.totalBalance > 0 ? 'owes you' : 'you owe';
          })()}
        </Text>
        {!(noExpenses || settledUp) && (
          <Text style={changeColor(color)}>
            {formatAmount(oweHeader.totalBalance)}
          </Text>
        )}
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
  title:{
    fontSize: 20,
  }
});
export default FriendsListItem;
