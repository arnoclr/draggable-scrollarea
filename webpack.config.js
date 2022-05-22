const path = require('path');

const getConfig = (target, entry, filename) => {
  return {
    target,
    entry,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename,
      library: 'draggable-scrollarea',
      libraryTarget: 'umd',
    },
  };
}

const serverConfig = getConfig('node', './src/index.ts', 'index.js');
const clientConfig = getConfig('web', './src/cdn.js', 'cdn.js');

module.exports = [serverConfig, clientConfig];