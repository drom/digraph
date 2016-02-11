'use strict';

function digraph () {
    var graph = {
        nodes: [],
        edges: []
    };

    function addNode (o) {
        var n = o || {};
        graph.nodes.push(n);
        return n;
    }

    function addEdge (u, v, o) {
        var e = [u, v, o || {}];
        graph.edges.push(e);
        return e;
    }

    function getEdges () { return graph.edges; }

    function getNodes () { return graph.nodes; }

    function getInEdges (n) {
        return graph.edges.reduce(function (res, e) {
            if (e[1] === n) { res.push(e); }
            return res;
        }, []);
    }

    function getOutEdges (n) {
        return graph.edges.reduce(function (res, e) {
            if (e[0] === n) { res.push(e); }
            return res;
        }, []);
    }

    function dump () {
        var edges = graph.edges.map(function (e) {
            var u, v;
            if (!graph.nodes.some(function (n, i) {
                if (n === e[0]) {
                    u = i;
                    return true;
                }
            })) {
                throw new Error();
            }

            if (!graph.nodes.some(function (n, i) {
                if (n === e[1]) {
                    v = i;
                    return true;
                }
            })) {
                throw new Error();
            }

            return [u, v, e[2]];
        });
        return {
            nodes: graph.nodes,
            edges: edges
        };
    }

    return {
        add: {
            node: addNode,
            edge: addEdge
        },
        get: {
            nodes: getNodes,
            edges: getEdges,
            in: {
                edges: getInEdges
            },
            out: {
                edges: getOutEdges
            }
        },
        dump: dump
    };
}

module.exports = digraph;
