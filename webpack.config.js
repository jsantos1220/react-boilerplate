const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: "/",
   },
   resolve: {
      extensions: ['.js', '.jsx'],
      alias: { //Esto se usa para crear url's dinamicas
         '@components': path.resolve(__dirname, 'src/components/'),
         '@styles': path.resolve(__dirname, 'src/styles/')
      }
   },
   mode: 'production',
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
            }
         },
         {
            test: /\.html$/,
            use: [
               { loader: 'html-loader' }
            ]
         },
         {
            test: /\.s[ac]ss$/,
            use: [
               'style-loader',
               'css-loader',
               'sass-loader'
            ]
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource"
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './public/index.html',
         filename: './index.html'
      }),
      new MiniCssExtractPlugin({
         filename: '[name].css'
      }),
      new CopyPlugin({ // CONFIGURACIÓN DEL COPY PLUGIN
         patterns: [
            {
               from: path.resolve(__dirname , "src" , 'assets/images'), // CARPETA A MOVER AL DIST
               to: "assets/images" // RUTA FINAL DEL DIST
            }
         ]
      }),
      new CleanWebpackPlugin(),
   ],
   optimization: {
      minimize: true,
      minimizer: [
         new CssMinimizerPlugin(),
         new TerserPlugin(),
      ]
   }
}