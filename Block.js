const { genesis } = require('./config');
const cryptoHash = require('./util/crypto-hash');

/**
 * A block is a unit storage of data
 */
class Block {
  constructor({
    timestamp, lastHash, hash, data,
  }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis() {
    return new this(genesis);
  }

  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    return new this({
      timestamp,
      lastHash,
      hash: cryptoHash(timestamp, lastHash, data),
      data,
    });
  }
}

module.exports = Block;
