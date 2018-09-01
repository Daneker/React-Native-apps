const sum = numbers => numbers.reduce((acc, number) => acc + number, 0);

const flatten = array =>
  array.reduce((acc, innerArray) => [...acc, ...innerArray], []);

const formatAmount = (amount, { forceSign } = {}) =>
  `${forceSign && amount > 0 ? '+' : ''}${amount}₸`;
const oweHeaderForBills = bills => {
  const owingAmount = sum(
    bills.filter(owe => owe.direction === 'owing').map(owe => owe.amount)
  );
  const owedAmount = sum(
    bills.filter(owe => owe.direction === 'owed').map(owe => owe.amount)
  );
  const totalBalance = owedAmount - owingAmount;

  return {
    owingAmount,
    owedAmount,
    totalBalance,
  };
};
export { sum, flatten, formatAmount, oweHeaderForBills };
