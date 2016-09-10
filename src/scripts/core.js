/**
 * 核心类
 */
import d3 from "d3";
import {isObject, isArray, isFunction} from "./tools.js"

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

export function build(selector) {
	return zgCharts.build(selector);
};

export function extend(obj) {
	return zgCharts.extend(obj);
};

export function init(obj) {
	return zgCharts;
}

export default zgCharts

