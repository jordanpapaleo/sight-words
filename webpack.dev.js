// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

/**
 * Make webpack config
 * @param {object} options Builder options
 * @param {boolean} options.TEST Generate a test config
 * @param {boolean} options.BUILD Generate a build config
 * @returns {object} Webpack configuration object
 */
module.exports = function makeWebpackConfig(options) {
  /**
   * Environment type
   * BUILD is for generating minified builds
   * TEST is for generating test builds
   */
  var BUILD = !!options.BUILD;
  var TEST = !!options.TEST;

  /**
   * Environment values
   */
  var NODE_ENV = process.env.NODE_ENV || 'development';

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {
    // context: __dirname//path.join(root, 'src'),
  };

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  if(TEST) {
    config.entry = {};
  } else {
    config.entry = {
      app: './src'
    };
  }

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  if (TEST) {
    config.output = {};
  } else {
    config.output = {
      // Absolute output directory
      path: __dirname + '/public',

      // Output path from the view of the page
      // Uses webpack-dev-server in development
      publicPath: BUILD ? '/' : 'http://localhost:8080/',

      // Filename for entry points
      // Only adds hash in build mode
      filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',

      // Filename for non-entry points
      // Only adds hash in build mode
      chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
    };
  }

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if(TEST) {
    config.devtool = 'inline-source-map';
  } else if(BUILD) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval';
  }

  config.externals = {
    'TweenLite': 'TweenLite',
    'responsiveVoice': 'responsiveVoice'
  };

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  // Initialize module
  config.module = {
    preLoaders: [],
    loaders: [
      {
        // JS LOADER
        // https://github.com/babel/babel-loader
        // Transpile .js files using babel-loader
        // Compiles ES6 and ES7 into ES5 code
        test: /\.js$/,
        loader: 'babel?optional[]=runtime',
        exclude: /node_modules/
      },
      {
        // CSS LOADER
        // https://github.com/webpack/css-loader
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        // LESS LOADER
        // https://github.com/webpack/less-loader
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        // URL LOADER
        // https://github.com/webpack/url-loader
        test: /\.(png|jpg|jpeg|gif|svg|mp4)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(otf|ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }/*,
      {
        test: /\.woff$/,
        loader: 'url?limit=100000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }*/
    ]
  }

  // JSX LOADER
  // Transpile .jsx files using babel-loader
  var jsxLoader = {
    test: /\.jsx$/,
    loader: 'babel?optional[]=runtime',
    exclude: /node_modules/
  };

  // Add react-hot-loader when not in build or test mode
  if (!BUILD && !TEST) {
    // Reference: https://github.com/gaearon/react-hot-loader
    // This will reload react components without refresh
    jsxLoader.loader = 'react-hot!' + jsxLoader.loader;
  }

  // Add jsxLoader to the loader list
  config.module.loaders.push(jsxLoader);

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   * Use this to tweak how webpack should handle module resolution
   */
  config.resolve = {
    // Reference: http://webpack.github.io/docs/configuration.html#resolve-extensions
    // Allows you to require files that end with .jsx without typing it
    // For example, if you have file.jsx, you can type: require('./file')
    extensions: ['', '.js', '.jsx'],
    root: [
      path.join(__dirname, 'src')
    ]
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin('[name].[hash].css', {
      disable: !BUILD || TEST
    }),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#defineplugin
    // Replace process.env.NODE_ENV with NODE_ENV in code
    // Can be used to replace other values as well
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ]

  // Skip rendering index.html in test mode
  if(!TEST) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        title: 'Web application',
        minify: BUILD
      })
    );
  }

  // Add build specific plugins
  if(BUILD) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './public',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  };

  return config;
}
