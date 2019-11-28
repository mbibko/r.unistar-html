const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || "development";
const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;

let config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    chunkFilename: NODE_ENV == 'development' ? 'js/chunks/[name].js' : 'js/chunks/[name].[contenthash].js',
    // publicPath: "/"
  },
  // externals: {
  //   tns: 'tns'
  // },
  mode: NODE_ENV,
  devtool: NODE_ENV == "development" ? "source-map" : "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    overlay: true,
    hot: true,
    watchContentBase: true,
    host: "0.0.0.0",
    stats: {
      all: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      moduleTrace: true,
      errorDetails: true
    }
  },
  resolve: {
    alias: {
      'images' : path.resolve(__dirname, 'src/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src/pug'),
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: false,
              collapseWhitespace: false,
              attrs: ['img:src', ':data-src', 'source:src', 'video:src', 'audio:src']
            }
          },
          {
            loader: 'pug-html-loader'
          }
        ]
      },
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src/components'),
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: false,
              collapseWhitespace: false,
              attrs: ['img:src', ':data-src', 'source:src', 'video:src']
            }
          },
          {
            loader: 'pug-html-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: path.resolve(__dirname, 'src/images/sprite-images'),
        // options: {
        //   esModule: false,
        //   extract: false,
        // }
      },
      {
        test: /\.m?js$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    ["@babel/preset-env"]
                ],
            }
        }
      },
      {
        test: /\.svg(\?.*)?$/, // match img.svg and img.svg?param=value
        exclude: path.resolve(__dirname, 'src/images/sprite-images'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: "[path][name].[ext]"
            }
          },
          'svg-transform-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: NODE_ENV == 'development',
              reloadAll: true,
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
        ]
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: NODE_ENV == 'development',
              reloadAll: true,
            },
          },
          // "style-loader",
          { loader: 'css-loader', options: { importLoaders: 1 } },
          "postcss-loader", 
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["src/components", "src/sass"]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|woff|woff2|gif|mp4|mp3)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              fallback: 'file-loader',
              limit: 8192,
              context: "src",
              outputPath: (url) => {
                if (/components/.test(url)) {
                  return `images/${url}`;
                }
                return url;
              },
              name: "[path][name].[ext]"
            }
          },
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     disable: NODE_ENV == 'development'
          //   },
          // },
        ]
      }
    ]
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   tns: 'tiny-slider/src/tiny-slider'
    // }),
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new CopyWebpackPlugin([
        // { from: './app/dinamic-links.js', to: '.' },
        { from: './src/player.mp3', to: '.' },
        { from: './src/ajax.pages_list.php', to: '.' },
        { from: './src/favicon.ico', to: '.' },
        { from: './src/images/logo.jpg', to: './images' },
        { from: './src/js/audio.min.js', to: './js' },
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(generateHtmlPlugins('./src/pug').concat(new HtmlBeautifyPlugin()))
};

module.exports = (env, argv) => {
  if(NODE_ENV == 'production') {
    config.plugins.push(new CleanWebpackPlugin())
    // config.plugins.push(new CssoWebpackPlugin())
  }
  return config;
};

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    return new HtmlWebpackPlugin({
      filename: `${parts[0]}.html`,
      template: `./src/pug/${parts[0]}.pug`,
      inject: false,
    })
  })
}
