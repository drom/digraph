'use strict';

var expect = require('chai').expect,
    digraph = require('../lib');

describe ('digraph', function () {
    var g1, a, b, c, d;

    beforeEach (function () {
        g1 = digraph();
        a = g1.add.node();
        b = g1.add.node();
        c = g1.add.node(); c.id = 'c';
        d = g1.add.node();
        g1.add.edge(a, b);
        g1.add.edge(b, c);
        g1.add.edge(c, a);
        g1.add.edge(b, d);
    });

    it ('count edges', function () {
        expect(g1.get.edges().length).to.equal(4);
    });

    it ('count nodes', function () {
        expect(g1.get.nodes().length).to.equal(4);
    });

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
            nodes: [{}, {}, {id:'c'}, {}]
        });
    });

    it ('export dot', function () {
        expect(g1.export.dot()).to.equal('digraph {\n  _0 -> _1\n  _1 -> c\n  c -> _0\n  _1 -> _3\n}\n');
    });

});
