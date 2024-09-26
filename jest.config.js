/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest', // Use ts-jest preset
  testEnvironment: 'node', // Set the test environment (node, jsdom, etc.)
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Supported file extensions
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore these paths
};
