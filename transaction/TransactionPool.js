const Transaction = require('./Transaction');

class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  setTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }

  existingTransaction({ inputAddress }) {
    const transactions = Object.values(this.transactionMap);

    return transactions.find((transaction) => transaction.input.address === inputAddress);
  }

  setMap(transactionPoolMap) {
    this.transactionMap = transactionPoolMap;
  }

  validTransactions() {
    return Object.values(this.transactionMap)
      .filter((transaction) => Transaction.validTransaction(transaction));
  }
}

module.exports = TransactionPool;
