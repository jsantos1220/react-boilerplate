const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   //De donde va a iniciar el proyecto:
   entry: './src/index.js',
   
   //a donde se va a exportar todo el proyecto:
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js', //El nombre del archivo principal a generar
   },
   mode: 'development',
   
   //Que tipo de extensiones se van a trabajar:
   resolve: {
      extensions: ['.js', '.jsx'],
   },
   
   //Agregar las reglas de como debe operar cada dependencia
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
   })
   ],
   
   //Esto inicia el servidor para trabajar en chrome
   devServer: {
   // contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3006,
    static: './'
  }
}