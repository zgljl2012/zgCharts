(function (exports,d3) {
'use strict';

d3 = 'default' in d3 ? d3['default'] : d3;

/**
 * 工具集合
 */

 function isObject(obj) {
 	return typeof(obj) == 'object';
 }

 function isFunction(func) {
 	return typeof(func) == "function";
 }

 // 将带像素单位的转为数字
 function px2num(px) {
 	px = px || "";
 	return px.substr(0, px.indexOf("px"));
 }

/**
 * 核心类
 */
var zgCharts = zgCharts || {};

zgCharts.extend = function(obj, override = false) {
	if(obj == null) {
		return null;
	}
	if (isObject(obj)) {
		for (var i in obj) {
			if (zgCharts[i] != null) {
				if (override) {
					zgCharts[i] = obj[i];
				}
			}
		}
	} else if (isFunction(obj)) {
		var fn = obj.name;
		if (zgCharts[fn] != null) {
			if (override) {
				zgCharts[fn] = obj;
			}
		}
	}
	return zgCharts;
}

zgCharts.build = function(selector) {
	if(selector == null) {
		zgCharts.svg = d3
			.select("body")
			.append("svg")
			.attr("class", "zgCharts-svg");
	} else {
		zgCharts.svg = d3.selector(selector);
	}
	zgCharts.extend(zgCharts.svg);
	return zgCharts;
}

function build(selector) {
	return zgCharts.build(selector);
};

function extend(obj) {
	return zgCharts.extend(obj);
};

/*
直方图
*/
var htm = function(dataset) {
	var zg = zgCharts,
		svg = zg.svg,
		padding_left = 15,
		padding_top = 20,
		w = svg.style("width"),
		h = svg.style("height");
	h = px2num(h)
	w = px2num(w)
	console.log(dataset)
	var xScale = d3.scaleLinear()
		.domain([0, dataset.length])
		.range([0, w]);
	var yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function(d){ return d; })])
		.range([0, h-padding_top])
	svg.attr("class", "histogram")
	svg.selectAll("rect").data(dataset).enter()
		.append("rect")
		.attr("width", function(d, i){
			return w/dataset.length - padding_left;
		})
		.attr("height", function(d){
			return yScale(d);
		})
		.attr("x", function(d, i) {
			return xScale(i);
		})
		.attr("y", function(d, i) {
			return h - yScale(d);
		})
	zgCharts.showLabel = function() {
		svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.text(function(d){
				return d;
			})
			.attr("x", function(d, i){
				return parseFloat(xScale(i))+parseFloat((w/dataset.length - padding_left)/3);
			})
			.attr("y", function(d, i) {
				return h - yScale(d) - 2;
			})
		return zgCharts;
	}
	return zgCharts;
};

function histogram(dataset) {
	return htm(dataset);
};

exports.build = build;
exports.extend = extend;
exports.histogram = histogram;

}((this.zgCharts = this.zgCharts || {}),d3));