const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const prod = process.env.NODE_ENV === 'production'

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.((woff(2)?)|ttf|eot|otf)(\?[a-z0-9#=&.]+)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Test app",
      template: 'src/index.html',
    }),
  ],
  ...(!prod
    ? {
      devServer: {
        port: 8080,
        open: false,
        hot: true,
        compress: true,
        stats: 'errors-only',
        overlay: true,
        historyApiFallback: true
      },
    }
    : {}),
}
