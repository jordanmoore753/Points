const express = require('express');
const router = express.Router();
const { 
  getBalances, 
  assignPayers, 
  sortTransactions, 
  computeTotalBalance,
  makeDeductions,
  dateIsInvalid,
  payerIsInvalid
} = require('../utilities/user');

/* GET user */
router.get('/:id', function(req, res, next) {
  res.render('user', { user: req.session.users['1'] });
});

/* GET user balances */
router.get('/:id/balances', function(req, res, next) {
  const user = req.session.users[req.params.id];
  return res.send(getBalances(user));
});

/* POST add points */
router.post('/:id/add', function(req, res, next) {
  const { points, payer, transactionDate } = req.body;

  if (dateIsInvalid(transactionDate)) {
    return res.status(403).send({ error: "Invalid date." });
  }

  if (payerIsInvalid(payer)) {
    return res.status(403).send({ error: "Invalid payer." });
  }

  const user = req.session.users[req.params.id];
  const { transactions, payers, payerBalances } = user;

  if (!payers.includes(payer)) {
    user.payers = payers.concat(payer);
  }

  const newTransaction = {
    points,
    payer,
    transactionDate
  };

  // never let points go negative
  if (!user.payerBalances[payer] && points < 0) {
    return res.status(403).send({ error: "Points cannot go negative." });
  }

  if (user.payerBalances[payer] && points + user.payerBalances[payer] < 0) {
    return res.status(403).send({ error: "Points cannot go negative." });
  }

  if (!user.payerBalances[payer]) {
    user.payerBalances[payer] = 0;
  }

  user.transactions = user.transactions.concat(newTransaction);
  user.transactions = sortTransactions(user);
  user.payerBalances[payer] += points;
  user.balance = computeTotalBalance(user);

  return res.send(newTransaction);
});

/* POST deduct points */
router.post('/:id/deduct', function(req, res, next) {
  const user = req.session.users[req.params.id];
  const { balance } = user;

  let { amount } = req.body;

  // check that balance is enough to meet amount deducted
  if (balance < amount) return res.status(403).send({ error: "Not enough points." });

  // deduct points
  const { transactionsCopy, payerCounts } = makeDeductions(user, amount);

  user.transactions = transactionsCopy;
  user.transactions = sortTransactions(user);
  user.balance = computeTotalBalance(user);

  return res.send(payerCounts);
});

module.exports = router;
