import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'react-native-paper';
import { flatten, formatAmount, oweHeaderForBills } from '../../../utils';
import OweHeaderItem from './OweHeaderItem';

const OweHeader = ({ billsMap }) => {
  const oweHeader = oweHeaderForBills(
    flatten(Object.values(billsMap))
  );

  return (
    <View style={styles.container}>
      <OweHeaderItem
        label="you owe"
        formattedAmount={formatAmount(oweHeader.owingAmount)}
        amountColor={
          oweHeader.owingAmount > 0 ? Colors.red600 : Colors.gray600
        }
      />
      <OweHeaderItem
        label="you are owed"
        formattedAmount={formatAmount(oweHeader.owedAmount)}
        amountColor={
         oweHeader.owingAmount > 0 ? Colors.green600 : Colors.gray600
        }
      />
      <OweHeaderItem
        label="total balance"
        formattedAmount={formatAmount(oweHeader.totalBalance, {
          forceSign: true,
        })}
        amountColor={(() => {
          if (oweHeader.totalBalance === 0) return Colors.gray600;

          return oweHeader.totalBalance > 0
            ? Colors.green600
            : Colors.red600;
        })()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default OweHeader;
