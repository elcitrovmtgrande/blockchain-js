/* eslint-disable no-plusplus */
/* eslint-disable no-const-assign */
const { genesis, MINE_RATE } = require('./config');
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
    const lastHash = lastBlock.hash;
    // const timestamp = Date.now();
    let { difficulty } = lastBlock;
    let nonce = 0;

    do {
      // todo
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp });
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

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;
    const difference = timestamp - originalBlock.timestamp;
    if (difficulty < 1) return 1;
    if (difference > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}

module.exports = Block;
