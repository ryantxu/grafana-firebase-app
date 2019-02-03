const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const ExtractTextPluginLight = new ExtractTextPlugin('./css/firebase.light.css');
const ExtractTextPluginDark = new ExtractTextPlugin('./css/firebase.dark.css');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const packageJson = require('../package.json');

module.exports = {
  target: 'node',
  context: resolve('src'),
  devtool: "inline-source-map",
  watchOptions: {
    poll: 1000,
    ignored: ['src/**/*.js', 'node_modules']
  },
  entry: {
    './module': './module.ts',
    'panel/presence/module': './panel/presence/module.ts'
  },
  output: {
    filename: "[name].js",
    path: resolve('dist'),
    libraryTarget: "amd"
  },
  externals: [
    // remove the line below if you don't want to use buildin versions
    'jquery', 'lodash', 'moment', 'angular',
    function(context, request, callback) {
      var prefix = 'grafana/';
      if (request.indexOf(prefix) === 0) {
        return callback(null, request.substr(prefix.length));
      }
      callback();
    }
  ],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
      { from: '../README.md' },
      { from: '**/plugin.json' },
      { from: '**/*.html' },
      { from: 'components/*' },
      { from: 'dashboards/*' },
      { from: 'img/*' },
    ]),

    new ReplaceInFileWebpackPlugin([
      {
        dir: 'dist',
        files: ['plugin.json', 'panel/presence/plugin.json', 'README.md'],
        rules: [
          {
            search: '%VERSION%',
            replace: packageJson.version,
          },
          {
            search: '%TODAY%',
            replace: new Date().toISOString().substring(0, 10),
          },
        ],
      },
    ]),

    ExtractTextPluginLight,
    ExtractTextPluginDark,

    new CleanWebpackPlugin(['dist'], {
      root: resolve('.')
    }),
    new ngAnnotatePlugin()
  ],
  resolve: {
    extensions: [".js", ".ts", ".html", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loaders: [
          "ts-loader"
        ],
      },
      {
        test: /\.html$/,
        exclude: [/node_modules/],
        use: {
          loader: 'html-loader'
        },
      },
      {
        test: /\.light\.scss$/,
        exclude: [/node_modules/],
        use: ExtractTextPluginLight.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
      },
      {
        test: /\.dark\.scss$/,
        exclude: [/node_modules/],
        use: ExtractTextPluginDark.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
      }
    ]
  }
}
