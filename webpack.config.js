/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//const { dirname } = require('node:path');
const CopyWebpackPlugin =  require('copy-webpack-plugin');



const isProd = process.env.NODE_ENV === 'production';

const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'last 2 versions, ie 11',
        modules: false,
      },
    ],
  ],
};

const config = {
  mode: isProd ? 'production' : 'development',
  context: path.resolve(__dirname, '../src'),
  resolve: {
    extensions: ['.ts', '.js',".html"]
   // modules: ['src']
  },
  entry: {
    index: [path.join(__dirname,'index.ts'), path.join(__dirname,'index.html')]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        use: [ { loader: 'html-loader' } ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },


  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      title: 'Phaser Webpack Template',
      appMountId: 'app',
      filename: 'index.html',
      inlineSource: '.(js|css)$',
      minify: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets',
          to: 'assets',
        },
      ],
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 5000,
    inline: true,
    hot: true,
    overlay: true,
  },
};

module.exports = config;