const defaultConfig = require('./jest.config.js');

module.exports = Object.assign({}, defaultConfig, {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}', '!**/node_modules/**', '!**/*.d.ts', '!jest.*'
  ],
});
