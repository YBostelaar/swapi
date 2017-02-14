const path = require('path');
const HappyPack = require('happypack');
const webpack = require('webpack');
const CSSnext = require('postcss-cssnext');
const CSSimport = require('postcss-import');

module.exports = {
	name: 'client',
	entry: [
		'webpack-hot-middleware/client',
		path.resolve(__dirname, 'src'),
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist/',
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'happypack/loader',
				include: path.resolve(__dirname, 'src'),
				query: { presets: ['react-hmre'] },
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]&importLoaders=1!postcss-loader',
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				loader: 'style-loader!css-loader',
			},
			{
				test: /\.svg$/,
				loader: 'url-loader',
			},
			{
				test: /^.*fonts\/.*\.(ttf|eot|woff(2)?|svg)(\?[a-z0-9=&.]+)?(#.+)?$/,
				loader: 'file-loader',
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HappyPack({ loaders: ['babel'] }),
	],
	postcss: [
		CSSimport({
			path: ['./src/app/styles'],
		}),
		CSSnext,
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			app: path.resolve(__dirname, './src/app'),
			common: path.resolve(__dirname, './src/components/common'),
			components: path.resolve(__dirname, './src/app/components'),
			config: path.resolve(__dirname, './src/config'),
			ducks: path.resolve(__dirname, './src/app/ducks'),
			fonts: path.resolve(__dirname, './src/app/static/fonts'),
			images: path.resolve(__dirname, './src/app/static/images'),
			helpers: path.resolve(__dirname, './src/app/helpers'),
			modules: path.resolve(__dirname, './src/components/modules'),
			sagas: path.resolve(__dirname, './src/app/sagas'),
			server: path.resolve(__dirname, './src/server'),
			styles: path.resolve(__dirname, './src/app/styles'),
			vectors: path.resolve(__dirname, './src/app/static/vectors'),
		},
	},
	devtool: 'eval',
};
