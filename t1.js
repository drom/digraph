var digraph = require('./lib');

g1 = digraph();
g1.random();

console.log(g1.e);

console.log(g1.v);

console.log(g1.vertices());

console.log(g1.edges());

console.log(g1.write_dot());

(function(g){
	var i, ilen, vs = g.vertices();
	for (i = 0, ilen = vs.length; i < ilen; i++) {
		console.log(g.in_degree(vs[i]));
	}
})(g1);

(function(g){
	var i, ilen, vs = g.vertices();
	for (i = 0, ilen = vs.length; i < ilen; i++) {
		console.log(g.out_degree(vs[i]));
	}
})(g1);

//g2 = digraph();

//g1.random();

//console.log(g1.in_degree('b'));
//console.log(g1.out_degree('a'));
//console.log(g1);
//console.log(g2);
