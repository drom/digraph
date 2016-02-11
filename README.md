[![NPM version](https://img.shields.io/npm/v/digraph.svg)](https://www.npmjs.org/package/digraph)
[![Build Status](https://travis-ci.org/drom/digraph.svg?branch=master)](https://travis-ci.org/drom/digraph)
[![Build status](https://ci.appveyor.com/api/projects/status/c3yx0nrd8nuanbyh?svg=true)](https://ci.appveyor.com/project/drom/digraph)

# digraph

Digraph module provides several functions for working with
[directed graph](http://en.wikipedia.org/wiki/Directed_graph)s (digraphs)
in JavaScript.

## node.js
```js
var digraph = require('digraph');
var g = digraph();
```

## browser

Use browserify.

## API

### g.add.node(attr)

### g.add.edge(attr)

### g.get.nodes()

### g.get.edges()

### g.get.in.edges(node)

### g.get.out.edges(node)

### g.dump()
