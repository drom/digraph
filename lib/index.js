'use strict';

function isNode (n) {
    return (typeof n === 'object');
}

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

        function addEdgeTo (to) {
            var edge, e1, e2;

            if (!isNode(to)) {
                throw new Error('can\'t add edge to non node');
            }

            e1 = edgesToNodeArray(_v);
            e2 = edgesFromNodeArray(to);

            // search for existing edge
            if (!e1.some(function (e) {
                if (e.to.node === to) {
                    edge = e;
                    return true;
                }
            })) { // create new edge
                edge = {
                    from: { node: _v, index: e1.length },
                    to:   { node: to, index: e2.length }
                };
                e1.push(edge);
                e2.push(edge);
                edges.push(edge);
            }
            return edge;
        }

        if (v === undefined) {
            _v = {
                edges: {
                    from: [],
                    to: []
                },
                edge: addEdgeTo
            };
            nodes.push(_v);
            return _v;
        }

        if (typeof v === 'string') {
            _v = nodesCache[v];
            if (_v === undefined) {
                _v = {
                    name: v,
                    edges: {
                        from: [],
                        to: []
                    },
                    edge: addEdgeTo
                };
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
            _v.edge = addEdgeTo;
            return _v;
        }
        throw new Error(
            'unexpected type (' + (typeof v) + ') while adding the node.'
        );
    }


    return {
        node: addNode,
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
