const path = require('path');
// const gulp = require('gulp');
const { src, dest } = require('gulp');
const webpack = require('webpack-stream');

/**
 * @param {String} src 入口js路径
 * @param {String} isProd 是否生产模式
 * @param {String} main 指定其他入口js文件
 */
function webpackEntryOption (src, isProd, main) {
  const config = isProd ? require('./webpack.prod.conf.js') : require('./webpack.dev.conf.js');
  config.entry = `${src}src/${main || 'main'}.js`;
  config.output.path = path.resolve(__dirname, src + 'dist');
  config.plugins[0].options.template = `${src}index.html`;
  return config;
}

exports.devDefaultProject = function () {
  return src('**/*.js', { allowEmpty: true })
    .pipe(webpack(webpackEntryOption('./project/pj1/')))
    .pipe(dest('./project/pj1/dist/'));
};
exports.prodDefaultProject = function () {
  return src('**/*.js', { allowEmpty: true })
    .pipe(webpack(webpackEntryOption('./project/pj1/', true)))
    .pipe(dest('./project/pj1/dist/'));
};
