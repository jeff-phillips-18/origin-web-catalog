'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var path = require('path');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 * Example: When the `npm run build` command is executed, the ENV will be set to `build`
 */
var ENV = process.env.npm_lifecycle_event;

function isExternal(module) {
  var userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return userRequest.indexOf('bower_components') >= 0 ||
    userRequest.indexOf('node_modules') >= 0 ||
    userRequest.indexOf('libraries') >= 0;
}

module.exports = {
  module: {
    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /.ts$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: [
          'ng-annotate-loader',
          'ts-loader'
        ]
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({fallback:'style-loader', use: 'css-loader!less-loader?indentedSyntax=true&sourceMap=true'})
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
};

/**
 * Entry
 * Reference: http://webpack.github.io/docs/configuration.html#entry
 * Should be an empty object if it's generating a test build
 * Karma will set this when it's a test build
 */
module.exports.entry = {
    'app': './src/app.ts',
    vendor: ['angular', 'angular-animate', 'angular-patternfly', 'bootstrap', 'jquery', 'logger', 'hawtioPluginLoader']
  };

/**
 * Output
 * Reference: http://webpack.github.io/docs/configuration.html#output
 * Should be an empty object if it's generating a test build
 * Karma will handle setting it up for you when it's a test build
 */
module.exports.output = {
  // Absolute output directory
  path: __dirname + '/dist',

  // Output path from the view of the page
  // Uses webpack-dev-server in development
  publicPath: 'http://localhost:8080/',

  // Filename for entry points
  // Only adds hash in build mode
  //filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
  filename: '[name].js',

  // Filename for non-entry points
  // Only adds hash in build mode
  //chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  chunkFilename: '[name].js'
};

/**
 * Devtool
 * Reference: http://webpack.github.io/docs/configuration.html#devtool
 * Type of sourcemap to use per build type
 */
module.exports.devtool = 'source-map';



/**
 * Plugins
 * Reference: http://webpack.github.io/docs/configuration.html#plugins
 * List: http://webpack.github.io/docs/list-of-plugins.html
 */
module.exports.plugins = [
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: () => [autoprefixer],
      resolve: {},
      ts: {
        configFileName: 'tsconfig.json'
      },
      tslint: {
        configuration: require('./tslint.json')
      }
    },
    debug: true
  }),
  new ExtractTextPlugin('[name].css'),
  new ngAnnotatePlugin({
    add: true
  }),
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
  new webpack.ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery',
    logger: 'logger',
    Logger: 'logger',
    term: 'term',
    hawtioPluginLoader: 'hawtioPluginLoader'
  })
];

// Add build specific plugins
module.exports.plugins.push(
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body'
  })
);

module.exports.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new CopyWebpackPlugin([
    {from: __dirname + '/assets'}
  ])
);

module.exports.resolve = {
  extensions: [
    '.webpack.js',
    '.web.js',
    '.js',
    '.ts'
  ],
  alias: {
    'logger': require.resolve('./bower_components/js-logger/src/logger'),
    'term': require.resolve('./bower_components/term.js/src/term.js'),
    'hawtioPluginLoader': require.resolve('./bower_components/hawtio-core/dist/hawtio-core.js')
  }
};

/**
 * Dev server configuration
 * Reference: http://webpack.github.io/docs/configuration.html#devserver
 * Reference: http://webpack.github.io/docs/webpack-dev-server.html
 */
module.exports.devServer = {
  contentBase: './src',
  stats: 'minimal'
};
