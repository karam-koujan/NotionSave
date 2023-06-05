const path = require('path');

module.exports = {
  entry: './src/index.js',
  watch: true,
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, 'scripts'),
  },
};