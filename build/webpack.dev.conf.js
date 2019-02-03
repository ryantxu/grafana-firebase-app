const baseWebpackConfig = require('./webpack.base.conf');

var conf = baseWebpackConfig;
conf.watch = true;
conf.mode = 'development';
conf.devtool = 'inline-source-map';

module.exports = baseWebpackConfig;
