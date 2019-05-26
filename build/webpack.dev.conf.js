const fs = require('fs')
const path = require('path')

const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
        // service worker caching
        new SWPrecacheWebpackPlugin({
          cacheId: '{{ name }}',
          filename: 'service-worker.js',
          staticFileGlobs: ['dist/sounds/**/*.{wav,mp3}', 'dist/static/**/*.{html,css,js}', 'dist/index.html', 'dist/service-worker.js'],
          minify: true,
          stripPrefix: 'dist/',
          mergeStaticsConfig: true
        }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
        './service-worker-dev.js'), 'utf-8')}</script>`
    }),
    new FriendlyErrorsPlugin(),
    new BrowserSyncPlugin({ // BrowserSync options
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        port: 3604,
        proxy: 'localhost:8102'
    }, { // plugin options
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
    }),
    new ProgressBarPlugin(),
    new WebpackNotifierPlugin({
      title: 'DreamingLab Software Solutions',
      alwaysNotify: true
    }),
        // copy custom static assets
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../sounds'),
            to: config.dev.assetsSoundsDirectory
          }
        ])
  ]
})
