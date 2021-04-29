const Block = require('../Block');
const { genesis } = require('../config');

describe('Block', () => {
  const timestamp = 'a-date';
  const lastHash = 'foo-hash';
  const hash = 'bar-hash';
  const data = ['pommes', 'fraises', { name: 'Banane', price: '4'}];
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data,
  });

  it('has a timestamp, lastHash, hash and data property', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe('genesis()', () => {
    const genesisBlock = Block.genesis();

    it('returns a Block instance', () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it('returns genesis data', () => {
      expect(genesisBlock).toEqual(genesis);
    });
  });

  describe('mineBlock()', () => {
    const lastBlock = Block.genesis();
    const data = 'mined data';
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it('returns a Block instance', () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
      expect(minedBlock.lastHash).toBe(lastBlock.hash);
    });

    it('sets the `data`', () => {
      expect(minedBlock.data).toBe(data);
    });

    it('sets the `timestamp`', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });
  });

});
