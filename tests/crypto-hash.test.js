const cryptoHash = require('../util/crypto-hash');

describe('cryptoHash()', () => {
  it('generates a SHA-256 hashed output', () => {
    expect(cryptoHash('data'))
      .toEqual('3a6eb0790f39ac87c94f3856b2dd2c5d110e6811602261a9a923d3bb23adc8b7');
  });

  it('produces the same hash with the same input arguments in any order', () => {
    expect(cryptoHash('one', 'two', 'three'))
      .toEqual(cryptoHash('three', 'one', 'two'));
  });
});
