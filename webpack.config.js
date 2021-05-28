const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] }
		]
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'app/index.html'
		})
	]
}

// DEPENDENCIES:
// @babel/core
// @babel/preset-env - allows you to target older browsers/envs so that babel can transpile your html to versions that are supported for those targets.
// @babel/preset-react - allows babel to transpile JSX.
// babel-loader
// css-loader - transforms any CSS imports into 'require' syntax
// html-webpack-plugin - injects an html file into dist with the bundle <script> already inserted where appropriate.
// style-loader - takes required CSS and inlines it into the HTML so they are directly active
// webpack
// webpack-cli
// webpack-dev-server - starts up a dev server that hot-reloads changes