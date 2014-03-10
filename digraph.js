var digraph = digraph || {
	random: function () {
		this.node_indx = {a:0, b:1, c:2};
		this.edge_from = [{1:{}, 2:{}}, {2:{}}, {}];
		this.edge_toto = [{}, {0:true}, {0:true,1:true}];
		this.node_attr = [{}, {}, {}];
	},
	vertices: function () {
		var k, res = [];
		for (k in this.node_indx) {
			res.push(k);
		}
		return res;
	},
	edges: function  () {
		var i, ilen, edges, k, res = [];
		ilen = this.edge_from.length;
		for (i = 0; i < ilen; i++) {
			edges = this.edge_from[i];
			for (k in edges) {
				res.push([i, k]);
			}
		}
		return res;
	},
	in_degree: function (v) {
		var vindex, edges, res;
		vindex = (this.node_indx[v])|0;
		edges  = this.edge_from [vindex];
		res = (Object.keys(edges).length)|0;
		return res;
	},
	out_degree: function (v) {
		var vindex, edges, res;
		vindex = (this.node_indx[v])|0;
		edges  = this.edge_toto [vindex];
		res = (Object.keys(edges).length)|0;
		return res;
	},
	edges_at: function (v) {
		var edges = [];
		return edges;
	},
	get_vertex_attribute: function (v, label) {
		var a = '';
		return a;
	},
	get_edge_attribute: function (e, label) {
		var e = 'e';
		return a;
	},
	has_node: function (name) {
		return g.node_indx[name] !== undefined || false;
	},
	has_edge: function (nn) {
		var a, b;
		if (a = this.edge_from[nn[0]] === undefined) { return false; };
		if (b = a[nn[1]] === undefined) { return false; }
		return b;
	},
	add_node: function (name) {
		var i;
		if (!has_node(name)) {
			i = this.node_count++;
			this.node_indx[name] = i;
			this.node_attr[i] = {};
		}
		console.log('Node: ', name);
	},
	add_edge: function (aname) {
		var fr, to;
		aname.forEach(add_node);
		fr = this.node_indx[aname[0]];
		to = this.node_indx[aname[1]];
		if (!has_edge([fr, to])) {
			this.edge_from[fr] = this.edge_from[fr] || {};
			this.edge_from[fr][to] = {};
			this.edge_toto[to] = this.edge_toto[to] || {};
			this.edge_toto[to][fr] = true;
		}
		console.log('Edge: ', aname);
	},
	add_obj: function (obj) {
		var name;
		obj += '';
		name = obj.split(/ +/);
		if (name.length === 1) {
			add_node(name[0]);
		} else {
			add_edge(name);
		}
	},
	add_attr: function (obj) {
		var e;
		for (e in obj) {
			add_obj(e);
			console.log('Attr: ', e, obj[e]);
		}
	},
	single_add: function (obj) {
		var otype;
		if (typeof obj === 'object') {
			otype = Object.prototype.toString.call(obj);
			if (otype === '[object Object]') {
				add_attr(obj);
			} else if (otype === '[object Array]') {
				obj.forEach(single_add);
			} else {
				console.log('Error: can not add: ', otype, obj);
			}
			return;
		}
		add_obj(obj);
	},
	add: function (obj) {
		if (Object.prototype.toString.call(obj) === '[object Array]') {
			obj.forEach(single_add);
			return;
		}
		return single_add(obj);
	}
}

module.exports = function (obj) {
	return {
		node_count: 0,
		node_indx:  {},
		edge_from:  [],
		edge_toto:  [],
		node_attr:  [],
		random:     digraph.random,
		vertices:   digraph.vertices,
		edges:      digraph.edges,
		in_degree:  digraph.in_degree,
		out_degree: digraph.out_degree,
		add:        digraph.add
	};
}
