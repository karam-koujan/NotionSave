const path = require('path');

module.exports = {
  entry: {
    content: "./src/content.js",
    popup: "./src/popup.js"
  },
  watch: true,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'scripts'),
  },
};