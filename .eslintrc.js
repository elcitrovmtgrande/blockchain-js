module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['jest'],
  rules: {
    'operator-assignment': 0,
    'class-methods-use-this': 0,
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
  },
};
