const { STARTING_BALANCE } = require('../config');
const { ec, cryptoHash } = require('../util');
const { Transaction } = require('../transaction');

class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE;

    this.keyPair = ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    return this.keyPair.sign(cryptoHash(data));
  }

  createTransaction({ recipient, amount }) {
    if (amount > this.balance) {
      throw new Error('Amount exceeds the balance');
    }
    return new Transaction({
      senderWallet: this,
      recipient,
      amount,
    });
  }

  static calculateBalance({ chain, address }) {
    let outputsTotal = 0;

    for (let i = 0; i < chain.length; i++) {
      const block = chain[i];

      if (block.data && typeof block.data === 'object') {
        for (const transaction of block.data) {
          const addressOutput = transaction.outputMap[address];

          if (addressOutput) {
            outputsTotal = outputsTotal + addressOutput;
          }
        }
      }
    }
    return STARTING_BALANCE + outputsTotal;
  }
}

module.exports = Wallet;
