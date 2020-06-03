// const path = require("path");
// const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LodashWebpackPlugin = require("lodash-webpack-plugin");
const InsertHtmlPlugin = require("./public/insert-html-code-plugin");

module.exports = {
  mode: "production",
  // entry: "./testSelf/0303column/js/main.js",
  output: {
    filename: "build.js"
    // path:path.resolve(__dirname,"dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css（使用clean-css进行的压缩）
        minifyJS: true, // 压缩html里的js（使用uglify-js进行的压缩）
        removeAttributeQuotes: true // 移除属性的引号
      },
      hash: true,
      meta: false
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new LodashWebpackPlugin(),
    new InsertHtmlPlugin({
      minimize: true,
      scriptCode: `<script>console.log(window)</script>`,
      scriptPaths: ['https://code.jquery.com/jquery-1.12.4.min.js']
    }),
    new CleanWebpackPlugin()
  ],
  externals: {
    jquery: "jQuery"
  },
  resolve: {
    extensions: [".vue", ".js", ".scss", ".sass", ".less", ".css", ".json"],
    alias: {
      vue$: "vue/dist/vue.min.js"
    }
  },
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
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: (loader) => [
                require("postcss-import")({ root: loader.resourcePath }),
                require("postcss-preset-env")(),
                require("cssnano")()
              ]
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
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: (loader) => [
                require("postcss-import")({ root: loader.resourcePath }),
                require("postcss-preset-env")(),
                require("cssnano")()
              ]
            }
          },
          "sass-loader"
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
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: (loader) => [
                require("postcss-import")({ root: loader.resourcePath }),
                require("postcss-preset-env")(),
                require("cssnano")()
              ]
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js?$/,
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
              publicPath: "./"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              },
              disable: false
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
            name: "fonts/[name].[ext]?[hash:8]",
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
            name: "audios/[name].[ext]?[hash:8]",
            publicPath: "./"
          }
        }]
      },
      {
        // 文件依赖配置项——视频
        test: /\.(ogg|mpeg4|webm)?$/,
        use: [{
          loader: "file-loader",
          options: {
            limit: 8192,
            name: "videos/[name].[ext]?[hash:8]",
            publicPath: "./"
          }
        }]
      },
      {
        test: /\.(html)?$/,
        use: {
          loader: "html-loader",
          options: {
            // attrs: ["img:src", "img:data-src"],
            minimize: true
          }
        }
      }
    ]
  }
};
