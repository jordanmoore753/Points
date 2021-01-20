const getBalances = (user) => {
  const { transactions, payers } = user;
  const payerBalances = {};

  payers.forEach((payer) => payerBalances[payer] = { balance: 0 });

  transactions.forEach((transaction) => {
    const { payer, points } = transaction;
    payerBalances[payer].balance += points;
  });

  return payerBalances;
};

const assignPayers = (user) => {
  const { payers } = user;
  const payerCounts = {};

  payers.forEach((payer) => payerCounts[payer] = { amountDeducted: 0 });

  return payerCounts;
};

const sortTransactions = (user) => {
  const { transactions } = user;
  const sortedTransactions = transactions.slice();

  sortedTransactions.sort((a, b) => {
    const aDate = new Date(a.transactionDate).getTime() || 0;
    const bDate = new Date(b.transactionDate).getTime() || 0;
  
    return aDate - bDate;
  });

  return sortedTransactions;
};

const computeTotalBalance = (user) => {
  const { transactions } = user;
  let balance = 0;

  transactions.forEach((transaction) => balance += transaction.points);

  return balance;
};

const makeDeductions = (user, amount) => {
  const { transactions, payers, payerBalances } = user;
  const payerCounts = assignPayers(user);

  let transactionsCopy = transactions.slice();
  let i = 0;

  while (i < transactionsCopy.length) {
    const { points, payer } = transactionsCopy[i];
    const transactionDate = new Date().toDateString();

    // ensure that balance for individual payer never goes negative
    if (payerBalances[payer] - points < 0) {
      i += 1;
      continue;
    }

    // if we can end iteration
    if (points >= amount) {
      const leftoverPoints = points - amount;

      transactionsCopy.push({
        points: -(amount),
        transactionDate,
        payer
      });

      payerCounts[payer].amountDeducted -= amount;
      payerBalances[payer] -= amount;

      return { transactionsCopy, payerCounts };
    } 

    // continue iterating
    amount -= points;
    transactionsCopy.splice(i, 1);
    payerCounts[payer].amountDeducted -= points;
    payerBalances[payer] -= points;
    i = 0;
  }

  return { transactionsCopy, payerCounts };
};

const dateIsInvalid = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}T[0-1]\d{1}:[0-5]\d{1}/g;

  if (!regex.test(date)) return true;

  const potentialDate = new Date(date);

  if (!potentialDate) return true;

  return false;
};

const payerIsInvalid = (payer) => {
  if (payer.length === 0) return true;
  if (payer.replace(' ', '').length === 0) return true;
  
  return false;
};

module.exports = {
  getBalances,
  assignPayers,
  sortTransactions,
  computeTotalBalance,
  makeDeductions,
  dateIsInvalid,
  payerIsInvalid
};