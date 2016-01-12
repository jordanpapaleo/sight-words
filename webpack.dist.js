var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

module.exports = {
  entry: {
    app: './src'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?optional[]=runtime',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|mp4)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.jsx$/,
        loader: 'babel?optional[]=runtime',
        exclude: /node_modules/
      },
      {
        test: /\.(otf|ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'build-templates/index.html',
      inject: 'body',
      favicon: 'build-templates/favicon.ico'
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
