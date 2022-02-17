const balanceCalculation = (typeTx, balance, sum) => {
  if (typeTx === 'income') {
    balance = balance + Number(sum);
  }
  if (typeTx === 'expense') {
    balance = balance - Number(sum);
  }
  return balance;
};

module.exports = balanceCalculation;
