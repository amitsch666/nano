const path = require('path')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	distDir: '.build',
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
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
          }
        ])
      }
    )
		config.plugins.push(new ExtractTextPlugin({
			filename: 'main.css',
		}))
    return config
  }
}
