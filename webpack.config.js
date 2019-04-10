const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const {spawn} = require('child_process')
const path = require('path')

const srcPath = path.resolve(__dirname, 'src')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: srcPath,
        use: ['style-loader', {
          loader:'css-loader',
          options: {
            modules: true
          }
        }],
      },
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        use: {loader: "babel-loader"}
      },
      {
        test: /\.html$/,
        include: srcPath,
        use: [{loader: "html-loader"}]
      }
    ]
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  devtool: 'cheap-source-map',
  devServer: {
    before() {
      spawn(
        'electron',
        ['.'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
      .on('close', code => process.exit(0))
      .on('error', spawnError => console.error(spawnError))
    }
  }
};