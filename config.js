const INITIAL_DIFFICULTY = 3;
const MINE_RATE = 1000; // 1 seconde entre chaque bloc

module.exports = {
  genesis: {
    timestamp: 1,
    lastHash: '-----',
    hash: '-----',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: 'Here the project born.',
  },
  INITIAL_DIFFICULTY,
  MINE_RATE,
};
