const edgeCase = {
  '1': {
    name: 'Jordan',
    transactions: [
      {
        payer: 'DANNON',
        points: 1000,
        transactionDate: '2000-06-12T19:30'
      },
      {
        payer: 'UNILEVER',
        points: 500,
        transactionDate: '2001-06-12T19:30'
      },
      {
        payer: 'UNILEVER',
        points: -400,
        transactionDate: '2002-06-12T19:30'
      },
      {
        payer: 'UNILEVER',
        points: -50,
        transactionDate: '2003-06-12T19:30'
      },
      {
        payer: 'DANNON',
        points: 2000,
        transactionDate: '2004-06-12T19:30'
      },
      {
        payer: 'DANNON',
        points: 3000,
        transactionDate: '2004-06-12T19:30'
      },
    ],
    payers: [
      'DANNON',
      'UNILEVER'
    ],
    payerBalances: {
      'DANNON': 6000,
      'UNILEVER': 50      
    },
    balance: 6050
  }
};

const edgeCaseTwo = {
  '1': {
    name: 'Jordan',
    transactions: [
      {
        payer: 'DANNON',
        points: 1000,
        transactionDate: '2000-06-12T19:30'
      },
      {
        payer: 'UNILEVER',
        points: 500,
        transactionDate: '2001-06-12T19:30'
      },
      {
        payer: 'UNILEVER',
        points: -400,
        transactionDate: '2002-06-12T19:30'
      },
      {
        payer: 'DANNON',
        points: 2000,
        transactionDate: '2003-06-12T19:30'
      },
      {
        payer: 'UNILEVER',
        points: -50,
        transactionDate: '2004-06-12T19:30'
      },
      {
        payer: 'DANNON',
        points: 3000,
        transactionDate: '2004-06-12T19:30'
      },
    ],
    payers: [
      'DANNON',
      'UNILEVER'
    ],
    payerBalances: {
      'DANNON': 6000,
      'UNILEVER': 50      
    },
    balance: 6050
  }
};

const providedCase = {
  '1': {
    name: 'Jordan',
    transactions: [
      {
        payer: 'DANNON',
        points: 300,
        transactionDate: '2000-06-12T19:30'
      },
      {
        payer: 'UNILEVER',
        points: 200,
        transactionDate: '2001-06-12T19:30'
      },
      {
        payer: 'DANNON',
        points: -200,
        transactionDate: '2002-06-12T19:30'
      },
      {
        payer: 'MILLER COORS',
        points: 10000,
        transactionDate: '2003-06-12T19:30'
      },
      {
        payer: 'DANNON',
        points: 1000,
        transactionDate: '2004-06-12T19:30'
      },
    ],
    payers: [
      'DANNON',
      'UNILEVER',
      'MILLER COORS'
    ],
    payerBalances: {
      'DANNON': 1200,
      'UNILEVER': 200,
      'MILLER COORS': 10000       
    },
    balance: 11300
  }
};

module.exports = {
  edgeCase,
  edgeCaseTwo,
  providedCase
}