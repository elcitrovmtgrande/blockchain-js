const INITIAL_DIFFICULTY = 3;
const MINE_RATE = 1000; // 1 seconde entre chaque bloc
const STARTING_BALANCE = 1000;
const REWARD_INPUT = {
  address: '*authorized-reward*',
};
const MINING_REWARD = 50;

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
  STARTING_BALANCE,
  REWARD_INPUT,
  MINING_REWARD,
};
