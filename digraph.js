/* jshint camelcase: false, bitwise: false */
'use strict';

var digraph = digraph || {
	random: function () {
		this.v.count   = 4;
		this.v.id      = {'a':0, 'b':1, 'c':2, 'd':3};
		this.v.name    = {0:'a', 1:'b', 2:'c', 3:'d'};
		this.e.count   = 3;
		this.e.vs      = {0:[0,1], 1:[0,2], 2:[1,3]};
		this.e.o       = {0:{1:0, 2:1}, 1:{3:2}};
		this.e.i       = {1:{0:0}, 3:{1:2}, 2:{0:1}};
	},
	vertices: function () {
		var k, res = [];
		for (k in this.v.id) {
			res.push(k);
		}
		return res;
	},
	edges: function  () {
		var k, ev, e = this.e, vn = this.v.name, res = [];
		for (k in e.vs) {
			ev = e.vs[k];
			res.push([vn[ev[0]], vn[ev[1]]]);
		}
		return res;
	},
	in_degree: function (v) {
		var vid, edges, res;
		vid = this.v.id [v];
		if ('undefined' === typeof vid) { return 0; }
		edges  = this.e.i [vid];
		if ('undefined' === typeof edges) { return 0; }
		res = Object.keys(edges).length;
		return res;
	},
	out_degree: function (v) {
		var vid, edges, res;
		vid = this.v.id [v];
		if ('undefined' === typeof vid) { return 0; }
		edges  = this.e.o [vid];
		if ('undefined' === typeof edges) { return 0; }
		res = Object.keys(edges).length;
		return res;
	},
	edges_at: function (v) {
		return v;
	},
	get_vertex_attribute: function (v, label) {
		return [v,label];
	},
	get_edge_attribute: function (e, label) {
		return [e,label];
	},
	has_vertex: function (name) {
		return this.v.id[name] !== undefined || false;
	},
	has_edge: function (nn) {
		var a, b;
		if ((a = this.edge_from[nn[0]]) === undefined) { return false; }
		if ((b = a[nn[1]]) === undefined) { return false; }
		return b;
	},
	add_node: function (name) {
		var i;
		if (!this.has_node(name)) {
			i = this.node_count++;
			this.v.id[name] = i;
			this.node_attr[i] = {};
		}
		console.log('Node: ', name);
	},
	add_edge: function (aname) {
		var fr, to;
		aname.forEach(this.add_node);
		fr = this.v.id[aname[0]];
		to = this.v.id[aname[1]];
		if (!this.has_edge([fr, to])) {
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
			this.add_node(name[0]);
		} else {
			this.add_edge(name);
		}
	},
	add_attr: function (obj) {
		var e;
		for (e in obj) {
			this.add_obj(e);
			console.log('Attr: ', e, obj[e]);
		}
	},
	single_add: function (obj) {
		var otype;
		if (typeof obj === 'object') {
			otype = Object.prototype.toString.call(obj);
			if (otype === '[object Object]') {
				this.add_attr(obj);
			} else if (otype === '[object Array]') {
				obj.forEach(this.single_add);
			} else {
				console.log('Error: can not add: ', otype, obj);
			}
			return;
		}
		this.add_obj(obj);
	},
	add: function (obj) {
		if (Object.prototype.toString.call(obj) === '[object Array]') {
			obj.forEach(this.single_add);
			return;
		}
		return this.single_add(obj);
	},
	write_dot: function () {
		var k, v = this.v, e = this.e, es, ret = 'digraph g {\n';

		for (k in v.id) {
			ret += '  ' + k + ';\n';
		}
		for (k in e.vs) {
			es = e.vs[k];
			ret += '  ' + v.name[es[0]] + ' -> ' + v.name[es[1]] + ';\n';
		}
		ret += '}';
		return ret;
	}
};

module.exports = function () {
	return {
		v: {count:0, id:{}, name:{}},
		e: {count:0, vs:{}, o:{}, i:{}},
		random:     digraph.random,
		has_vertex: digraph.has_vertex,
		has_edge:   digraph.has_edge,
		vertices:   digraph.vertices,
		edges:      digraph.edges,
		in_degree:  digraph.in_degree,
		out_degree: digraph.out_degree,
		add:        digraph.add,
		write_dot:  digraph.write_dot
	};
};
