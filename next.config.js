const path = require('path')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Compression = require('compression-webpack-plugin')

module.exports = {
	distDir: '.build',
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\main.(css|scss)/,
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
          { loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          },
        ])
      },
			{ test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
			{ test: /\.(ttf|eot)$/, loader: 'file-loader' },
    )
		config.plugins.push(
			new ExtractTextPlugin({
				filename: 'main.css',
			}),
			new Compression({
	      asset: '[file].gz',
	    	algorithm: 'gzip',
				minRatio: 0.8
	    })
		)
    return config
  }
}
