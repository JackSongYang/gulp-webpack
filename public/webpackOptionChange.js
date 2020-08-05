const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

/**
 * @param {String} src 入口js路径
 * @param {String} outPath 输出build路径
 * @param {String} isProd 是否生产模式
 * @param {String} main 指定其他入口js文件
 * @param {String} template 制定其他模板文件
 */
function webpackEntryOption (src, outPath, isProd, main, template) {
  const config = isProd ? require('../webpack.prod.conf.js') : require('../webpack.dev.conf.js');
  // config.entry = `${src}src/${main || 'main'}.js`;
  config.entry = path.resolve(__dirname, '../' + src + './src/' + (main || 'main') + '.js');
  config.output.path = path.resolve(__dirname, '../' + src + (outPath || 'dist'));
  // config.plugins[0].options.template = `${src + (template || 'index.html')}`;
  config.plugins[0].options.template = path.resolve(__dirname, '../' + src + (template || 'index.html'));
  return config;
}
exports.webpackEntryOption = webpackEntryOption;

/**
 * @param {String} src 入口js路径
 * @param {String} outPath 输出build路径
 * @param {String} main 指定其他入口js文件
 * @param {String} template 制定其他模板文件
 */
exports.openWebpackDevServe = function (src, outPath, main, template) {
  template = template || 'index.html';
  outPath = outPath || 'dist';
  const compiler = webpack(webpackEntryOption(src, outPath, false, main, template));
  // dev server配置
  const defaultServer = {
    // 伺服的directory
    contentBase: path.resolve(__dirname, '../' + src + outPath),
    compress: true,
    open: true,
    hot: true,
    // index：作为string来索引页面
    index: template,
    stats: "minimal"
  };
  console.log('Dev Server page is ' + path.resolve(__dirname, '../' + src + template));

  const serverPort = 8080;
  new WebpackDevServer(compiler, defaultServer).listen(serverPort, 'localhost', () => {
    console.log('dev server listening on port' + serverPort);
  });
};
