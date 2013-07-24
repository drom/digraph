var digraph = digraph || function () {
	var g = {
		node_count : 0,
		node_indx  : {}, // {a:0, b:1, c:2}
		edge_from  : [], // [{1:{}, 2:{}}, {2:{}}, {}]
		edge_toto  : [], // [{}, {0:true}, {0:true,1:true}]
		node_attr  : [], // [{}, {}, {}]
	};
	function has_node (name) {
		return g.node_indx[name] !== undefined || false;
	};
	function has_edge (nn) {
		var a, b;
		if (a = g.edge_from[nn[0]] === undefined) { return false; };
		if (b = a[nn[1]] === undefined) { return false; }
		return b;
	};
	function add_node (name) {
		var i;
		if (!has_node(name)) {
			i = g.node_count++;
			g.node_indx[name] = i;
			g.node_attr[i] = {};
		}
		console.log('Node: ', name);
	};
	function add_edge (aname) {
		var fr, to;
		aname.forEach(add_node);
		fr = g.node_indx[aname[0]];
		to = g.node_indx[aname[1]];
		if (!has_edge([fr, to])) {
			g.edge_from[fr] = g.edge_from[fr] || {};
			g.edge_from[fr][to] = {};
			g.edge_toto[to] = g.edge_toto[to] || {};
			g.edge_toto[to][fr] = true;
		};
		console.log('Edge: ', aname);
	};
	function add_obj (obj) {
		var name;
		obj += '';
		name = obj.split(/ +/);
		if (name.length === 1) {
			add_node(name[0]);
		} else {
			add_edge(name);
		};
	};
	function add_attr (obj) {
		var e;
		for (e in obj) {
			add_obj(e);
			console.log('Attr: ', e, obj[e]);
		}
	};
	function single_add (obj) {
		var otype;
		if (typeof obj === 'object') {
			otype = Object.prototype.toString.call(obj);
			if (otype === '[object Object]') {
				add_attr(obj);
			} else if (otype === '[object Array]') {
				obj.forEach(single_add);
			} else {
				console.log('Error: can not add: ', otype, obj);
			};
			return;
		};
		add_obj(obj);
	};
// public API
	g.add = function (obj) {
		if (Object.prototype.toString.call(obj) === '[object Array]') {
			obj.forEach(single_add);
			return;
		};
		return single_add(obj);
	};
	return g;
};
