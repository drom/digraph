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

    function indexOfNode (node) {
        var index;
        return graph.nodes.some(function (n, i) {
            if (n === node) {
                index = i;
                return true;
            }
        }) ? index : undefined;
    }

    function exportObj () {
        var edges = graph.edges.map(function (e) {
            return [indexOfNode(e[0]), indexOfNode(e[1]), e[2]];
        });
        return {
            nodes: graph.nodes,
            edges: edges
        };
    }

    function exportDot () {
        var res = 'digraph {\n';
        graph.edges.forEach(function (e) {
            res += '  '
                + (e[0].id || ('_' + indexOfNode(e[0])))
                + ' -> '
                + (e[1].id || ('_' + indexOfNode(e[1])));
            res += '\n'
        });
        res += '}\n';
        return res;
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
        export: {
            obj: exportObj,
            dot: exportDot
        }
    };
}

module.exports = digraph;
