'use strict';

var expect = require('chai').expect,
    digraph = require('../lib');

describe ('digraph', function () {
    var g1, a, b, c, d;

    beforeEach (function () {
        g1 = digraph();
        a = g1.add.node('a');
        b = g1.add.node({ name: 'b' });
        c = g1.add.node(); c.label = 'c', c.color = 'blue';
        d = g1.add.node();
        g1.add.edge.from(a).to(b);
        var b_c = g1.add.edge.from(b).to(c); b_c.taillabel = 0;
        g1.add.edge.from(c).to(a);
        g1.add.edge.from(b).to(d);
    });

    it ('count edges', function () {
        expect(g1.edges.length).to.equal(4);
    });

    it ('count nodes', function () {
        expect(g1.nodes.length).to.equal(4);
    });

/*
    it ('in degree 1', function () {
        expect(g1.get.in.edges(a).length).to.equal(1);
    });


    it ('out degree 0', function () {
        expect(g1.get.out.edges(d).length).to.equal(0);
    });

    it ('out degree 2', function () {
        expect(g1.get.out.edges(b).length).to.equal(2);
    });

    it ('dump digraph', function () {
        expect(g1.export.obj()).to.deep.equal({
            edges: [[0, 1, {}], [1, 2, {}], [2, 0, {}], [1, 3, {}]],
            nodes: [{}, {}, {label:'c', color: 'blue'}, {}]
        });
    });

    it ('export dot', function () {
        expect(g1.export.dot()).to.equal('digraph {\n  _2 [label = c, color = blue]\n  _0 -> _1\n  _1 -> _2\n  _2 -> _0\n  _1 -> _3\n}\n');
    });
*/
});
