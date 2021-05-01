const { TransactionPool, Transaction } = require('../transaction');
const { Wallet } = require('../wallet');

describe('TransactionPool', () => {
  let transactionPool;
  let transaction;
  let senderWallet;

  beforeEach(() => {
    transactionPool = new TransactionPool();
    senderWallet = new Wallet();
    transaction = new Transaction({
      senderWallet,
      recipient: 'mock-recipient',
      amount: 50,
    });
  });

  describe('setTransaction()', () => {
    it('adds a transaction', () => {
      transactionPool.setTransaction(transaction);

      expect(transactionPool.transactionMap[transaction.id])
        .toBe(transaction);
    });
  });

  describe('existingTransaction()', () => {
    it('returns an existing transaction giving an input address', () => {
      transactionPool.setTransaction(transaction);

      expect(
        transactionPool.existingTransaction({ inputAddress: senderWallet.publicKey }),
      ).toBe(transaction);
    });
  });
});
