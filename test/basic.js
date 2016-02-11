'use strict';

var expect = require('chai').expect,
    digraph = require('../lib');

describe ('digraph', function () {
    var g1, a, b, c, d;

    beforeEach (function () {
        g1 = digraph();
        a = g1.add.node();
        b = g1.add.node();
        c = g1.add.node();
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

    it ('dump digraph', function () {
        expect(g1.dump()).to.deep.equal({
            edges: [[0, 1, {}], [1, 2, {}], [2, 0, {}], [1, 3, {}]],
            nodes: [{}, {}, {}, {}]
        });
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

});
