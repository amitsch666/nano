const path = require('path')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv').config()

module.exports = {
	distDir: '.build',
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)$/,
        loader: 'emit-file-loader',
        options: {
					name: path.join('dist', '[path][name].[ext]')
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract([
					{
						loader: 'css-loader',
						options: {
							sourceMap: false,
              minimize: true
						}
					},
					'postcss-loader',
          {
						loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          },
        ])
      },
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff&outputPath=static/'
			},
			{
				test: /\.(svg|ttf|eot)$/i,
				loader: 'file-loader?outputPath=static/'
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loaders: [
					'file-loader?outputPath=static/',
					'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			},
    )
		config.plugins.push(
			new ExtractTextPlugin({
				filename: path.join('static', 'main.css')
			}),
			new webpack.DefinePlugin({
				'process.env.MY_NAME': JSON.stringify(process.env.MY_NAME),
        'process.env.MY_CITY': JSON.stringify(process.env.MY_CITY)
			})
		)
    return config
  }
}
