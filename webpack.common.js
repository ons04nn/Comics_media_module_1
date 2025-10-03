const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

const fs = require('fs'); // импорт fs

// функция для рекурсивного поиска всех HTML в src
function getHtmlPages(dir) {
  const entries = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  items.forEach(item => {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      entries.push(...getHtmlPages(fullPath));
    } else if (item.name.endsWith('.html')) {
      entries.push(fullPath);
    }
  });
  return entries;
}

// список всех HTML-файлов
const htmlFiles = getHtmlPages(path.resolve(__dirname, 'src'));

// создаём массив HtmlWebpackPlugin
const htmlPlugins = htmlFiles.map(filePath => {
  const filename = path.relative(path.resolve(__dirname, 'src'), filePath);
  return new HtmlWebpackPlugin({
    template: filePath,
    filename
  });
});




module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),

  ...htmlPlugins,  // ✅ все HTML автоматически

  new HtmlWebpackPartialsPlugin([
    {
      path: path.join(__dirname, './src/partials/analytics.html'),
      location: 'analytics',
      template_filename: '*',
      priority: 'replace'
    }
  ])
],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}