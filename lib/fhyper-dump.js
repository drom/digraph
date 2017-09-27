'use strict';

function nId (i) { return 'n' + i.toString(32); }
function eId (i) { return 'e' + i.toString(32); }

module.exports = function (g) {
    var res = [];
    var nodes = {};
    var edges = {};

    res = res.concat(g.nodes.map(function (n, i) {
        var key = nId(i);
        nodes[key] = n;
        return key;
    }));
    var nodeKeys = Object.keys(nodes);

    res = res.concat(g.edges.map(function (e, i) {
        var key = eId(i);
        edges[key] = e;
        return key;
    }));
    var edgeKeys = Object.keys(edges);

    res = res.concat(g.nodes.map(function (n, i) {
        var nKey = nId(i);
        var res = [];
        n.to.forEach(function (e, ni) {
            edgeKeys.some(function (eKey) {
                if (edges[eKey] === e) {
                    res.push(nKey + ' -> ' + eKey + '       [label=' + ni + '];');
                    edges[eKey].targets.forEach(function (nn) {
                        nodeKeys.some(function (nnKey) {
                            if (nodes[nnKey] === nn.node) {
                                res.push('      ' + eKey + ' -> ' + nnKey + ' [label=?];');
                                return true;
                            }
                        });
                    });
                    return true;
                }
            });
        });
        return res.join('\n');
    }));

    console.log(res.join('\n'));
};

/* eslint no-console: 1 */
