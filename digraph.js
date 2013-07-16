(function () {
	var digraph = {};
	digraph.add = function (obj) {
		return obj;
	};
	if (typeof module !== undefined && module.exports) {
		module.exports = digraph;
	} else {
		root.digraph = digraph;
	};
})();
