const gulp = require('gulp');
const webpack = require('webpack-stream');

/**
 * @param {String} src 入口js路径
 * @param {String} isProd 是否生产模式
 * @param {String} main 指定其他入口js文件
 */
function webpackEntryOption (src, isProd, main) {
  let config = isProd?require('./webpack.prod.conf.js'):require('./webpack.dev.conf.js');
  config.entry = `${src}src/${main?main:'main'}.js`;
  // config.plugins[0].outputPath = path.resolve(__dirname, src + 'dist');
  config.plugins[0].options.template = `${src}index.html`;
  // console.log(config)
  return config
}

gulp.task('dev_default_project', function () {
	return gulp.src('**/*.js', {allowEmpty: true})
			.pipe(webpack(webpackEntryOption('./project/pj1/')))
			.pipe(gulp.dest('./project/pj1/dist/'));
});
gulp.task('prod_default_project', function () {
	return gulp.src('**/*.js', {allowEmpty: true})
			.pipe(webpack(webpackEntryOption('./project/pj1/', true)))
			.pipe(gulp.dest('./project/pj1/dist/'));
});
