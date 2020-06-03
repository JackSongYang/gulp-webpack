const HtmlWebpackPlugin = require('html-webpack-plugin');

class InsertHtmlCodePlugin {
  constructor (options) {
    this.options = options;
  }

  apply (compiler) {
    const minimize = this.options.minimize;
    const code = this.options.scriptCode;
    const paths = this.options.scriptPaths;
    compiler.hooks.compilation.tap('InsertHtmlCodePlugin', compilation => {
      if (paths && paths.length > 0) {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync('InsertHtmlCodePlugin', (htmlCodeData, callback) => {
          paths.forEach(item => {
            htmlCodeData.assetTags.scripts.unshift({
              tagName: 'script',
              voidTag: false,
              attributes: { defer: false, src: item }
            });
          });
          callback(null, htmlCodeData);
        });
      }
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('InsertHtmlCodePlugin', (htmlCodeData, callback) => {
        let newHtmlCode = htmlCodeData.html.replace(/<\/body>|<\/html>/g, '');
        newHtmlCode += (code + (minimize ? '</body></html>' : '\n</body>\n</html>'));
        htmlCodeData.html = newHtmlCode;
        callback(null, htmlCodeData);
      });
    });
  }
}

module.exports = InsertHtmlCodePlugin;
