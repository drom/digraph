[![NPM version](https://img.shields.io/npm/v/digraph.svg)](https://www.npmjs.org/package/digraph)
[![Build Status](https://travis-ci.org/drom/digraph.svg?branch=master)](https://travis-ci.org/drom/digraph)
[![Build status](https://ci.appveyor.com/api/projects/status/c3yx0nrd8nuanbyh?svg=true)](https://ci.appveyor.com/project/drom/digraph)

# digraph

Digraph module provides several functions for working with
[directed graph](http://en.wikipedia.org/wiki/Directed_graph)s (digraphs)
in JavaScript.

## node.js
```js
npm i digraph --save
```

## browser

Use browserify.

## API

```js
var digraph = require('digraph');
```

`digraph` is a factory function creates directed graph object.

```js
var g1 = digraph();
```

### `g.node() -> n`

Digraph object has `node` factory function.

```js
<Node> = g1.node(<N>)
```

Creates new node object if needed.

`N: undefined`

Constructs new noname node object.

`N: {String}`

Search for existing node object with this name.
Constructs new node object with the name if can`t find existing node.

`N: {Object}`

Uses provided `Object` as node object descriptor. Search for existing node object if `name: 'NodeName'` is provided.

#### Examples:

```js
var a = g1.node('a');

var node = g1.node; // can be detached

var b = node('b');
var c = node('c');
```

### `n.edge(n) -> e`

Node object has `edge` factory that will search for the relevant edge or create one if needed.

#### Examples:

```js
var a_b = a.edge(b);
var b_e = node('b').edge(node('e'));

var c_ = c.edge; // can be detached
var c_d = c_(d);
var c_e = c_(e);
```

### `g.edges`

```js
[<Edge>] = g1.edges.from(<Node>)
```

Return array of all outgoing edges.

```js
[<Edge>] = g1.edges.to(<Node>)
```

Return array of all incoming edges.

```js
[<Edge>] = g1.edges.at(<Node>)
```

### `g.get`


```js
[<Node>] = g.get.nodes
```

Return array of nodes in no particular order.

```js
[<Edge>] = g.get.edges
```

Return array of edges in no particular order.
