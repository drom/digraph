'use strict';

var expect = require('chai').expect,
    digraph = require('../lib');

describe ('digraph', function () {
    var g1, a, b, c, d;

    beforeEach (function () {
        g1 = digraph();
        a = g1.node('a');
        b = g1.node({ name: 'b' });
        c = g1.node(); c.label = 'c', c.color = 'blue';
        d = g1.node();
        g1.edge(a)(b);
        var b_c = g1.edge(b)(c); b_c.taillabel = 0;
        g1.edge(c)(a);
        g1.edge(b)(d);
    });

    it ('count edges', function () {
        expect(g1.get.edges.length).to.equal(4);
    });

    it ('count nodes', function () {
        expect(g1.get.nodes.length).to.equal(4);
    });

    it ('in degree of a', function () {
        expect(a.edges.from.length).to.equal(1);
    });

    it ('in degree of a (bis)', function () {
        expect(g1.edges.from(a).length).to.equal(1);
    });

    it ('out degree of b', function () {
        expect(d.edges.to.length).to.equal(0);
    });

    it ('out degree of b (bis)', function () {
        expect(g1.edges.to(b).length).to.equal(2);
    });

    it ('added the same edge again', function () {
        g1.edge(a)(b);
        expect(g1.get.edges.length).to.equal(4);
    });

});
/* eslint-env mocha */
