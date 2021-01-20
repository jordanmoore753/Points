const express = require('express');
const router = express.Router();
const {
  edgeCase,
  edgeCaseTwo,
  providedCase
} = require('../data/cases');

router.post('/populate/:id', function(req, res, next) {
  const id = req.params.id;

  if (id === '1') {
    req.session.users = edgeCase;
  } else if (id === '2') {
    req.session.users = edgeCaseTwo;
  } else {
    req.session.users = providedCase;
  }

  return res.send(req.session.users['1']);
});

router.post('/reset', function(req, res, next) {
  req.session.users['1'] = {
    name: 'Jordan',
    transactions: [],
    payers: [],
    payerBalances: {},
    balance: 0
  };

  return res.send(req.session.users['1']);
});

module.exports = router;
