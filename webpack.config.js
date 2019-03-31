//由于webpack是基于Node进行构建的，所有webpack的配置文件中，任何合法的Node代码都是支持的
var path = require('path');
//如果要配置插件，需要在导出的对象中，挂载一个plugins节点
var htmlWebpackPlugin = require('html-webpack-plugin');	//使用html-webpack-plugin之后不需要手动引入js路径了，这个插件会自动帮助引入
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//当以命令行形式运行webpack或webpack-dev-server的时候，工具会发现，我们并没有提供要打包文件的入口和出口文件，此时他会检查项目根目录的配置文件，并读取这个文件，就拿到了导出的这个配置对象，然后根据这个对象进行打包构建
module.exports = {
	entry: './src/index.js',  //指定入口文件名称
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'  //指定输出文件名称
	},
	plugins:[//所有webpack插件的配置节点
		new htmlWebpackPlugin({		//创建一个在内存中生成的HTML页面的插件
			template:path.join(__dirname,'./src/index.html'),//指定模板文件路径
			filename:'index.html'//设置生成的内存页面的名称
		}),
		new VueLoaderPlugin()
		//	. 参考官方文档 https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required
		// . Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
	],
	module:{//这个节点用于配置所有第三方模块加载器
		rules: [//所有第三方模块的匹配规则
			{test: /\.css$/, use: ['style-loader','css-loader']},//配置处理.css结尾的第三方loader
			{test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=8096'},//默认情况下，webpack无法处理css文件中的url地址，不管是图片还是字体库，只要是url都处理不了
			//limit给定的值是图片的大小，单位是byte，如果我们引用的图片给定的limit值则不会被转为base64格式的字符串，如果图片小于给定的limit值则被转为base64的字符串
			{test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},//处理字体文件的loader
			{test: /\.js$/, use: "babel-loader", exclude: /node_modules/},
			{test: /\.vue$/, use: "vue-loader"}//处理.vue文件的loader
		]
	//	注意：webpack处理第三方文件类型的过程：
	//	1.发现这个要处理的文件不是JS文件，然后就去配置文件中，查找有没有对应的第三方loader规则
	//	2.如果能找到对应的规则，就会调用对应的loader处理这种文件类型
	//	3.在调用loader的时候，是从后往前调用的
	//	4.当最后一个loader调用完毕，会把处理的结果直接交给webpack进行打包合并，最终输出到bundle.js中去
	}
	// ,resolve: {
	// 	alias: {
	// 		"vue$":"vue/dist/vue.js"//修改包的路径
	// 	}
	// }
};