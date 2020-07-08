const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const LodashWebpackPlugin = require("lodash-webpack-plugin");
const notifier = require("node-notifier");
const InsertHtmlPlugin = require("./public/insert-html-code-plugin");
const statistics = require("./public/statisticsTemplate");

module.exports = {
  mode: "development",
  output: {
    filename: "build.js",
    globalObject: "this"
  },
  stats: {
    children: false // Tells stats whether to add information about the children.
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      meta: false
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new LodashWebpackPlugin(),
    new FriendlyErrorsPlugin({
      //  运行错误
      onErrors: function (severity, errors) {
        // 可以收听插件转换和优先级的错误
        // 严重性可以是"错误"或"警告"
        if (severity !== "error") {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: "Webpack error",
          message: severity + ": " + error.name,
          subtitle: error.file || ""
        });
      },
      // 是否每次编译之间清除控制台
      // 默认为true
      clearConsole: true
    }),
    new InsertHtmlPlugin({
      minimize: false,
      scriptCode: statistics,
      scriptPaths: [
        'https://cdn.bootcdn.net/ajax/libs/jquery/1.8.2/jquery.min.js'
      ]
    }),
    new webpack.HotModuleReplacementPlugin() // webpack内置的热更新插件
  ],
  externals: {
    jquery: "jQuery"
  },
  resolve: {
    extensions: [".vue", ".js", ".scss", ".sass", ".less", ".css", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: (loader) => [
                require("postcss-import")({
                  root: loader.resourcePath
                }),
                require("postcss-preset-env")(),
                require("cssnano")()
              ],
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          "vue-style-loader",
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: (loader) => [
                require("postcss-import")({
                  root: loader.resourcePath
                }),
                require("postcss-preset-env")(),
                require("cssnano")()
              ],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          "vue-style-loader",
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: (loader) => [
                require("postcss-import")({
                  root: loader.resourcePath
                }),
                require("postcss-preset-env")(),
                require("cssnano")()
              ],
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        use: [{
          loader: "eslint-loader",
          options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
            formatter: require("eslint-friendly-formatter") // 指定错误报告的格式规范
          }
        }],
        enforce: "pre", // 编译前检查
        exclude: [/node_modules/] // 不检测的文件
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.(png|jp?g|gif|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 小于8192字节的图片打包成base 64图片
              name: "images/[name].[hash:8].[ext]",
              publicPath: "./",
              esModule: false
            }
          }
        ]
      },
      {
        // 文件依赖配置项——字体图标
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [{
          loader: "file-loader",
          options: {
            limit: 8192,
            name: "fonts/[name].[hash:8].[ext]",
            publicPath: "./"
          }
        }]
      },
      {
        // 文件依赖配置项——音频
        test: /\.(wav|mp3|ogg)?$/,
        use: [{
          loader: "file-loader",
          options: {
            limit: 8192,
            name: "audios/[name].[hash:8].[ext]",
            publicPath: "./"
          }
        }]
      },
      {
        // 文件依赖配置项——视频
        test: /\.(ogg|mpeg4|webm|mp4)?$/,
        use: [{
          loader: "file-loader",
          options: {
            limit: 8192,
            name: "videos/[name].[hash:8].[ext]",
            publicPath: "./"
          }
        }]
      },
      {
        test: /\.(html)?$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: false
          }
        }
      }
    ]
  }
};
