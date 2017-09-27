'use strict';
/* Graph, Directed, Hypergraph, F-edges */

var genConnector = function (gState, nState, eState) {
    return function perTarget (nn) {
        var nnState = nn.state;
        var nnFrom = nnState.from;
        eState.targets.push({ node: nnState, index: nnFrom.length });
        nnFrom.push(eState);
        return perTarget;
    };
};

var genEdge = function (gState, nState) {
    return function perEdge () {
        var eState = {
            source: { node: nState, index: nState.to.length },
            targets: []
        };
        nState.to.push(eState);
        gState.edges.push(eState);
        var res = genConnector(gState, nState, eState);
        res.state = eState;
        return res;
    };
};

var genNode = function (gState) {
    return function perNode () {
        var nState = {from: [], to: []};
        gState.nodes.push(nState);
        var res = genEdge(gState, nState);
        res.state = nState;
        return res;
    };
};

module.exports = function () {
    var gState = {nodes: [], edges: []};
    var res = genNode(gState);
    res.nodes = gState.nodes;
    res.edges = gState.edges;
    return res;
};
