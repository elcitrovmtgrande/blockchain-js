/* eslint-disable no-plusplus */
/* eslint-disable no-const-assign */
const { genesis } = require('./config');
const cryptoHash = require('./util/crypto-hash');

/**
 * A block is a unit storage of data
 */
class Block {
  constructor({
    timestamp, lastHash, hash, data, nonce, difficulty,
  }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {
    return new this(genesis);
  }

  static mineBlock({ lastBlock, data }) {
    let hash;
    let timestamp;

    // const timestamp = Date.now();
    const { difficulty, hash: lastHash } = lastBlock;
    let nonce = 0;

    do {
      // todo
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }
}

module.exports = Block;
