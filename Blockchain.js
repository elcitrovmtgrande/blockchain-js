const Block = require('./Block');
const cryptoHash = require('./util/crypto-hash');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });

    this.chain.push(newBlock);
  }

  replaceChain(nextChain) {
    if (nextChain.length <= this.chain.length) {
      console.error('The incoming chain must be longer.');
      return;
    }
    if (!Blockchain.isValidChain(nextChain)) {
      console.error('The incoming chain must be valid.');
      return;
    }
    console.info('replacing chain by:', nextChain);

    this.chain = nextChain;
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

    for (let i = 1; i < chain.length; i += 1) {
      const {
        timestamp, lastHash, hash, data,
      } = chain[i];
      const actualLastHash = chain[i - 1].hash;

      if (lastHash !== actualLastHash) return false;

      const validatedHash = cryptoHash(timestamp, lastHash, data);

      if (hash !== validatedHash) return false;
    }

    return true;
  }
}

module.exports = Blockchain;
