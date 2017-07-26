const path = require('path')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	distDir: '.build',
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)$/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.s(a|c)ss$/,
        use: ExtractTextPlugin.extract([
					// 'babel-loader',
					// 'raw-loader',
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
				test: /\.(woff|svg|ttf|eot)$/i,
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
				filename: '/static/main.css',
			}),
		)
    return config
  }
}
