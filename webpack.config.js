var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
      app:'./src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'js/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                      loader: 'postcss-loader',
                      options: {
                        sourceMap: true
                      }
                    }
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                      loader: 'postcss-loader',
                      options: {
                        sourceMap: true
                      }
                    }
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                      loader: 'postcss-loader',
                      options: {
                        sourceMap: true
                      }
                    },
                    'sass-loader?indentedSyntax'
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            {
                              loader: 'postcss-loader',
                              options: {
                                sourceMap: true
                              }
                            },
                            'sass-loader?indentedSyntax'
                        ],
                        'scss': process.env.NODE_ENV === 'production' ?
                          ExtractTextPlugin.extract({
                              fallback: 'vue-style-loader',
                              use:[
                                'css-loader',
                                'sass-loader',
                                {
                                  loader: 'postcss-loader',
                                  options: {
                                    sourceMap: true
                                  }
                                }
                              ],
                              publicPath: "../"
                          }) : [
                           'vue-style-loader',
                           'css-loader',
                           'sass-loader',
                           {
                             loader: 'postcss-loader',
                             options: {
                               sourceMap: true
                             }
                           },
                       ]

                    },
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // {
            //     test: /\.(png|jpg|gif|svg)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: 'img/[name].[ext]?[hash]'
            //     }
            // },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'img/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'fonts/[name].[hash:7].[ext]'
                }
            },
        ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'src': path.resolve(__dirname, 'src'),
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
      new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            chunksSortMode: 'dependency'
      }),

    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        proxy: [{
          context: [ //代理路径
            
          ],
          target: '',
          secure: false,
          changeOrigin: true,
        }]
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    // module.exports.devtool = '#source-map'
    module.exports.devtool = 'none'
    module.exports.output.publicPath = './'
    module.exports.output.filename = 'js/[name].[chunkhash].js'
    module.exports.output.chunkFilename = 'js/[name].[chunkhash].min.js'
    // http://vue-loader.vuejs.org/en/workflow/production.html

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
          name: "vendor",
          minChunks: function(module){
            return module.context && module.context.includes("node_modules");
          }
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: "manifest",
          minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'app',
          async: 'vendor-async',
          children: true,
          minChunks: 3
        }),
        new ExtractTextPlugin("css/[name].[contenthash].css"),
        new CleanWebpackPlugin('./dist')
    ])
}
