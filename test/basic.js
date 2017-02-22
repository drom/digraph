'use strict';

var expect = require('chai').expect,
    digraph = require('../lib');

describe ('digraph', function () {
    var g1;

    beforeEach (function () {
        g1 = digraph();
    });

    it ('empty graph', function (done) {
        expect(g1.get.edges)  .to.be.an('array').and.to.be.empty;
        expect(g1.get.nodes)  .to.be.an('array').and.to.be.empty;
        done();
    });

    it ('single noname node', function (done) {
        var n = g1.node();

        expect(n).to.be.an('object');

        expect(g1.edges.from(n)) .to.be.an('array').and.to.be.empty;
        expect(g1.edges.to(n))   .to.be.an('array').and.to.be.empty;
        expect(g1.edges.at(n))   .to.be.an('array').and.to.be.empty;
        expect(g1.get.edges)     .to.be.an('array').and.to.be.empty;
        expect(g1.get.nodes)     .to.be.an('array').to.have.lengthOf(1);
        done();
    });

    it ('two connected nodes', function (done) {
        var a = g1.node('a');
        var b = g1.node({ name: 'b' });
        var a_b = a.edge(b);

        expect(a).to.be.an('object');
        expect(b).to.be.an('object');
        expect(a_b).to.be.an('object');

        expect(a.edges.to)       .to.be.an('array').to.have.lengthOf(1);
        expect(a.edges.from)     .to.be.an('array').and.to.be.empty;

        expect(g1.edges.to(a))   .to.be.an('array').to.have.lengthOf(1);
        expect(g1.edges.from(a)) .to.be.an('array').and.to.be.empty;

        expect(b.edges.to)       .to.be.an('array').and.to.be.empty;
        expect(b.edges.from)     .to.be.an('array').to.have.lengthOf(1);

        expect(g1.edges.to(b))   .to.be.an('array').and.to.be.empty;
        expect(g1.edges.from(b)) .to.be.an('array').to.have.lengthOf(1);

        expect(g1.get.edges)     .to.be.an('array').and.to.be.lengthOf(1);
        expect(g1.get.nodes)     .to.be.an('array').to.have.lengthOf(2);

        done();
    });

    it ('added node multiple times', function (done) {
        g1.node('a');
        g1.node('a');
        g1.node({ name: 'a'});
        g1.node({ name: 'a'});

        expect(g1.get.edges)     .to.be.empty;
        expect(g1.get.nodes)     .to.have.lengthOf(1);

        done();
    });

    it ('added edge multiple times', function (done) {
        var a = g1.node('a');
        var b = g1.node('b');
        var c = g1.node('c');
        var ddd = {};

        g1.node(ddd);
        g1.node(ddd);

        a.edge(b);
        a.edge(b);
        a.edge(b);

        a.edge(c);
        a.edge(c);

        b.edge(c);
        b.edge(c);

        expect(g1.get.edges)     .to.have.lengthOf(3);
        expect(g1.get.nodes)     .to.have.lengthOf(4);

        done();
    });

    it ('created big noname cahin', function (done) {
        var a, b, i, len = 100000;
        a = g1.node();
        for (i = 0; i < len; i++) {
            b = g1.node();
            a.edge(b);
            a = b;
        }
        expect(g1.get.edges).to.have.lengthOf(len);
        expect(g1.get.nodes).to.have.lengthOf(len + 1);
        done();
    });

    it ('created big named cahin', function (done) {
        var a, b, i, len = 100000;
        a = g1.node('a');
        for (i = 0; i < len; i++) {
            b = g1.node(i.toString());
            a.edge(b);
            a = b;
        }
        expect(g1.get.edges).to.have.lengthOf(len);
        expect(g1.get.nodes).to.have.lengthOf(len + 1);
        done();
    });

    it ('error on adding numeric node', function (done) {
        expect(function () {
            g1.node(42);
        }).to.throw(Error);
        done();
    });

    it ('error on adding edge to non-node', function (done) {
        var a = g1.node('a');
        expect(function () { a.edge(); })    .to.throw(Error);
        expect(function () { a.edge(42); })  .to.throw(Error);
        expect(function () { a.edge('b'); }) .to.throw(Error);
        done();
    });

});
/* eslint-env mocha */
