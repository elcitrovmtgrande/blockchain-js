const { Wallet } = require('../wallet');
const { Transaction } = require('../transaction');
const { verifySignature } = require('../util');

describe('Wallet', () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  it('has a `balance`', () => {
    expect(wallet).toHaveProperty('balance');
  });

  it('has a `publicKey`', () => {
    expect(wallet).toHaveProperty('publicKey');
  });

  describe('signing data', () => {
    const data = 'foobar';

    it('verifies a signature', () => {
      expect(verifySignature({
        publicKey: wallet.publicKey,
        data,
        signature: wallet.sign(data),
      })).toBe(true);
    });

    it('does not verify an invalid signature', () => {
      expect(verifySignature({
        publicKey: wallet.publicKey,
        data,
        signature: new Wallet().sign(data),
      })).toBe(false);
    });
  });

  describe('createTransaction()', () => {
    describe(' and the amount exceeds the balance', () => {
      it('throws an error', () => {
        expect(() => wallet.createTransaction({
          amount: 1000000,
          recipient: 'mysterious-recipient',
        })).toThrow('Amount exceeds the balance');
      });
    });

    describe('and the amount is valid', () => {
      let transaction;
      let amount;
      let recipient;

      beforeEach(() => {
        amount = 50;
        recipient = 'still-anonymous-recipient';
        transaction = wallet.createTransaction({ amount, recipient });
      });

      it('created an instance of `Transaction`', () => {
        expect(transaction instanceof Transaction).toBe(true);
      });

      it('matches the transaction input with the wallet', () => {
        expect(transaction.input.address).toEqual(wallet.publicKey);
      });

      it('ouputs the amount to the recipient', () => {
        expect(transaction.outputMap[recipient]).toEqual(amount);
      });
    });
  });
});
