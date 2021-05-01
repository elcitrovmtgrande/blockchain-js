const ec = require('./ec');
const cryptoHash = require('./crypto-hash');

const verifySignature = ({ publicKey, data, signature }) => {
  const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');
  return keyFromPublic.verify(cryptoHash(data), signature);
};

module.exports = verifySignature;
