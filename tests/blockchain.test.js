const Blockchain = require('../Blockchain');
const Block = require('../Block');

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain.addBlock({ data: 'Pomme' });
    blockchain.addBlock({ data: 'Cerise' });
    blockchain.addBlock({ data: { name: 'Fraise', price: 5 } });
  });

  it('contains a `chain` Array instance', () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it('starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block to the chain', () => {
    const newData = 'toto';
    blockchain.addBlock({ data: newData });

    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  describe('isValidChain()', () => {
    describe('when the chain does not start with the genesis block', () => {
      it('returns false', () => {
        blockchain.chain[0] = { data: 'fake-genesis' };
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe('when the chain starts with the genesis block and has multiple blocks', () => {
      describe('and a lastHash reference has changed', () => {
        it('returns false', () => {
          blockchain.chain[2].lastHash = 'broken-lastHash';
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
    });

    describe('and the chain contains a block with an invalid field', () => {
      it('returns false', () => {
        blockchain.chain[2].data = 'some-bad-and-evil-data';
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe('and the chain does not contain any invalid block', () => {
      it('returns true', () => {
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
      });
    });
  });
});
