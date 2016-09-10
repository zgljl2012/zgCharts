import d3 from "d3";
import zgCharts from "./core.js"
import { px2num } from "./tools.js"
/*
直方图
*/
var htm = function(dataset) {
	var zg = zgCharts,
		svg = zg.svg,
		w = svg.style("width"),
		h = svg.style("height");
	h = px2num(h)
	w = px2num(w)
	console.log(dataset)
	svg.selectAll("rect").data(dataset).enter()
		.append("rect")
		.attr("width", function(d, i){
			return 10;
		})
		.attr("height", function(d){
			return d*20;
		})
		.attr("fill", "#00ff00")
		.attr("x", function(d, i) {
			return i*20;
		})
		.attr("y", function(d, i) {
			return h - d*20;
		});
};

export

function histogram(dataset) {
	return htm(dataset);
};