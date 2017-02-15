'use strict';

function edgesFromNodeArray (n) {
    var e = n.edges = n.edges || {};
    var res = e.from = e.from || [];
    return res;
}

function edgesToNodeArray (n) {
    var e = n.edges = n.edges || {};
    var res = e.to = e.to || [];
    return res;
}

function edgesFrom (v) {
    // TODO lookup by String
    if (v.edges && v.edges.from) {
        return v.edges.from;
    }
    return [];
}

function edgesTo (v) {
    // TODO lookup by String
    if (v.edges && v.edges.to) {
        return v.edges.to;
    }
    return [];
}

function edgesAt (v) {
    return edgesTo(v).concat(edgesFrom(v));
}

function digraph () {

    var nodes = [];
    var edges = [];
    var nodesCache = {};

    function addNode (v) {
        var _v, _name, index;

        if (v === undefined) {
            _v = { edges: { from: [], to: [] } };
            nodes.push(_v);
            return _v;
        }

        if (typeof v === 'string') {
            _v = nodesCache[v];
            if (_v === undefined) {
                _v = { name: v, edges: { from: [], to: [] } };
                nodesCache[v] = _v;
                nodes.push(_v);
            }
            return _v;
        }

        if (typeof v === 'object') {
            if (v.name !== undefined) {
                _name = v.name;
                _v = nodesCache[_name];
                if (typeof _v === 'object') {
                    // shallow Object merge
                    Object.keys(v).forEach(function (key) {
                        _v[key] = v[key];
                    });
                } else {
                    _v = v;
                    nodesCache[_name] = _v;
                    nodes.push(_v);
                }
            } else {
                index = nodes.indexOf(v);
                if (index === -1) {
                    _v = v;
                    nodes.push(_v);
                } else {
                    _v = nodes[index];
                }
            }
            return _v;
        }
        throw new Error(
            'unexpected type (' + (typeof v) + ') while adding the node.'
        );
    }

    function addEdgeFrom (from) {
        from = addNode(from);
        return function (to) {
            var edge, e1, e2;

            to = addNode(to);
            e1 = edgesToNodeArray(from);
            e2 = edgesFromNodeArray(to);

            // search for existing edge
            if (!e1.some(function (e) {
                if (e.to.node === to) {
                    edge = e;
                    return true;
                }
            })) { // create new edge
                edge = {
                    from: { node: from, index: e1.length },
                    to:   { node: to,   index: e2.length }
                };
                e1.push(edge);
                e2.push(edge);
                edges.push(edge);
            }
            return edge;
        };
    }

    return {
        node: addNode,
        edge: addEdgeFrom,
        get: {
            nodes: nodes,
            edges: edges
        },
        edges: {
            from: edgesFrom,
            to: edgesTo,
            at: edgesAt
        }
    };
}

module.exports = digraph;
