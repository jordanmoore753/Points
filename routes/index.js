const express = require('express');
const router = express.Router();
const {
  edgeCase,
  edgeCaseTwo,
  providedCase
} = require('../data/cases');

router.post('/populate', function(req, res, next) {
  req.session.users = providedCase;

  return res.sendStatus(200);
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
