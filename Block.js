const { genesis } = require('./config');

/**
 * A block is a unit storage of data
 */
class Block {
  constructor({timestamp, lastHash, hash, data}) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis() {
    return new this(genesis);
  }

  static mineBlock({ lastBlock, data }) {
    return new this({
      timestamp: Date.now(),
      lastHash: lastBlock.hash,
      hash: '-----',
      data,
    });
  }
}

module.exports = Block;
