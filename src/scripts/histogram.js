import d3 from "d3";
import zgCharts from "./core.js"
import { px2num } from "./tools.js"
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

export

function histogram(dataset) {
	return htm(dataset);
};