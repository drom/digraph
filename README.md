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

### node = g.add.node(`Node`)

Adds new node object if needed.

### edge = g.add.edge.from(`Node`).to(`Node`)

Adds new edge and nodes if needed.

---

`Node: undefined`

Constructs new noname node object.

`Node: {String}`

Search for existing node object with this name.
Constructs new node object with the name if cant find existing node.

`Node: {Object}`

Uses provided `Object` as node object descriptor.
