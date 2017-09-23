'use strict';

var expect = require('chai').expect,
    fhyper = require('../fhyper'),
    dump = require('../lib/fhyper-dump');

describe('fhyper', function () {
    it('n0', function (done) {
        var g = fhyper();
        expect(g.nodes.length).to.eq(0);
        g();
        expect(g.nodes.length).to.eq(1);
        dump(g);
        done();
    });
    it('n0 n1 n2', function (done) {
        var g = fhyper();
        expect(g.nodes.length).to.eq(0);
        g(); g(); g();
        expect(g.nodes.length).to.eq(3);
        dump(g);
        done();
    });
    it('n0 -e0->', function (done) {
        var g = fhyper();
        expect(g.edges.length).to.eq(0);
        g()();
        expect(g.edges.length).to.eq(1);
        dump(g);
        done();
    });
    it('n0 -e0-> (n1 n2 n3) ', function (done) {
        var g = fhyper();
        expect(g.nodes.length).to.eq(0);
        expect(g.edges.length).to.eq(0);

        g()()(g())(g())(g());

        expect(g.nodes.length).to.eq(4);
        expect(g.edges.length).to.eq(1);
        dump(g);
        done();
    });
    it('n0 -e0-> n1 -e1-> n2 -e2-> n3) ', function (done) {
        var g = fhyper();
        expect(g.nodes.length).to.eq(0);
        expect(g.edges.length).to.eq(0);

        var n0 = g();
        var n1 = g();
        var n2 = g();
        var n3 = g();

        n0()(n1);
        n1()(n2);
        n2()(n3);

        expect(g.nodes.length).to.eq(4);
        expect(g.edges.length).to.eq(3);
        dump(g);
        done();
    });
});

/* eslint-env mocha */
