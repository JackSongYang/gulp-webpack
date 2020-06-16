// const gulp = require('gulp');
const { src, dest } = require('gulp');
const webpackStream = require('webpack-stream');
const { webpackEntryOption, openWebpackDevServe } = require('../public/webpackOptionChange');
const gulpTasks = require('../gulpfile.json/project.json');

Object.keys(gulpTasks).forEach(key => {
  const path = gulpTasks[key][0];
  const outPath = gulpTasks[key][1] || 'dist';
  const main = gulpTasks[key][2] || 'main';
  const template = gulpTasks[key][3] || 'index.html';
  exports['activity2020_' + key + '_dev'] = async function () {
    openWebpackDevServe(path, outPath, main, template);
  };
  exports['activity2020_' + key + '_prod'] = function () {
    return src('**/*.js', { allowEmpty: true })
      .pipe(webpackStream(webpackEntryOption(path, outPath, true, main, template)))
      .pipe(dest(path + outPath + '/'));
  };
});
