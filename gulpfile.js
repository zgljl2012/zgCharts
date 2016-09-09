var fs = require("fs")
var gulp = require('gulp')
var rollup = require('rollup').rollup;
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require("rollup-plugin-node-resolve");
var dependencies = require("./package.json").dependencies;

gulp.task('build', function(){
	return rollup({
		entry:'./src/index.js',
		external: Object.keys(dependencies),
		plugins:[
			nodeResolve({jsnext:true}),
			commonjs()
		]
	}).then(function(bundle){
		// output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
        // amd – 使用像requirejs一样的银木块定义
        // cjs – CommonJS，适用于node和browserify / Webpack
        // es6 (default) – 保持ES6的格式
        // iife – 使用于<script> 标签引用的方式
        // umd – 适用于CommonJs和AMD风格通用模式
		bundle.write({
			format:"iife",
			moduleName:'zgCharts',
			dest:"build/zgCharts.js"
		});
		// 测试文件
		bundle.write({
			format:"iife",
			moduleName:'zgCharts',
			dest:"test/zgCharts.js"
		});
	});
});

// 文件监控
gulp.task("watch", function(){
	gulp.watch("./src/*.*", ["build"]);
});

// 默认任务
gulp.task("default", ["watch", "build"]);
