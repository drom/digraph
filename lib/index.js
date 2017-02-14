'use strict';

function digraph () {

    var nodes = [];
    var edges = [];
    var nodesCache = {};
    var edgesForward = {};
    var edgesBackward = {};

    function addNode (v) {
        var _v, _name,
            vType = typeof v;

        if (vType === 'undefined') {
            _name = '__' + nodes.length;
            _v = { name: _name };
            nodesCache[_name] = _v;
            nodes.push(_v);
        } else
        if (vType === 'string') {
            _v = nodesCache[v];
            if (_v === undefined) {
                _v = { name: v };
                nodesCache[v] = _v;
                nodes.push(_v);
            }
        } else
        if (vType === 'object') {
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
                throw new Error('need name field to add the node.');
            }
        } else {
            throw new Error(
                'unexpected type (' + vType + ') while adding the node.'
            );
        }
        return _v;
    }

    function addEdgeFrom (from) {
        var _from = addNode(from),
            fromName = _from.name;

        edgesForward[fromName] = edgesForward[fromName] || {};
        return {
            to: function (to) {
                var _to = addNode(to),
                    toName = _to.name,
                    _edge;

                edgesBackward[toName] = edgesBackward[toName] || {};

                _edge = edgesForward[fromName][toName];
                if (_edge === undefined) {
                    _edge = {
                        from: { node: _from },
                        to:   { node: _to }
                    };
                    edgesForward[fromName][toName] = _edge;
                    edges.push(_edge);
                }
                edgesBackward[toName][fromName] = _edge;
                return _edge;
            }
        };
    }

    return {
        add: {
            node: addNode,
            edge: { from: addEdgeFrom }
        },
        nodes: nodes,
        edges: edges,
        nodesCache: nodesCache,
        edgesForward: edgesForward,
        edgesBackward: edgesBackward
    };
}

module.exports = digraph;
